import { Route, Routes } from "react-router-dom";

import Chapter from "./Chapter";
import ChapterListDetail from "./Chapter/ChapterListDetail";
import GroupList from "./GroupList";
import Join from "./Join";
import MemberList from "./Member/MemberList";

const Group = () => {
  return (
    <Routes>
      <Route path="/" element={<GroupList />} />
      <Route path="/:id" element={<Chapter />}>
        <Route path="" index element={<ChapterListDetail />} />
        <Route path="members" element={<MemberList />} />
        <Route path="join" element={<Join />} />
      </Route>
    </Routes>
  );
};

export default Group;
