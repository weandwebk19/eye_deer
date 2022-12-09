import { Outlet, Route, Routes } from "react-router-dom";

import GroupList from "./GroupList";
import Invite from "./Invite";
import Join from "./Join";
import Member from "./Member";
import MemberList from "./Member/MemberList";
import Presentation from "./PresentationList";
import PresentationList from "./PresentationList/PresentationList";

const Group = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/invite/:token" element={<Invite />} />
      <Route path="/:id" element={<Presentation />}>
        <Route path="" index element={<PresentationList />} />
        <Route path="members" element={<MemberList />} />
        <Route path="join" element={<Join />} />
      </Route>
    </Routes>
  );
};

export default Group;
