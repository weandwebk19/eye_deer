import StyledTabs from "../../components/Tabs/StyledTabs";

const DashboardTabs = ({
  onChangeTab,
  myGroupList,
  joinedGroupList,
  dashboardNavHeight,
  dashboardHeaderHeight,
}) => {
  // console.log("myGroupList");
  // console.log(myGroupList);
  // console.log("joinedGroupList");
  // console.log(joinedGroupList);
  return (
    <StyledTabs
      // onChangeTab={onChangeTab}
      myGroupList={myGroupList}
      joinedGroupList={joinedGroupList}
      dashboardNavHeight={dashboardNavHeight}
      dashboardHeaderHeight={dashboardHeaderHeight}
    />
  );
};

export default DashboardTabs;
