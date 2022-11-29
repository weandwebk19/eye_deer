import { FluidLayout } from "layouts";

import GroupHeader from "../GroupHeader";
import GroupInfo from "../GroupInfo";
import "../styles.scss";

const Chapter = () => {
  return (
    <FluidLayout>
      <GroupHeader />
      <GroupInfo />
    </FluidLayout>
  );
};

export default Chapter;
