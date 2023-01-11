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
import ChatBox from "components/ChatBox/ChatBox";
import { FormDialog } from "components/Dialog";
import StyledDrawer from "components/Drawer/Drawer";
import PositionedSnackbar from "components/Popup/PositionedSnackbar";

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
  const [chatMessages, setChatMessages] = useState([]);
  const [popupMessages, setPopupMessages] = useState([]);
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

        // const chatQuestionsRes = await PresentationService.getChatQuestions(
        //   presentationId
        // );
        // if (chatQuestionsRes.success === true) {
        //   setChatQuestions(
        //     chatQuestionsRes.data.filter(
        //       (question) => question.isAnswered === 0
        //     )
        //   );
        // }

        // const chatMessagesRes = await PresentationService.getChatMessages(
        //   presentationId
        // );
        // if (chatMessagesRes.success === true) {
        //   setChatMessages(chatMessagesRes.data);
        // }

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

        // handle get list messages from server when client didmount
        socket.emit("CLIENT_GET_LIST_MESSAGES", { code, presentationId });
        socket.on("SERVER_SEND_LIST_MESSAGES", (listMessages) => {
          setChatMessages(listMessages);
        });

        // handle receive messages
        socket.on("SERVER_SEND_CHAT_MESSAGE", (chatInfo) => {
          setChatMessages((prevChatMessages) => {
            if (
              prevChatMessages.length === 0 ||
              prevChatMessages[prevChatMessages.length - 1].createdAt !==
                chatInfo.createdAt
            ) {
              return prevChatMessages.concat(chatInfo);
            } else return prevChatMessages;
          });

          if (chatInfo.user?.id !== user.id) {
            setPopupMessages((prevChatMessages) => {
              return prevChatMessages.concat(
                <PositionedSnackbar
                  message={`${chatInfo.user.firstName ?? ""} ${
                    chatInfo.user.lastName ?? ""
                  }: ${chatInfo.content}`}
                />
              );
            });
          }
        });
        // handle get list questions from server when client didmount
        socket.emit("CLIENT_GET_LIST_QUESTIONS", { code, presentationId });
        socket.on("SERVER_SEND_LIST_QUESTIONS", (listQuestions) => {
          setChatQuestions(
            listQuestions.filter((question) => question.isAnswered === false)
          );
        });

        // handle receive questions
        socket.on("SERVER_SEND_CHAT_QUESTION", (questionInfo) => {
          setChatQuestions((prevChatQuestions) => {
            if (
              prevChatQuestions.length === 0 ||
              prevChatQuestions[prevChatQuestions.length - 1].id !==
                questionInfo.id
            ) {
              return prevChatQuestions.concat(questionInfo);
            } else return prevChatQuestions;
          });
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    // handle participant upvote
    socket.on("SERVER_SEND_UPVOTE_QUESTION", (listQuestions) => {
      console.log("SERVER_SEND_UPVOTE_QUESTION", listQuestions);
      setChatQuestions(
        listQuestions.filter((question) => question.isAnswered === false)
      );
    });

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
      // handle host mark participant's question as answered
      socket.on("PARTICIPANT_QUESTION_ANSWERED", (listQuestions) => {
        setChatQuestions(
          listQuestions.filter((question) => question.isAnswered === false)
        );
      });

      // handle host restore participant's question
      socket.on("PARTICIPANT_QUESTION_RESTORED", (listQuestions) => {
        setChatQuestions(
          listQuestions.filter((question) => question.isAnswered === false)
        );
      });

      socket.on("SERVER_SEND_UNUPVOTE_QUESTION", (listQuestions) => {
        setChatQuestions(
          listQuestions.filter((question) => question.isAnswered === false)
        );
      });
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
            <FormDialog
              FormDialog
              content="enter chat box"
              title="chat box"
              variant="secondary"
              buttonSize="full"
            >
              <ChatBox
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
                code={code}
              />
            </FormDialog>
          </Stack>
        </Box>
        <img src={Gradient4} alt="deco gradient" className="deco-img-4" />
      </Box>
      {popupMessages.map((message) => message)}
    </DefaultLayout>
  );
};

export default PresenatationParticipantView;
