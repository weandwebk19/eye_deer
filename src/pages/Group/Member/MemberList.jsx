import { useState } from "react";
import { useLocation } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
  Avatar,
  Box,
  Checkbox,
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
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { StyledButton } from "components/Button";
import { SearchField } from "components/TextField";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";
import PropTypes from "prop-types";

import "../styles.scss";

const createData = (avatar, fullname, email, username, action) => {
  return {
    avatar,
    fullname,
    email,
    username,
    action,
  };
};

const rows = [
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Hoang An",
    "annguyen@gmail.com",
    "an_ne"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Nhat Binh",
    "binhanbenbovutru@gmail.com",
    "nhat_binhhh"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Vu Do Hoang Cuong",
    "cuongng@gmail.com",
    "cuuoong"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Truong Thuy Duong",
    "duong2001@gmail.com",
    "duong2001"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
  createData(
    "https://source.unsplash.com/random/?deer,antelope,forest",
    "Nguyen Ngoc Bao Giang",
    "giangbao@gmail.com",
    "arronshuu"
  ),
];

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

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

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
};

const MemberList = () => {
  const [showActionId, setShowActionId] = useState(-1);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const paramSuccess = JSON.parse(query.get("id"));
  console.log(paramSuccess);

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
    let link = `${config.FRONTEND_URL}/group/${1}/join`;
    return link;
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <SearchField />
        <Box sx={{ display: "flex" }}>
          <StyledButton variant="secondary" sx={{ mr: 1 }}>
            + new member
          </StyledButton>
          <BasicModal
            title="Invitation link"
            description={generateInvitationLink()}
            content="generate invitation link"
          />
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
                        {row.username === showActionId ? (
                          <IconButton
                            id={`edit-${row.username}`}
                            component="button"
                            variant="body2"
                            onClick={(event) => {
                              console.log(event);
                              alert(row.username);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
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
    </Box>
  );
};

export default MemberList;
