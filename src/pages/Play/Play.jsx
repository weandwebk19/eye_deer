import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { StyledButton } from "components/Button";
import { NavBar, UnregisteredNavBar } from "components/Navigation";

import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import MyLogo1 from "../../assets/imgs/logo.svg";
import { StyledInputField } from "../../components/TextField/StyledInputField";
import "./styles.scss";

const Play = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // const user = null;
  return (
    <>
      {isLoggedIn ? <NavBar /> : <UnregisteredNavBar />}
      <Box
        sx={{
          width: "300px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          overflow: "hidden !important",
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
        <StyledButton sx={{ width: "200px", mt: 2 }}>enter</StyledButton>
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

export default Play;
