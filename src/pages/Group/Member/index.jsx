import { DefaultLayout } from "layouts";

import MemberList from "./MemberList";
import MemberSideSection from "./MemberSideSection";

import "../styles.scss";

const Member = () => {
  return (
    <DefaultLayout
      name="group's name: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      mainSection={<MemberList />}
      sideSection={<MemberSideSection />}
    />
  );
};

export default Member;
