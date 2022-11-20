import { Routes, Route } from "react-router-dom";
import MemberList from "./Member/MemberList";

const Group = () => {
    return (
      <Routes>
        <Route path="/member" index={true} element={<MemberList />} />
      </Routes>
    );
  };

export default Group;