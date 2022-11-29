import { Route, Routes } from "react-router-dom";

import Chapter from "./Chapter";
import GroupList from "./GroupList";
import Join from "./Join";
import Member from "./Member";
import Invite from "./Invite";


const Group = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<GroupList />} />
      <Route path="/:id" index={false} element={<Chapter />} />
      <Route path="/:id/members" index={false} element={<Member />} />
      <Route path="/:id/join" index={false} element={<Join />} />
      <Route path="/invite/:token" index={false} element={<Invite />} />
    </Routes>
  );
};

export default Group;
