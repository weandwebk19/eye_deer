import { Route, Routes } from "react-router-dom";

import Chapter from "./Chapter";
import GroupList from "./GroupList";
import Member from "./Member";

const Group = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<GroupList />} />
      <Route path="/:id" index={false} element={<Chapter />} />
      <Route path="/:id/member-list" index={false} element={<Member />} />
    </Routes>
  );
};

export default Group;
