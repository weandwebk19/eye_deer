import { Box } from "@mui/material";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";
import { PreviewBox } from "components/PreviewBox";

import AddPresentationSlide from "../AddPresentationSlide";
import "../styles.scss";

const PresentationPreviewList = () => {
  return (
    <>
      <FormDialog
        content="+ new slide"
        title="Add slide"
        variant="primary"
        className="presentation-preview-list__add-button"
      >
        <AddPresentationSlide />
      </FormDialog>
      {/* <StyledButton
        sx={{ width: "100%", position: "sticky", top: 0, zIndex: 1, mb: 2 }}
      >
        + new slide
      </StyledButton> */}
      <ol>
        <PreviewBox index={1} />
        <PreviewBox index={2} />
        <PreviewBox index={3} />
      </ol>
    </>
  );
};

export default PresentationPreviewList;
