import { Box, Collapse, Paper, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

import PropTypes from "prop-types";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ScrollStack = ({ items }) => {
  return (
    <Box
      className="hide-scrollbar"
      sx={{
        mt: 2,
        width: "100%",
        height: "400px",
        overflowY: "scroll !important",
      }}
    >
      <Stack spacing={0}>
        {items.map((item) => {
          return <Item key={item}>{item}</Item>;
        })}
      </Stack>
    </Box>
  );
};

ScrollStack.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number])
  ).isRequired,
};

export { ScrollStack };
