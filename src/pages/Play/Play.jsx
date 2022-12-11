import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Box, DialogActions, DialogContent } from "@mui/material";

import { SocketContext } from "context/socket";
import TokenService from "services/tokenService";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";
import { NavBar, UnregisteredNavBar } from "components/Navigation";

import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import MyLogo1 from "../../assets/imgs/logo.svg";
import { StyledInputField } from "../../components/TextField/StyledInputField";
import "./styles.scss";

const Play = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const user = currentUser?.user;
  // const userId = currentUser?.user.id;

  const socket = useContext(SocketContext);
  const [joined, setJoined] = useState(false);

  const handleInviteAccepted = useCallback(() => {
    setJoined(true);
  }, []);

  const handleJoinPresent = useCallback((data) => {
    console.log(data);
    if (user) {
      data.user = user;
    } else {
      data.user = {
        firstName: data.firstName,
      };
    }
    socket.emit("CLIENT_SEND_JOIN_PRESENTATION", data);
  }, []);

  useEffect(() => {
    // const socket = io(config.SERVER_URL);
    // socket.on("connect", () => {
    //   console.log("connected to backend");
    // });
    // console.log(socket);
    // return () => {
    //   socket.disconnect();
    // };

    // emit USER_ONLINE event
    // socket.emit("USER_ONLINE", userId);

    // subscribe to socket events
    socket.on("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("JOIN_REQUEST_ACCEPTED", handleInviteAccepted);
    };
  }, [socket, handleInviteAccepted]);

  useEffect(() => {
    return () => {
      // socket.disconnect();
    };
  }, []);

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
        component="form"
        onSubmit={handleSubmit(handleJoinPresent)}
      >
        <img src={MyLogo1} alt="eyedeer logo" draggable="false" />
        <StyledInputField
          sx={{
            width: "200px",
            mt: 4,
            fontWeight: "bold",
          }}
          id="outlined-basic"
          label="enter code"
          variant="outlined"
          {...register("code", {
            required: true,
            pattern: {
              value: /^[0-9]{1,6}$/i,
              message: "wrong format!",
            },
          })}
        />
        {errors.code ? (
          <div className="error-message-validate">{errors.code.message}</div>
        ) : null}
        {user ? (
          <StyledButton sx={{ width: "200px", mt: 2 }} type="submit">
            enter
          </StyledButton>
        ) : (
          <FormDialog content="enter" variant="primary" title="Your name?">
            <DialogContent sx={{ p: 1 }}>
              <StyledInputField
                variant="outlined"
                customvariant="light"
                fullWidth
                id="user-name"
                label="user name"
                name="userName"
                autoComplete="user-name"
                {...register("firstName", {
                  required: "required",
                })}
              />
            </DialogContent>
            <DialogActions>
              <StyledButton type="submit">Done</StyledButton>
            </DialogActions>
          </FormDialog>
        )}
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
