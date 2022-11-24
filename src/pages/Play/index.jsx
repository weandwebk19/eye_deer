import { useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { NavBar, UnregisteredNavBar } from "components/Navigation";
import { StyledButton } from "components/Button";
import { StyledInputField } from "../../components/Textbox/StyledInputField";

import MyLogo1 from "../../assets/imgs/logo.svg";
import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import "./styles.scss";

const Home = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const user = currentUser?.user;

  return (
    <>
      {user ? <NavBar /> : <UnregisteredNavBar />}
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

export default Home;
