import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

// import { getJoinedGroups, getOwnedGroups } from "httpClient";
import GroupService from "services/groupService";

import StyledTabs from "components/Tabs/StyledTabs";
import { FormDialog } from "components/Dialog";

import GroupTabContent from "./GroupTabContent";
import RemoveGroup from "./RemoveGroup";

const GroupTabs = () => {
  const [removeGroup, setRemoveGroup] = useState(false);
  const [settingGroup, setSettingGroup] = useState(false);

  const createRemoveGroupButton = (props) => {
    const removeGroupButton = (
      <FormDialog content="remove" title="Remove Group">
        <RemoveGroup {...props} />
      </FormDialog>
    );
    return removeGroupButton;
  };

  const createSettingGroupButton = (props) => {
    const settingGroupButton = (
      <FormDialog content="setting" title="Setting Group">
        {/* <SettingGroup {...props}/> */}
        setup later
      </FormDialog>
    );
    return settingGroupButton;
  };

  const menuListOfOwner = (props) => {
    return [
      {
        id: 1,
        children: createSettingGroupButton(props),
        onClick: () => {},
      },
      {
        id: 2,
        children: createRemoveGroupButton(props),
        onClick: () => {},
      },
    ];
  };

  const menuListOfMember = (props) => {
    return [];
  };

  const handleRemoveGroup = () => {
    setRemoveGroup(true);
  }

  const handleSettingGroup = () => {
    setSettingGroup(true);
  }

  const [tabElements, setTabElements] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const getContents = (groups, menuList) => {
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
            menulist={menuList({
              groupId: group.id,
              handleRemoveGroup,
              handleSettingGroup
            })}
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
          content: getContents(ownedGroups, menuListOfOwner),
        });
        newTabElements.push({
          title: "joined groups",
          content: getContents(joinedGroups, menuListOfMember),
        });

        setRemoveGroup(false);
        setSettingGroup(false);
        setTabElements(newTabElements);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [removeGroup, settingGroup]);

  return <StyledTabs tabElements={tabElements} />;
};

export default GroupTabs;
