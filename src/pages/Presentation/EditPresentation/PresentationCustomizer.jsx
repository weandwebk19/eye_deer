import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, MenuItem, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";
import { typeMapper } from "utils";

import { StyledButton } from "components/Button";
import { StyledSelectField } from "components/SelectBox/StyledSelectField";
import { StyledInputField } from "components/TextField";

// const data1 = [
//   {
//     id: 1,
//     name: "option 1",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "option 2",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "option 3",
//     vote: 2,
//   },
//   {
//     id: 3,
//     name: "option 4",
//     vote: 10,
//   },
//   {
//     id: 4,
//     name: "option 5",
//     vote: 11,
//   },
//   {
//     id: 5,
//     name: "option 6",
//     vote: 32,
//   },
// ];

// const data2 = [
//   {
//     id: 1,
//     name: "mi xao",
//     vote: 15,
//   },
//   {
//     id: 2,
//     name: "com ga xoi mo",
//     vote: 25,
//   },
//   {
//     id: 3,
//     name: "nhin doi",
//     vote: 2,
//   },
// ];

// const slideList = [
//   {
//     slideid: 1,
//     type: 1,
//     question: "chart here",
//     data: data1,
//   },
//   {
//     slideid: 2,
//     type: 2,
//     question: "heading here",
//   },
//   {
//     slideid: 3,
//     type: 3,
//     question: "paragraph here",
//     paragraph: "lorem ipsum",
//   },
//   {
//     slideid: 4,
//     type: 1,
//     question: "chart here",
//     data: data2,
//   },
// ];

