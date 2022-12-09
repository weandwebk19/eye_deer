import { FLayout } from "layouts";

import GroupHeader from "../GroupHeader";
import GroupInfo from "../GroupInfo";
import "../styles.scss";

const Presentation = () => {
  return (
    <FLayout>
      <GroupHeader />
      <GroupInfo />
    </FLayout>
  );
};

export default Presentation;
