import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import AncientScrollIcon from "assets/icons/ancient-scroll.png";
import Star2 from "assets/imgs/star-2.svg";
import config from "config";
import {
  getListCoOwners,
  getLitsMembers,
  getOwner,
  kickOutMember,
  terminateCoOwner,
} from "httpClient/privateApis";
import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { VisitCard } from "components/Card";
import { FormDialog } from "components/Dialog";
import { BasicModal } from "components/Modal";
import { InstantMessage } from "components/Popup";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

import "../styles.scss";
import AddMember from "./AddMember";
import EditContentDialog from "./EditMember/EditContentDialog";

const createData = (avatar, fullname, email, username, action) => {
  return {
    avatar,
    fullname,
    email,
    username,
    action,
  };
};

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const headCells = [
  {
    id: "avatar",
    disablePadding: true,
    label: "avatar",
  },
  {
    id: "fullname",
    disablePadding: false,
    label: "full name",
  },
  {
    id: "email",
    disablePadding: false,
    label: "gmail",
  },
  {
    id: "username",
    disablePadding: false,
    label: "username",
  },
];

const sortableFilters = ["fullname", "email", "username"];

const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        <TableCell>avatar</TableCell>

        {headCells
          .filter((headCell) => sortableFilters.includes(headCell.id))
          .map((headCell) => (
            <TableCell
              key={headCell.id}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        <TableCell>action</TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

// const handleKickOut = async (members) => {
//   if (Array.isArray(members)) {
//     await Promise.all(members.map(async (member) => {
//       // call api terminate co-ownership
//       const res = await kickOutMember(
//         currentUser,
//         dispatch,
//         groupId,
//         member.id
//       );

//       if (res.success === true) {
//         setMessageFromServer(res.message);
//         setIsError(false);
//       } else {
//         setMessageFromServer(res.message);
//         setIsError(true);
//       }
//     }));
//   }
// };

const EnhancedTableToolbar = (props) => {
  const { numSelected, selected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <StyledHeadingTypography
          sx={{ flex: "1 1 100%" }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          member list.
        </StyledHeadingTypography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object
  ).isRequired,
};

const MemberList = ({ name }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const params = useParams();
  const groupId = params.id;

  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");
  const [showActionId, setShowActionId] = useState(-1);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [owner, setOwner] = useState();
  const [coOwners, setCoOwners] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const members = await getLitsMembers(currentUser, dispatch, groupId);
        setRows(members);
        const ownerRes = await getOwner(currentUser, dispatch, groupId);
        if (ownerRes && ownerRes.success === true) {
          setOwner(ownerRes.data);
        }
        const coOwnerRes = await getListCoOwners(
          currentUser,
          dispatch,
          groupId
        );
        if (coOwnerRes && coOwnerRes.success === true) {
          setCoOwners(coOwnerRes.data);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleNavigate = (e) => {
    navigate(`/group/${groupId}`);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const generateInvitationLink = () => {
    const link = `${config.FRONTEND_URL}/group/${groupId}/join`;
    return link;
  };

  const showEditMember = (userId) => {};

  const menuCoOwners = coOwners.map((coOwner, index) => {
    return [
      {
        id: index,
        name: "terminate co-ownership",
        onClick: async () => {
          // call api terminate co-ownership
          const res = await terminateCoOwner(
            currentUser,
            dispatch,
            groupId,
            coOwner.id
          );

          // remove co-owner
          // const newCoOwners = coOwners.splice(index, 1);
          // setCoOwners(newCoOwners);
          // handle res
          if (res.success === true) {
            setMessageFromServer(res.message);
            setIsError(false);
          } else {
            setMessageFromServer(res.message);
            setIsError(true);
          }
        },
      },
    ];
  });

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Box sx={{ width: "100%", display: "flex", height: "56px" }}>
        <Button onClick={handleNavigate} sx={{ textTransform: "lowercase" }}>
          <KeyboardBackspaceIcon sx={{ mr: 1 }} />
          <Typography>back</Typography>
        </Button>
      </Box>
      <Divider sx={{ mt: 2, mb: 2 }}>
        <Box
          component="img"
          alt="star"
          src={Star2}
          sx={{ width: "24px", height: "100%" }}
          draggable={false}
        />
      </Divider>
      <Box my={4}>
        <StyledHeadingTypography variant="h5" gutterBottom>
          owner.
        </StyledHeadingTypography>
        <VisitCard variant="no-morebutton" user={owner} />
        <StyledHeadingTypography variant="h5" gutterBottom sx={{ mt: 4 }}>
          co-owner.
        </StyledHeadingTypography>
        <Grid spacing={2} container columns={{ xs: 4, sm: 4, md: 12, lg: 12 }}>
          {coOwners.map((coOwner, index) => {
            return (
              <Grid item xs={4} sm={2} md={6} lg={4}>
                <VisitCard user={coOwner} menulist={menuCoOwners[index]} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <SearchField />
        <Box sx={{ display: "flex" }} className="button-group">
          <Box mr={2}>
            <FormDialog
              content="+ add member"
              title="Add member"
              variant="secondary"
            >
              <AddMember />
            </FormDialog>
          </Box>
          <BasicModal
            title="Invitation link"
            content="generate invitation link"
            variant="primary"
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className="text-limit">
                {generateInvitationLink()}
              </Typography>
              <Tooltip title="Copy link">
                <IconButton
                  sx={{ marginLeft: 2 }}
                  aria-label="delete"
                  size="small"
                >
                  <ContentCopyIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Box>
          </BasicModal>
        </Box>
      </Box>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.username);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.username)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.username}
                      selected={isItemSelected}
                      onMouseEnter={() => {
                        setShowActionId(row.username);
                      }}
                      onMouseLeave={() => setShowActionId(-1)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <Avatar
                          src={row.avatar}
                          sx={{
                            width: "64px",
                            height: "64px",
                            margin: "16px",
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.fullname}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.username}</TableCell>

                      <TableCell>
                        {(() => {
                          if (row.username === showActionId) {
                            const content = (
                              <IconButton
                                id={`edit-${row.username}`}
                                component="button"
                                variant="body2"
                              >
                                <EditIcon />
                              </IconButton>
                            );
                            return (
                              <FormDialog
                                FormDialog
                                content={content}
                                title="Edit member"
                                variant={null}
                              >
                                <EditContentDialog userId={row.id} />
                              </FormDialog>
                            );
                          }
                        })()}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {(() => {
        if (isError === false) {
          return (
            <InstantMessage variant="success" message={messageFromServer} />
          );
        } else if (isError === true) {
          return <InstantMessage variant="error" message={messageFromServer} />;
        }
        return "";
      })()}
    </Box>
  );
};

MemberList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MemberList;
