import { Route, Routes } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import { FullWidthLayout } from "layouts";

import Chapter from "./Chapter";
import GroupHome from "./GroupList";
import Member from "./Member";
import MemberProfile from "./Member/MemberProfile";

const Group = () => {
  return (
    <Routes>
      <Route
        path="/"
        index={true}
        element={
          <FullWidthLayout>
            <GroupHome />
          </FullWidthLayout>
        }
      />
      <Route path="/:id" index={false} element={<Chapter />} />
      <Route path="/:id/member-list" index={false} element={<Member />} />
      <Route
        path="/member-list/:id"
        index={false}
        element={<MemberProfile />}
      />
    </Routes>
  );
};

export default Group;
