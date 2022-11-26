import { DefaultLayout } from "layouts";

import "../styles.scss";
import GroupInfo from "./ChapterGroupInfo";
import ChapterList from "./ChapterList";

const Chapter = () => {
  return (
    <DefaultLayout
      name="group's name: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      mainSection={<ChapterList />}
      sideSection={<GroupInfo />}
    />
  );
};

export default Chapter;
