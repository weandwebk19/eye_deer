import { FLayout } from "layouts";

import GroupInfo from "../GroupInfo";
import "../styles.scss";
import MemberList from "./MemberList";

const Member = () => {
  return (
    <FLayout>
      <MemberList />
      <GroupInfo />
    </FLayout>
  );
};

export default Member;
