import PropTypes from "prop-types";

import { StyledHeadingTypography } from "components/Typography";

const HeadingSlide = ({ question }) => {
  return <StyledHeadingTypography>{question}</StyledHeadingTypography>;
};

HeadingSlide.propTypes = {
  question: PropTypes.string,
};

HeadingSlide.defaultProps = {
  question: "",
};
export default HeadingSlide;
