import StyledTabs from "../../components/Tabs/StyledTabs";

const DashboardTabs = ({
  onChangeTab,
  dashboardNavHeight,
  dashboardHeaderHeight,
}) => {
  return (
    <StyledTabs
      // onChangeTab={onChangeTab}
      dashboardNavHeight={dashboardNavHeight}
      dashboardHeaderHeight={dashboardHeaderHeight}
    />
  );
};

export default DashboardTabs;
