import { FluidLayout } from "layouts";

import GroupInfo from "../GroupInfo";
import "../styles.scss";
import MemberList from "./MemberList";

const Member = () => {
  return (
    <FluidLayout>
      <MemberList />
      <GroupInfo />
    </FluidLayout>
  );
};

export default Member;