const PresentationCustomizer = ({
  slideList,
  currentSlide,
  handleChangeSlideList,
  handleChangeCurrentSlide,
}) => {
  const { slideid } = useParams();
  const [selectedStyle, setSelectedStyle] = useState(1);
  // const [slideStyle, setSlideStyle] = useState();
  // const currentSlide = slideList.find((o) => o.slideid === Number(slideid));

  // useEffect(() => {
  //   setSelectedStyle(currentSlide?.typeId);
  // }, [slideid]);

  const handleChangeStyleSelection = (e) => {
    setSelectedStyle(e.target.value);
    // console.log(e.target.value);
    const index = slideList.indexOf(currentSlide);
    const newSlide = {
      ...currentSlide,
      typeId: e.target.value,
      type: typeMapper(e.target.value),
    };
    slideList[index] = newSlide;
    handleChangeCurrentSlide(newSlide);
    handleChangeSlideList(slideList);
    console.log(newSlide);
  };

  const handleChangeQuestion = (e) => {
    let newSlide;
    if (currentSlide.typeId === 1) {
      newSlide = {
        ...currentSlide,
        content: {
          ...currentSlide.content,
          question: e.target.value,
        },
      };
    } else {
      // currentSlide.content.heading = e.target.value;
      newSlide = {
        ...currentSlide,
        content: {
          ...currentSlide.content,
          heading: e.target.value,
        },
      };
    }
    handleChangeCurrentSlide(newSlide);
    const index = slideList.indexOf(newSlide);
    slideList[index] = newSlide;
    handleChangeSlideList(slideList);
  };

  const handleChangeSubQuestion = (e) => {
    let newSlide;
    if (currentSlide.typeId === 2) {
      newSlide = {
        ...currentSlide,
        content: {
          ...currentSlide.content,
          subHeading: e.target.value,
        },
      };
    } else if (currentSlide.typeId === 3) {
      newSlide = {
        ...currentSlide,
        content: {
          ...currentSlide.content,
          paragraph: e.target.value,
        },
      };
    }
    handleChangeCurrentSlide(newSlide);
    const index = slideList.indexOf(newSlide);
    slideList[index] = newSlide;
    handleChangeSlideList(slideList);
  };

  const handleChangeOption = (e, indexOption) => {
    console.log(e.target.value);
    // currentSlide.content.options[indexOption] = {
    //   ...currentSlide.content.options[indexOption],
    //   content: e.target.value,
    // };
    // const newSlide = currentSlide;
    const newOptions = currentSlide.content.options;
    newOptions.splice(indexOption, 1, {
      ...currentSlide.content.options[indexOption],
      content: e.target.value,
    });
    const newSlide = {
      ...currentSlide,
      content: {
        ...currentSlide.content,
        options: newOptions,
      },
    };

    handleChangeCurrentSlide(newSlide);
    const index = slideList.indexOf(newSlide);
    slideList[index] = newSlide;
    handleChangeSlideList(slideList);
  };

  const handleAddOption = (currentSlide) => {
    const newOptions = {
      content: "",
      vote: 0,
    };

    currentSlide.content.options.push(newOptions);

    const newSlide = {
      ...currentSlide,
      content: {
        ...currentSlide.content,
      },
    };

    const index = slideList.indexOf(newSlide);
    slideList[index] = newSlide;
    handleChangeCurrentSlide(newSlide);
    console.log(newSlide);
  };

  return (
    <Box>
      <Typography>slide style.</Typography>
      <StyledSelectField
        defaultValue={currentSlide?.typeId ?? null}
        value={selectedStyle}
        key={`${currentSlide?.id}-type`}
        labelId="type-select-input-label"
        id="type-select"
        label="slide style"
        onChange={handleChangeStyleSelection}
      >
        <MenuItem value={1}>multiple choice</MenuItem>
        <MenuItem value={2}>heading</MenuItem>
        <MenuItem value={3}>paragraph</MenuItem>
      </StyledSelectField>
      {(() => {
        if (currentSlide?.typeId === 2) {
          return (
            <Stack spacing={2}>
              <Typography>heading</Typography>
              <StyledInputField
                // key={`${currentSlide?.typeId} ${currentSlide?.contentId} ${currentSlide?.content.heading}`}
                label="heading"
                defaultValue={currentSlide?.content.heading}
                onChange={handleChangeQuestion}
              />
              <Typography>Sub heading</Typography>
              <StyledInputField
                // key={`${currentSlide?.typeId} ${currentSlide?.contentId} ${currentSlide?.content.heading}`}
                label="Sub heading"
                defaultValue={currentSlide?.content.subHeading}
                onChange={handleChangeSubQuestion}
              />
            </Stack>
          );
        } else if (currentSlide?.typeId === 3) {
          return (
            <Stack spacing={2}>
              <Typography>heading</Typography>
              <StyledInputField
                // key={`${currentSlide?.typeId} ${currentSlide?.contentId} ${currentSlide?.content.heading}`}
                label="heading"
                defaultValue={currentSlide?.content.heading}
                onChange={handleChangeQuestion}
              />
              <Typography>paragraph</Typography>
              <StyledInputField
                // key={`${currentSlide?.typeId} ${currentSlide?.contentId} ${currentSlide?.content.paragraph}`}
                label="paragraph"
                defaultValue={currentSlide?.content.paragraph}
                onChange={handleChangeSubQuestion}
              />
            </Stack>
          );
        } else {
          return (
            <Stack spacing={2}>
              <Typography>your question</Typography>
              <StyledInputField
                key={`${currentSlide?.typeId} ${currentSlide?.contentId} `}
                label="multiple choice"
                defaultValue={currentSlide?.content.question}
                onChange={handleChangeQuestion}
              />
              <Typography>options</Typography>
              {currentSlide?.content.options.map((option, i) => {
                return (
                  <StyledInputField
                    key={`${currentSlide?.id} ${option.id} `}
                    label={`option ${i + 1}`}
                    defaultValue={option.content}
                    onChange={(e) => {
                      handleChangeOption(e, i);
                    }}
                  />
                );
              })}
              <StyledButton onClick={() => handleAddOption(currentSlide)}>
                + option
              </StyledButton>
              <StyledButton
                onClick={() => {
                  console.log("-----------------------------");
                  console.log("Sending data to database...");
                  console.log(slideList);
                }}
              >
                save changes
              </StyledButton>
            </Stack>
          );
        }
      })()}
    </Box>
  );
};

PresentationCustomizer.propTypes = {
  slideList: PropTypes.arrayOf(PropTypes.object),
  currentSlide: PropTypes.object,
  handleChangeSlideList: PropTypes.func,
  handleChangeCurrentSlide: PropTypes.func,
};

PresentationCustomizer.defaultProps = {
  slideList: [],
  currentSlide: null,
  handleChangeSlideList: () => {},
  handleChangeCurrentSlide: () => {},
};

export default PresentationCustomizer;
