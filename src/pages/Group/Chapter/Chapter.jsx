import { FluidLayout } from "layouts";

import GroupInfo from "../GroupInfo";
import "../styles.scss";
import ChapterList from "./ChapterList";

const Chapter = () => {
  return (
    <FluidLayout>
      <ChapterList name="sweet are the uses of adversity which, like the toad, ugly and venomous, wears yet a precious jewel in his head." />
      <GroupInfo />
    </FluidLayout>
  );
};

export default Chapter;
