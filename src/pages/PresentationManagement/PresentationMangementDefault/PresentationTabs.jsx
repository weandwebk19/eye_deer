import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import PresentationService from "services/presentationService";

import StyledTabs from "components/Tabs/StyledTabs";

import PresentationTabContent from "./PresentationTabContent";
import presentationDefaultPicture from "../../../assets/imgs/bg-img-3.jpg";

const PresentationTabs = () => {
  const menuListOfOwner = [
    {
      id: 1,
      children: "presentation settings",
      onClick: () => {
        console.log("presentation settings");
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

  const menuListOfCoOwner = [];

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
              slides: presentation.slides
            }))(presentation)}
            menulist={menuList}
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
  }, []);

  return <StyledTabs tabElements={tabElements} />;
};

export default PresentationTabs;
