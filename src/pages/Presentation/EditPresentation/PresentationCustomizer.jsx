import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, MenuItem, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";

import { StyledButton } from "components/Button";
import { StyledSelectField } from "components/SelectBox/StyledSelectField";
import { StyledInputField } from "components/TextField";

const data1 = [
  {
    id: 1,
    name: "option 1",
    vote: 15,
  },
  {
    id: 2,
    name: "option 2",
    vote: 25,
  },
  {
    id: 3,
    name: "option 3",
    vote: 2,
  },
  {
    id: 3,
    name: "option 4",
    vote: 10,
  },
  {
    id: 4,
    name: "option 5",
    vote: 11,
  },
  {
    id: 5,
    name: "option 6",
    vote: 32,
  },
];

const data2 = [
  {
    id: 1,
    name: "mi xao",
    vote: 15,
  },
  {
    id: 2,
    name: "com ga xoi mo",
    vote: 25,
  },
  {
    id: 3,
    name: "nhin doi",
    vote: 2,
  },
];

const slideList = [
  {
    slideid: 1,
    type: 1,
    question: "chart here",
    data: data1,
  },
  {
    slideid: 2,
    type: 2,
    question: "heading here",
  },
  {
    slideid: 3,
    type: 3,
    question: "paragraph here",
    paragraph: "lorem ipsum",
  },
  {
    slideid: 4,
    type: 1,
    question: "chart here",
    data: data2,
  },
];

const PresentationCustomizer = () => {
  const { slideid } = useParams();
  // const [slideStyle, setSlideStyle] = useState();
  const currentSlide = slideList.find((o) => o.slideid === Number(slideid));

  const slideTypeName = (type) => {
    if (type === 2) return "heading";
    else if (type === 3) return "paragraph";
    else return "multiple choice";
  };

  // useEffect(() => {
  //   const thisType = () => {
  //     if (currentSlide.type === 2) {
  //       return (
  //         <Box>
  //           <Typography>heading</Typography>
  //           <StyledInputField
  //             label="heading"
  //             defaultValue={currentSlide.question}
  //           />
  //         </Box>
  //       );
  //     } else if (currentSlide.type === 3) {
  //       return (
  //         <Box>
  //           <Typography>heading</Typography>
  //           <StyledInputField
  //             label="heading"
  //             defaultValue={currentSlide.question}
  //           />
  //           <Typography>paragraph</Typography>
  //           <StyledInputField
  //             label="paragraph"
  //             defaultValue={currentSlide.paragraph}
  //           />
  //         </Box>
  //       );
  //     } else {
  //       return (
  //         <Box>
  //           <Typography>your question</Typography>
  //           <StyledInputField
  //             label="multiple choice"
  //             defaultValue={currentSlide.paragraph}
  //           />
  //           <Typography>options</Typography>
  //           {currentSlide.data.map((option, i) => {
  //             return (
  //               <StyledInputField
  //                 label={`option ${i + 1}`}
  //                 defaultValue={option.name}
  //               />
  //             );
  //           })}
  //           <StyledButton>+ option</StyledButton>
  //         </Box>
  //       );
  //     }
  //   };
  //   setSlideStyle(thisType);
  // }, [slideid]);

  return (
    <Box>
      <Typography>slide style.</Typography>
      <StyledSelectField value={currentSlide.type} label={slideTypeName}>
        <MenuItem value={1}>multiple choice</MenuItem>
        <MenuItem value={2}>heading</MenuItem>
        <MenuItem value={3}>paragraph</MenuItem>
      </StyledSelectField>
      {/* {slideStyle} */}
      {(() => {
        if (currentSlide.type === 2) {
          return (
            <Stack spacing={2}>
              <Typography>heading</Typography>
              <StyledInputField
                key={`${currentSlide.slideid} ${currentSlide.question}`}
                label="heading"
                defaultValue={currentSlide.question}
              />
            </Stack>
          );
        } else if (currentSlide.type === 3) {
          return (
            <Stack spacing={2}>
              <Typography>heading</Typography>
              <StyledInputField
                key={`${currentSlide.slideid} ${currentSlide.question}`}
                label="heading"
                defaultValue={currentSlide.question}
              />
              <Typography>paragraph</Typography>
              <StyledInputField
                key={`${currentSlide.slideid} ${currentSlide.paragraph}`}
                label="paragraph"
                defaultValue={currentSlide.paragraph}
              />
            </Stack>
          );
        } else {
          return (
            <Stack spacing={2}>
              <Typography>your question</Typography>
              <StyledInputField
                key={`${currentSlide.slideid} ${currentSlide.question}`}
                label="multiple choice"
                defaultValue={currentSlide.question}
              />
              <Typography>options</Typography>
              {currentSlide.data.map((option, i) => {
                return (
                  <StyledInputField
                    key={`${currentSlide.slideid} ${option.id} ${option.name} ${option.value} `}
                    label={`option ${i + 1}`}
                    defaultValue={option.name}
                  />
                );
              })}
              <StyledButton>+ option</StyledButton>;
            </Stack>
          );
        }
      })()}
    </Box>
  );
};

export default PresentationCustomizer;
