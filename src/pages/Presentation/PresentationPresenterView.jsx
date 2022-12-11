import * as React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { SocketContext } from "context/socket";
import PresentationService from "services/presentationService";

import { StyledPaper } from "components/Paper";

import ChartSlide from "./EditPresentation/PresentationSlide/ChartSlide";
import HeadingSlide from "./EditPresentation/PresentationSlide/HeadingSlide";
import ParagraphSlide from "./EditPresentation/PresentationSlide/ParagraphSlide";
import PresentationPresenterMenu from "./PresentationPresenterMenu";

const data = [
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

const PresenatationPresenterView = () => {
  const { slideid, id } = useParams();
  const socket = React.useContext(SocketContext);
  const currentSlide = slideList.find((o) => o.slideid === Number(slideid));
  const [code, setCode] = React.useState();

  React.useEffect(() => {
    (async () => {
      const code = await PresentationService.getCodePresentation(id);
      setCode(code);
    })();
  }, []);

  return (
    <StyledPaper
      className="presentation-presenter-view__container"
      sx={{ height: "100vh", width: "100vw", position: "relative" }}
    >
      code: {code}
      <PresentationPresenterMenu />
      <Box className="presentation-presenter-view__content">
        {currentSlide.content}
      </Box>
    </StyledPaper>
  );
};

export default PresenatationPresenterView;
