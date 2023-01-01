import { FLayout } from "layouts";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setRole } from "redux/actions/role";

import GroupService from "services/groupService";
import { useEffect } from "react";

import GroupHeader from "../GroupHeader";
import GroupInfo from "../GroupInfo";
import "../styles.scss";


const Presentation = () => {
  const params = useParams();
  const groupId = params.id;
  const dispatch = useDispatch();

  // get role type in group
  useEffect(()=>{
    (async () => {
      const res = await GroupService.getRoleInGroup(groupId);
      dispatch(setRole({roleType: res.roleType}));
    })()
  })

  dispatch(setRole({}))
  return (
    <FLayout>
      <GroupHeader />
      <GroupInfo />
    </FLayout>
  );
};

export default Presentation;
