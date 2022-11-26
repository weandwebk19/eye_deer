import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getJoinedGroups, getOwnedGroups } from "httpClient";

import StyledTabs from "../../../components/Tabs/StyledTabs";
import GroupTabContent from "./GroupTabContent";

const GroupTabs = () => {
  const [tabElements, setTabElements] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);

  const getContents = (groups) => {
    return groups.map((group) => {
      return (
        <GroupTabContent
          key={group.id}
          id={group.id}
          name={group.name}
          picture={group.picture}
          members={group.amountMember}
        />
      );
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const ownedGroups = await getOwnedGroups(currentUser, dispatch);
        const joinedGroups = await getJoinedGroups(currentUser, dispatch);
        const newTabElements = [];
        newTabElements.push({
          title: "my groups",
          content: getContents(ownedGroups),
        });
        newTabElements.push({
          title: "joined groups",
          content: getContents(joinedGroups),
        });

        setTabElements(newTabElements);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <StyledTabs tabElements={tabElements} />;
};

export default GroupTabs;
