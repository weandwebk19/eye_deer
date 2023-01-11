import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography } from "@mui/material";

import useSize from "@react-hook/size";
import AddPresentation from "pages/Group/PresentationList/AddPresentation";
import PropTypes from "prop-types";
import PresentationService from "services/presentationService";

import { AvatarButton, StyledButton } from "components/Button";
import { CarpetCard } from "components/Card";
import { ContentBox } from "components/ContentBox";
import { FormDialog } from "components/Dialog";
import { StyledHeadingTypography } from "components/Typography/StyledTypography";

const HomeLastSection = ({ fullname, user }) => {
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    (async () => {
      const presentations = await PresentationService.getMyPresentations();
      setPresentations(
        presentations.filter((presentation) => presentation.status === 1)
      );
    })();
  }, []);

  const navigate = useNavigate();

  const dashboardEyeDeerTitle = useRef();
  const [, typoHeight] = useSize(dashboardEyeDeerTitle);

  const handleNavigateGroup = () => {
    navigate("../group");
  };

  const handleNavigatePresentation = () => {
    navigate("/presentation-management");
  };

  return (
    <Grid
      container
      columns={{ xs: 4, sm: 8, md: 4 }}
      spacing={2}
      id="dashboard-md-last-tab"
    >
      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        id="dashboard-welcome"
        sx={{
          display: "grid",
          alignContent: "space-between",
        }}
      >
        <Box>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flexGrow: 1 }}>
              <StyledHeadingTypography variant="h3">
                welcome!
              </StyledHeadingTypography>
              <StyledHeadingTypography variant="h4" gutterBottom>
                {fullname}
              </StyledHeadingTypography>
              <Typography>
                eyedeer. <br />- allows everyone to ask questions, to get
                clarification or a clearer understanding on subjects resulting
                in a more fulfilling learning experience.
              </Typography>
            </Box>
            <AvatarButton picture={user?.picture} fullname={fullname} />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                mt: 2,
                mb: 2,
                flex: "1",
              }}
              src="https://res.cloudinary.com/dbaulxzoc/image/upload/v1669543514/WeAndWeb/bg-img-4_ujohe5.jpg"
              draggable={false}
            />
          </Box>
        </Box>
        <Box>
          <Grid
            container
            columns={{ xs: 1, sm: 1, md: 2, lg: 2 }}
            spacing={2}
            // mb={0}
          >
            <Grid item xs={1} sm={1} md={1} lg={1}>
              <StyledButton
                sx={{ width: "100%" }}
                variant="secondary"
                onClick={handleNavigateGroup}
              >
                my group
              </StyledButton>
            </Grid>
            <Grid item xs={1} sm={1} md={1} lg={1}>
              {/* <StyledButton sx={{ width: "100%" }}>
                create presentation
              </StyledButton> */}
              <Box
                className="button-group"
                sx={{
                  width: "100%",
                }}
              >
                <StyledButton
                  sx={{ width: "100%" }}
                  variant="primary"
                  onClick={handleNavigatePresentation}
                >
                  presentation
                </StyledButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Grid
        item
        xs={4}
        sm={4}
        md={4}
        sx={{ height: `calc(100% - ${typoHeight}px - 5.60px)` }}
      >
        <Typography variant="h6" gutterBottom ref={dashboardEyeDeerTitle}>
          my public eyedeer(s)
        </Typography>
        <Box
          id="dashboard-quizzes-list"
          // columns={{ xs: 4, sm: 4, md: 4, lg: 4 }}
          // spacing={2}
          sx={{ width: "100%" }}
        >
          {presentations.map((presentation, i) => {
            return (
              <Box className="dashboard-quiz" key={presentation.id}>
                <ContentBox
                  name={presentation.name}
                  index={i}
                  contentChips={(({ slides, code, status }) => ({
                    slides,
                    code,
                    status: status == 0 ? "private" : "public",
                  }))(presentation)}
                  handleClick={() => {
                    (async () => {
                      const firstSlideRes =
                        await PresentationService.getFirstSlide(
                          presentation.id
                        );
                      if (firstSlideRes.success === true) {
                        const firstSlide = firstSlideRes.data;
                        navigate(
                          `/presentation/${presentation.id}/${firstSlide.id}/edit`
                        );
                      }
                    })();
                  }}
                  handleChange={() => {
                    console.log(`${presentation.i + 1} handle change`);
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Grid>
    </Grid>
  );
};

HomeLastSection.propTypes = {
  fullname: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};
export default HomeLastSection;
