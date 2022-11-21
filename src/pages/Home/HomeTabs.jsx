import StyledTabs from "../../components/Tabs/StyledTabs";

const HomeTabs = ({
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

export default HomeTabs;
