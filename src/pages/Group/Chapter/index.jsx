import { DefaultLayout } from "layouts";

import ChapterList from "./ChapterList";
import GroupInfo from "./ChapterGroupInfo";

import "../styles.scss";

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
