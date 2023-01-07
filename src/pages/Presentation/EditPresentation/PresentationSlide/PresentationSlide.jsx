import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import { StyledPaper } from "components/Paper";

import "../../styles.scss";
import ChartSlide from "./ChartSlide";
import HeadingSlide from "./HeadingSlide";
import ParagraphSlide from "./ParagraphSlide";

// const data1 = [
//   {
//     name: "option 1",
//     vote: 15,
//   },
//   {
//     name: "option 2",
//     vote: 25,
//   },
//   {
//     name: "option 3",
//     vote: 2,
//   },
//   {
//     name: "option 4",
//     vote: 10,
//   },
//   {
//     name: "option 5",
//     vote: 11,
//   },
//   {
//     name: "option 6",
//     vote: 32,
//   },
// ];

// const data2 = [
//   {
//     name: "mi xao",
//     vote: 15,
//   },
//   {
//     name: "com ga xoi mo",
//     vote: 25,
//   },
//   {
//     name: "nhin doi",
//     vote: 10,
//   },
// ];

// const slideList = [
//   {
//     slideid: 1,
//     type: 1,
//     question: "chart here",
//     data: data1,
//     content: <ChartSlide question="chart here" data={data1} />,
//   },
//   {
//     slideid: 2,
//     type: 2,
//     question: "heading here",
//     content: <HeadingSlide question="heading here" />,
//   },
//   {
//     slideid: 3,
//     type: 3,
//     question: "paragraph here",
//     paragraph: "lorem ipsum",
//     content: (
//       <ParagraphSlide question="paragraph here" paragraph="lorem ipsum" />
//     ),
//   },
//   {
//     slideid: 4,
//     type: 1,
//     question: "chart here",
//     data: data2,
//     content: <ChartSlide question="chart here" data={data2} />,
//   },
// ];

const PresentationSlide = () => {
  const {
    slideList,
    currentSlide,
    handleChangeSlideList,
    handleChangeCurrentSlide,
  } = useOutletContext();
  const { slideid, id } = useParams();
  // const currentSlide = slideList.find((o) => o.slideid === Number(slideid));
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
      <Box className="presentation-slide__content">
        {(() => {
          if (currentSlide?.typeId === 1) {
            return (
              <ChartSlide
                question={currentSlide?.content.question}
                options={currentSlide?.content.options}
              />
            );
          } else if (currentSlide?.typeId === 2) {
            return (
              <HeadingSlide
                question={currentSlide?.content.heading}
                subHeading={currentSlide?.content.subHeading}
              />
            );
          } else {
            return (
              <ParagraphSlide
                question={currentSlide?.content.heading}
                paragraph={currentSlide?.content.paragraph}
              />
            );
          }
        })()}
      </Box>
    </StyledPaper>
  );
};

// PresentationSlide.propTypes = {
//   slideList: PropTypes.arrayOf(PropTypes.object),
//   currentSlide: PropTypes.object,
//   handleChangeSlideList: PropTypes.func,
//   handleChangeCurrentSlide: PropTypes.func,
// };

// PresentationSlide.defaultProps = {
//   slideList: [],
//   currentSlide: null,
//   handleChangeSlideList: () => {},
//   handleChangeCurrentSlide: () => {},
// };

export default PresentationSlide;
