import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Stack } from "@mui/material";

import Gradient4 from "assets/imgs/gradient-4.png";
import { SocketContext } from "context/socket";
import { DefaultLayout } from "layouts";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";

import { StyledButton } from "components/Button";

import HeadingSlideParticipant from "./HeadingSlideParticipant";
import ParagraphSlideParticipant from "./ParagraphSlideParticipant";
import VotingSlideParticipantView from "./VotingSlideParticipantView";

const PresenatationParticipantView = () => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  // const currentSlide = slideList.find((o) => o.id === Number(slideId));
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  const [code, setCode] = useState();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const slideRes = await SlideService.getSlidesByPresentationId(
          presentationId
        );

        if (slideRes.success === true) {
          setSlideList(slideRes.data);
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
    const newSlide = slideList.find((slide) => slide.id === Number(slideId));
    setCurrentSlide(newSlide);

    socket.on("PARTICIPANT_MOVE_TO_SLIDE", (newSlideId) => {
      const newSlide = slideList.find(
        (slide) => slide.id === Number(newSlideId)
      );
      setCurrentSlide(newSlide);
      navigate(`/presentation/${presentationId}/${newSlideId}/participating`);
    });
    socket.on("PARTICIPANT_END_PRESENT", () => {
      // alert("End presentation.");
    });
  }, [slideList]);

  return (
    <DefaultLayout>
      <Box className="presentation-participant-view__container">
        <Box className="presentation-participant-view__content">
          {(() => {
            if (currentSlide?.typeId === 1) {
              return (
                <VotingSlideParticipantView
                  question={currentSlide?.content.question}
                  data={currentSlide?.content.options}
                  code={code}
                />
              );
            } else if (currentSlide?.typeId === 2) {
              return (
                <HeadingSlideParticipant
                  question={currentSlide?.content.heading}
                  subHeading={currentSlide?.content.subHeading}
                />
              );
            } else {
              return (
                <ParagraphSlideParticipant
                  question={currentSlide?.content.heading}
                  paragraph={currentSlide?.content.paragraph}
                />
              );
            }
          })()}
          <Stack spacing={2} sx={{ mt: 4 }}>
            <StyledButton>open Q&A</StyledButton>
            <StyledButton>enter chat box</StyledButton>
          </Stack>
        </Box>
        <img src={Gradient4} alt="deco gradient" className="deco-img-4" />
      </Box>
    </DefaultLayout>
  );
};

export default PresenatationParticipantView;
