import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

// import { getJoinedGroups, getOwnedGroups } from "httpClient";
import GroupService from "services/groupService";

import StyledTabs from "components/Tabs/StyledTabs";

import GroupTabContent from "./GroupTabContent";

const GroupTabs = () => {
  const menulist = [
    {
      id: 1,
      children: "group settings",
      onClick: () => {
        console.log("group settings");
      },
    },
    {
      id: 2,
      children: "remove",
      onClick: () => {
        console.log("remove");
      },
    },
  ];

  const [tabElements, setTabElements] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const getContents = (groups) => {
    return groups.map((group) => {
      return (
        <Grid item xs={4} sm={4} md={6} lg={4} key={group.id}>
          <GroupTabContent
            key={group.key}
            id={group.id}
            name={group.name}
            picture={group.picture}
            contentChips={(() => ({
              members: group.totalMembers,
            }))(group)}
            menulist={menulist}
          />
        </Grid>
      );
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const ownedGroups = await GroupService.getOwnedGroups();
        const joinedGroups = await GroupService.getJoinedGroups();
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
