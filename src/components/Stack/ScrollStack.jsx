import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
    <Box sx={{ width: "100%" }}>
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
