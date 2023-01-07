import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Stack } from "@mui/material";

import Gradient4 from "assets/imgs/gradient-4.png";
import { SocketContext } from "context/socket";
import { set } from "date-fns";
import { DefaultLayout } from "layouts";
import PresentationService from "services/presentationService";
import SlideService from "services/slideService";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";
import StyledDrawer from "components/Drawer/Drawer";

import HeadingSlideParticipant from "./HeadingSlideParticipant";
import ParagraphSlideParticipant from "./ParagraphSlideParticipant";
import ParticipantQuestionBox from "./ParticipantQuestionBox";
import VotingSlideParticipantView from "./VotingSlideParticipantView";

const PresenatationParticipantView = () => {
  const params = useParams();
  const presentationId = params.id;
  const slideId = params.slideid;
  // const currentSlide = slideList.find((o) => o.id === Number(slideId));
  const [slideList, setSlideList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState();
  const [chatQuestions, setChatQuestions] = useState([]);
  const [code, setCode] = useState();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;

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

        const chatQuestionsRes = await PresentationService.getChatQuestions(
          presentationId
        );
        if (chatQuestionsRes.success === true) {
          setChatQuestions(
            chatQuestionsRes.data.filter(
              (question) => question.isAnswered === 0
            )
          );
        }

        // handle join present
        socket.emit("CLIENT_SEND_JOIN_PRESENTATION", {
          code: codeRes.data,
          user,
        });
        socket.on("SERVER_SEND_JOIN_SUCCESS", (user, presentation) => {
          // console.log("user", user);
          // const presentationParse = JSON.parse(presentation);
          // console.log("presentation", presentation);
          navigate(
            `/presentation/${presentation?.presentationId}/${presentation?.slideId}/participating`
          );
        });

        // handle get list questions from server when client didmount
        socket.emit("CLIENT_GET_LIST_QUESTIONS", { code, presentationId });
        socket.on("SERVER_SEND_LIST_QUESTIONS", (listQuestions) => {
          setChatQuestions(listQuestions);
        });

        // handle receive questions
        socket.on("SERVER_SEND_CHAT_QUESTION", (questionInfo) => {
          console.log(code);
          console.log(questionInfo);
          // setChatQuestions((prevChatQuestions) => {
          //   if (
          //     prevChatQuestions.length === 0 ||
          //     prevChatQuestions[prevChatQuestions.length - 1].createdAt !==
          //       questionInfo.createdAt
          //   ) {
          //     return prevChatQuestions.concat(questionInfo);
          //   } else return prevChatQuestions;
          // });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  // handle join present
  useEffect(() => {
    (async () => {
      // socket.emit("CLIENT_SEND_JOIN_PRESENTATION", user);
      // socket.on("SERVER_SEND_JOIN_SUCCESS", (user, presentation) => {
      //   console.log("user", user);
      //   // const presentationParse = JSON.parse(presentation);
      //   console.log("presentation", presentation);
      //   navigate(
      //     `/presentation/${presentation?.presentationId}/${presentation?.slideId}/participating`
      //   );
      // });
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

  // useEffect(() => {
  //   // handle receive questions
  //   socket.on("SERVER_SEND_CHAT_QUESTION", (chatInfo) => {
  //     setChat
  //   });

  //   // // handle question is marked as answered by host
  //   // socket.on("PARTICIPANT_QUESTION_ANSWERED", (data) => {
  //   //   const questionIndex = chatQuestions.findIndex(
  //   //     (question) => question.id === data.questionId
  //   //   );
  //   //   chatQuestions.splice(questionIndex, 1);
  //   //   handleChangeChatQuestions(chatQuestions);
  //   // });
  // }, [chatQuestions]);

  const handleChangeChatQuestions = (chatQuestions) => {
    setChatQuestions(chatQuestions);
  };

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
            <StyledDrawer buttonContent="open Q&A">
              <ParticipantQuestionBox
                chatQuestions={chatQuestions}
                code={code}
                handleChangeChatQuestions={handleChangeChatQuestions}
              />
            </StyledDrawer>
            <StyledButton>enter chat box</StyledButton>
          </Stack>
        </Box>
        <img src={Gradient4} alt="deco gradient" className="deco-img-4" />
      </Box>
    </DefaultLayout>
  );
};

export default PresenatationParticipantView;
