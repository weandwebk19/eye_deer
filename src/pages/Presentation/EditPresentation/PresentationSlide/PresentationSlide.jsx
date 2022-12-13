import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

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
    name: "mi xao",
    vote: 15,
  },
  {
    name: "com ga xoi mo",
    vote: 25,
  },
  {
    name: "nhin doi",
    vote: 10,
  },
];

const slideList = [
  {
    slideid: 1,
    type: 1,
    question: "chart here",
    data: data1,
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
    data: data2,
    content: <ChartSlide question="chart here" data={data2} />,
  },
];

const PresentationSlide = () => {
  const { slideid, id } = useParams();
  const currentSlide = slideList.find((o) => o.slideid === Number(slideid));
  const [code, setCode] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await PresentationService.getCodePresentation(id);
        if (res.success === true) {
          setCode(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <StyledPaper sx={{ pb: "56.25%", position: "relative" }}>
      <Box className="presentation-slide__code">
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          code: {code}
        </Typography>
      </Box>
      <Box className="presentation-slide__content">{currentSlide.content}</Box>
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
