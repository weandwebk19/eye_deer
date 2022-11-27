import { FluidLayout } from "layouts";

import GroupInfo from "../GroupInfo";
import "../styles.scss";
import MemberList from "./MemberList";

const Member = () => {
  return (
    <FluidLayout>
      <MemberList name="our doubts are traitors and make us lose the good we oft might win by fearing to attempt." />
      <GroupInfo />
    </FluidLayout>
  );
};

export default Member;
