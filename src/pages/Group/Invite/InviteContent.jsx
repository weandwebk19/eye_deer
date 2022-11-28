import { useState, useEffect } from "react";
import { addMemberFromToken } from "httpClient";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const InviteContent = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    (async () => {
      // call api to add member to group
      const res = await addMemberFromToken(currentUser, dispatch, params.token);

      // noti
      alert(res.message);

      //
      if(res.success = true){
        // redirect to /group
        navigate(`/group/${res.groupId}`, {
          state: { groupId: res.groupId },
        });
      }
    })();
    console.log("sfsd")
  }, []);

  return(
    <div>Loading!...</div>
  )
};

export default InviteContent;
