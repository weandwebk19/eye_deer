import { Routes, Route } from "react-router-dom";
import Member from "./Member";
import MemberProfile from "./Member/MemberProfile";
import Chapter from "./Chapter";

const Group = () => {
  return (
    <Routes>
      <Route path="/" index={true} element={<Chapter />} />
      <Route path="/member-list" index={false} element={<Member />} />
      <Route
        path="/member-list/:id"
        index={false}
        element={<MemberProfile />}
      />
    </Routes>
  );
};

export default Group;
