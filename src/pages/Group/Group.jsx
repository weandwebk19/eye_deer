import { Route, Routes } from "react-router-dom";

import Chapter from "./Chapter";
import ChapterList from "./Chapter/ChapterList";
import GroupList from "./GroupList";
import Invite from "./Invite";
import Join from "./Join";
import Member from "./Member";
import MemberList from "./Member/MemberList";

const Group = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/invite/:token" element={<Invite />} />
      <Route path="/:id" element={<Chapter />}>
        <Route path="" index element={<ChapterList />} />
        <Route path="members" element={<MemberList />} />
        <Route path="join" element={<Join />} />
      </Route>
    </Routes>
  );
};

export default Group;
