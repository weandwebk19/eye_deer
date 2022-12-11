import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import PropTypes from "prop-types";

import { StyledPaper } from "components/Paper";

import "../../styles.scss";
import ChartSlide from "./ChartSlide";
import HeadingSlide from "./HeadingSlide";
import ParagraphSlide from "./ParagraphSlide";

const data1 = [
  {
    name: "option 1",
    vote: 15,
  },
  {
    name: "option 2",
    vote: 25,
  },
  {
    name: "option 3",
    vote: 2,
  },
  {
    name: "option 4",
    vote: 10,
  },
  {
    name: "option 5",
    vote: 11,
  },
  {
    name: "option 6",
    vote: 32,
  },
];

const data2 = [
  {
    name: "option 1",
    vote: 15,
  },
  {
    name: "option 2",
    vote: 25,
  },
  {
    name: "option 3",
    vote: 2,
  },
];

const slideList = [
  {
    slideid: 1,
    type: 1,
    question: "chart here",
    content: <ChartSlide question="chart here" data={data1} />,
  },
  {
    slideid: 2,
    type: 2,
    question: "heading here",
    content: <HeadingSlide question="heading here" />,
  },
  {
    slideid: 3,
    type: 3,
    question: "paragraph here",
    paragraph: "lorem ipsum",
    content: (
      <ParagraphSlide question="paragraph here" paragraph="lorem ipsum" />
    ),
  },
  {
    slideid: 4,
    type: 1,
    question: "chart here",
    content: <ChartSlide question="chart here" data={data2} />,
  },
];

const PresentationSlide = () => {
  const { slideid } = useParams();
  const obj = slideList.find((o) => o.slideid === Number(slideid));
  return (
    <StyledPaper sx={{ pb: "56.25%", position: "relative" }}>
      <Box className="presentation-slide__content">
        {obj.content}
        {/* <ChartSlide
          data={data}
          question={`I would never fall in love again until I found her.
          I said, “I would never fall unless it’s you I fall into”`}
        /> */}
      </Box>
    </StyledPaper>
  );
};

// PresentationSlide.propTypes = {
//   slideid: PropTypes.number,
// };

PresentationSlide.defaultProps = {
  slideid: 1,
};

export default PresentationSlide;
