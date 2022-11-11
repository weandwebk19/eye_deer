import { Box } from "@mui/material";
import { StyledNavigationBar } from "../../components/Navigation/StyledNavigationBar";
import { StyledPrimaryButton } from "../../components/Button/StyledButton";
import { StyledInputField } from "../../components/Textbox/StyledInputField";

import MyLogo1 from "../../assets/imgs/logo.svg";
import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import "./styles.scss";

const Home = () => {
  return (
    <>
      <StyledNavigationBar />
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        <img src={MyLogo1} alt="eyedeer logo" draggable="false" />
        <StyledInputField
          sx={{
            width: "200px",
            mt: 4,
            fontWeight: "bold",
          }}
          id="outlined-basic"
          label="eyedeer code"
          variant="outlined"
        />
        <StyledPrimaryButton sx={{ width: "200px", mt: 2 }}>
          enter
        </StyledPrimaryButton>
        <img
          src={MyDeco2Lines}
          className="deco-lines"
          draggable={false}
          alt="deco lines"
        />
      </Box>
    </>
  );
};

export default Home;
