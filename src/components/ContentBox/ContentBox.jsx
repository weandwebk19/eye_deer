// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import {
//   Box,
//   CardActionArea,
//   CardContent,
//   Card as MuiCard,
//   Tooltip,
//   Typography,
//   Zoom,
// } from "@mui/material";

// import BackgroundImage4 from "assets/imgs/bg-img-4.jpg";
// import PropTypes from "prop-types";

// import { StyledCard, StyledCardActionArea } from "components/Card";

// import { StyledContentBox } from "./StyledContentBox";

// const ContentBox = ({
//   variant,
//   index,
//   name,
//   picture,
//   contentChips,
//   handleClick,
//   handleChange,
// }) => {
//   return (
//     <Box>
//       {(() => {
//         if (variant === "carpet") {
//           return (
//             <Tooltip title={name} followCursor>
//               <StyledContentBox variant="carpet">
//                 <StyledCardActionArea>
//                   <CardContent
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       height: "100% !important",
//                       alignContent: "space-between",
//                       background: `linear-gradient(to right, rgba(0, 0, 0, 0.5),  rgba(0, 0, 0, 0.0)),
//                       url(${picture}) no-repeat fixed center`,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexGrow: 1,
//                       }}
//                     >
//                       <Box display="flex">
//                         {Object.keys(contentChips).map((key) => {
//                           return (
//                             <Typography
//                               key={key}
//                               mr={1}
//                             >{`${contentChips[key]} ${key}`}</Typography>
//                           );
//                         })}
//                       </Box>
//                       <MoreVertIcon onChange={handleChange} />
//                     </Box>
//                     <Typography variant="h5" noWrap>
//                       chapter {index}
//                     </Typography>
//                     <Typography variant="h6" noWrap>
//                       {name}
//                     </Typography>
//                   </CardContent>
//                 </StyledCardActionArea>
//               </StyledContentBox>
//             </Tooltip>
//           );
//         } else if (variant === "brick") {
//           return (
//             <StyledContentBox variant="brick">
//               <CardActionArea>
//                 <Button onClick={handleClick}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignContent: "space-between",
//                       height: "100%",
//                       padding: "5px",
//                     }}
//                   >
//                     <CardContent sx={{ flexGrow: 1 }}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                         }}
//                       >
//                         <Typography>{members} member(s)</Typography>
//                       </Box>
//                     </CardContent>
//                     <Typography variant="h6" noWrap>
//                       {name}
//                     </Typography>
//                   </Box>
//                 </Button>
//               </CardActionArea>
//             </StyledContentBox>
//           );
//         }
//       })()}
//     </Box>
//   );
// };

// ContentBox.propTypes = {
//   variant: PropTypes.string,
//   index: PropTypes.number.isRequired,
//   name: PropTypes.string.isRequired,
//   picture: PropTypes.string,
//   contentChips: PropTypes.objectOf(PropTypes.number),
//   handleClick: PropTypes.func.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

// ContentBox.defaultProps = {
//   variant: "carpet",
//   picture:
//     "https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg",
//   contentChips: null,
// };

// export { ContentBox };
