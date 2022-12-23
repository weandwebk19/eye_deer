import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { SocketContext } from "context/socket";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";

import { StyledPaper } from "components/Paper";

import ChartSlide from "../EditPresentation/PresentationSlide/ChartSlide";
import HeadingSlide from "../EditPresentation/PresentationSlide/HeadingSlide";
import ParagraphSlide from "../EditPresentation/PresentationSlide/ParagraphSlide";
import PresentationPresenterMenu from "./PresentationPresenterMenu";

const PresenatationPresenterView = () => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  const socket = useContext(SocketContext);
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  // const currentSlide = slideList.find((o) => o.id === Number(slideid));
  // const [currentSlide, setCurrentSlide] = useState();
  const [code, setCode] = useState();

  useEffect(() => {
    // socket.on("SERVER_SEND_INCREASE_VOTE", (data) => {
    //   const { presentationId, slideId, optionId } = data;
    //   if (slideList && currentSlide) {
    //     const slide = slideList.find((e) => e.id === Number(slideId));
    //     const option = slide?.content.options.find(
    //       (e) => e.id === Number(optionId)
    //     );
    //     if (option) {
    //       // console.log("option", option);

    //       const newVote = option.vote + 1;
    //       (async () => {
    //         const voteRes = await SlideService.increaseVote(
    //           presentationId,
    //           slideId,
    //           optionId,
    //           newVote
    //         );
    //         if (voteRes.success === true) {
    //           const newOption = {
    //             ...option,
    //             vote: newVote,
    //           };
    //           const indexOption = currentSlide.content.options.indexOf(option);
    //           const newOptions = currentSlide.content.options;
    //           newOptions.splice(indexOption, 1, newOption);
    //           const newCurrentSlide = {
    //             ...currentSlide,
    //             content: {
    //               ...currentSlide.content,
    //               options: newOptions,
    //             },
    //           };

    //           setCurrentSlide(newCurrentSlide);
    //         }
    //       })();
    //     }
    //   }
    // });

    (async () => {
      try {
        const slideRes = await SlideService.getSlidesByPresentationId(
          presentationId
        );

        if (slideRes.success === true) {
          setSlideList(slideRes.data);
          setCurrentSlide(slideRes.data[0]);
        }

        const codeRes = await PresentationService.getCodePresentation(
          presentationId
        );
        if (codeRes.success === true) {
          setCode(codeRes.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    socket.on("SERVER_SEND_INCREASE_VOTE", (data) => {
      const { presentationId, slideId, optionId } = data;
      const slide = slideList.find((e) => e.id === Number(slideId));
      const option = slide?.content.options.find(
        (e) => e.id === Number(optionId)
      );
      // console.log("option", option);

      if (option) {
        const newVote = option.vote + 1;
        (async () => {
          const voteRes = await SlideService.increaseVote(
            presentationId,
            slideId,
            optionId,
            newVote
          );
          if (voteRes.success === true) {
            const newOption = {
              ...option,
              vote: newVote,
            };
            const indexOption = currentSlide.content.options.indexOf(option);
            const newOptions = currentSlide.content.options;
            newOptions.splice(indexOption, 1, newOption);
            const newCurrentSlide = {
              ...currentSlide,
              content: {
                ...currentSlide.content,
                options: newOptions,
              },
            };

            setCurrentSlide(newCurrentSlide);
          }
        })();
      }
    });
  }, [slideList]);

  return (
    <StyledPaper
      className="presentation-presenter-view__container"
      sx={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      <Box className="presentation-slide__code">
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          code:&nbsp;
          <Box component="span" sx={{ fontWeight: "bold", fontSize: "2rem" }}>
            {code}
          </Box>
        </Typography>
      </Box>
      <PresentationPresenterMenu
        currentSlide={currentSlide}
        slideList={slideList}
        setSlideList={setSlideList}
        setCurrentSlide={setCurrentSlide}
      />
      <Box className="presentation-presenter-view__content">
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

export default PresenatationPresenterView;
