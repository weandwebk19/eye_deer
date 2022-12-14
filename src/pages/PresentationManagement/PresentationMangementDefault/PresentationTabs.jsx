import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import PresentationService from "services/presentationService";

import StyledTabs from "components/Tabs/StyledTabs";
import { FormDialog } from "components/Dialog";

import PresentationTabContent from "./PresentationTabContent";
import presentationDefaultPicture from "../../../assets/imgs/bg-img-3.jpg";
import RemovePresentation from "../RemovePresentation";
import SettingPresentation from "../SettingPresentation";

const PresentationTabs = () => {
  const [removePresentation, setRemovePresentation] = useState(false);
  const [settingPresentation, setSettingPresentation] = useState(false);

  const createRemovePresentationButton = (props) => {
    const removePresentationButton = (
      <FormDialog content="remove" title="Remove Presentation">
        <RemovePresentation {...props} />
      </FormDialog>
    );
    return removePresentationButton;
  };

  const createSettingPresentationButton = (props) => {
    const settingPresentationButton = (
      <FormDialog content="setting" title="Setting Presentation">
        <SettingPresentation {...props}/>
      </FormDialog>
    );
    return settingPresentationButton;
  };

  const menuListOfOwner = (props) => {
    return [
      {
        id: 1,
        children: createSettingPresentationButton(props),
        onClick: () => {},
      },
      {
        id: 2,
        children: createRemovePresentationButton(props),
        onClick: () => {},
      },
    ];
  };

  const menuListOfCoOwner = (props) => {
    return [];
  };

  const handleRemovePresentation = () => {
    setRemovePresentation(true);
  }

  const handleSettingPresentation = () => {
    setSettingPresentation(true);
  }

  const [tabElements, setTabElements] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

  const getContents = (presentations, menuList) => {
    return presentations.map((presentation) => {
      return (
        <Grid item xs={4} sm={4} md={6} lg={4} key={presentation.id}>
          <PresentationTabContent
            id={presentation.id}
            name={presentation.name}
            picture={presentationDefaultPicture}
            contentChips={(() => ({
              code: presentation.code,
              slides: presentation.slides,
              status: presentation.status == 1 ? "public" : "private"
            }))(presentation)}
            menulist={menuList({
              presentationId: presentation.id,
              handleRemovePresentation,
              handleSettingPresentation,
            })}
          />
        </Grid>
      );
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const myPresentations = await PresentationService.getMyPresentations();
        const myCoPresentations = await PresentationService.getMyCoPresentations();
        console.log(myPresentations, myCoPresentations);
        
        setRemovePresentation(false);
        setSettingPresentation(false);

        const newTabElements = [];
        newTabElements.push({
          title: "my presentations",
          content: getContents(myPresentations, menuListOfOwner),
        });
        newTabElements.push({
          title: "my co-presentations",
          content: getContents(myCoPresentations, menuListOfCoOwner),
        });

        setTabElements(newTabElements);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [removePresentation, settingPresentation]);

  return <StyledTabs tabElements={tabElements} />;
};

export default PresentationTabs;
