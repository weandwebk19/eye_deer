import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, MenuItem, Stack, Typography } from "@mui/material";

import PropTypes from "prop-types";
import SlideService from "services/slideService";
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
  setCurrentSlide,
  handleChangeSlideList,
  handleChangeCurrentSlide,
}) => {
  const { slideid } = useParams();
  const [selectedStyle, setSelectedStyle] = useState(currentSlide?.typeId ?? 1);
  // const [slideStyle, setSlideStyle] = useState();
  // const currentSlide = slideList.find((o) => o.slideid === Number(slideid));

  // useEffect(() => {
  //   setSelectedStyle(currentSlide?.typeId);
  // }, [slideid]);

  const handleChangeStyleSelection = async (e) => {
    setSelectedStyle(e.target.value);
    // console.log(e.target.value);

    const index = slideList.indexOf(currentSlide);
    const newSlide = {
      ...currentSlide,
      typeId: e.target.value,
      type: typeMapper(e.target.value),
    };
    slideList[index] = newSlide;
    const deleteSlideTypeRes = await SlideService.deleteSlideType(currentSlide);
    // console.log("deleteSlideTypeRes", deleteSlideTypeRes);

    const updateSlideTypeRes = await SlideService.changeSlideType(newSlide);
    // console.log("updateSlideTypeRes", updateSlideTypeRes);
    setCurrentSlide(updateSlideTypeRes.data);
    handleChangeSlideList(slideList);
  };

  const handleBlurQuestion = (e) => {
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
    // console.log(e.target.value);
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

  const handleAddOption = async (currentSlide) => {
    const newOptions = {
      content: "",
      vote: 0,
    };

    const optionRes = await SlideService.createNewOption(
      currentSlide,
      newOptions
    );
    console.log("optionRes", optionRes);
    if (optionRes.success === true && optionRes.data) {
      currentSlide.content.options.push(optionRes.data);

      const newSlide = {
        ...currentSlide,
        content: {
          ...currentSlide.content,
        },
      };

      const index = slideList.indexOf(newSlide);
      slideList[index] = newSlide;
      handleChangeCurrentSlide(newSlide);
      // console.log("newSlide", newSlide);
    }
  };

  const handleResetVote = async () => {
    const resetVoteRes = await SlideService.resetVote(slideid);
    // console.log("resetVoteRes", resetVoteRes);
  };

  return (
    <Box>
      <Typography>slide style.</Typography>
      <StyledSelectField
        defaultValue={currentSlide?.typeId ?? 1}
        value={currentSlide?.typeId ?? 1}
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
                key={`${currentSlide?.id} ${currentSlide?.typeId} ${currentSlide?.contentId} heading`}
                label="heading"
                defaultValue={currentSlide?.content.heading}
                onBlur={handleBlurQuestion}
              />
              <Typography>Sub heading</Typography>
              <StyledInputField
                key={`${currentSlide?.id} ${currentSlide?.typeId} ${currentSlide?.contentId} subHeading`}
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
                key={`${currentSlide?.id} ${currentSlide?.typeId} ${currentSlide?.contentId} headingParagraph}`}
                label="heading"
                defaultValue={currentSlide?.content.heading}
                onBlur={handleBlurQuestion}
              />
              <Typography>paragraph</Typography>
              <StyledInputField
                key={`${currentSlide?.id} ${currentSlide?.typeId} ${currentSlide?.contentId} paragraph`}
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
                key={`${currentSlide?.id} ${currentSlide?.typeId} ${currentSlide?.contentId} question`}
                label="question"
                defaultValue={currentSlide?.content.question}
                onBlur={handleBlurQuestion}
              />
              <Typography>options</Typography>
              {currentSlide?.content.options?.map((option, i) => {
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
                variant="secondary"
                onClick={() => handleResetVote()}
              >
                reset vote
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
  setCurrentSlide: PropTypes.func,
  handleChangeSlideList: PropTypes.func,
  handleChangeCurrentSlide: PropTypes.func,
};

PresentationCustomizer.defaultProps = {
  slideList: [],
  currentSlide: null,
  setCurrentSlide: () => {},
  handleChangeSlideList: () => {},
  handleChangeCurrentSlide: () => {},
};

export default PresentationCustomizer;
