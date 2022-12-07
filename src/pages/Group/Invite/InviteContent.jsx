import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import GroupService from "services/groupService";

const InviteContent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      // call api to add member to group
      const res = await GroupService.addMemberFromToken(params.token);

      // noti
      alert(res.message);

      //
      if ((res.success = true)) {
        // redirect to /group
        navigate(`/group/${res.groupId}`, {
          state: { groupId: res.groupId },
        });
      }
    })();
    console.log("sfsd");
  }, []);

  return <div>Loading!...</div>;
};

export default InviteContent;
