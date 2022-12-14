import { Box } from "@mui/system";
import PropTypes from "prop-types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { StyledHeadingTypography } from "components/Typography";

const ChartSlide = ({ question, options }) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <StyledHeadingTypography
        variant="h3"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        {question}
      </StyledHeadingTypography>
      {(() => {
        if (options.length !== 0)
          return (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={300}
                height={300}
                data={options}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="content" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vote" fill="#297373" />
              </BarChart>
            </ResponsiveContainer>
          );
        else {
          return (
            <StyledHeadingTypography variant="h4" sx={{ textAlign: "center" }}>
              there's nothing here to show
            </StyledHeadingTypography>
          );
        }
      })()}
    </Box>
  );
};

ChartSlide.propTypes = {
  question: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
};

ChartSlide.defaultProps = {
  question: "",
  options: [],
};

export default ChartSlide;
