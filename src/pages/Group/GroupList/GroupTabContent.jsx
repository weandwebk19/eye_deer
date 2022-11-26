import { useNavigate } from "react-router-dom";

import {
  Button,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { StyledCard } from "components/Card";

function GroupTabContent({ id, chapters, members, name, picture }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const path = `./${id}`;
    navigate(path, { state: { groupId: id } });
  };
  return (
    <Grid item xs={4} sm={4} md={2} lg={1}>
      <StyledCard variant="brick">
        <CardActionArea>
          <Button onClick={handleClick}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "space-between",
                height: "100%",
                padding: "5px",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{members} member(s)</Typography>
                </Box>
              </CardContent>
              <Typography variant="h6" noWrap>
                {name}
              </Typography>
            </Box>
          </Button>
        </CardActionArea>
      </StyledCard>
    </Grid>
  );
}

export default GroupTabContent;
