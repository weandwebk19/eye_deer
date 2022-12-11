import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Box, DialogActions, DialogContent } from "@mui/material";

import { SocketContext } from "context/socket";
import TokenService from "services/tokenService";

import { StyledButton } from "components/Button";
import { FormDialog } from "components/Dialog";
import { NavBar, UnregisteredNavBar } from "components/Navigation";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";

import MyDeco2Lines from "../../assets/imgs/deco-2lines.svg";
import MyLogo1 from "../../assets/imgs/logo.svg";
import { StyledInputField } from "../../components/TextField/StyledInputField";
import "./styles.scss";

const Play = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ reValidateMode: "onChange" });
  const [isError, setIsError] = useState("");
  const [message, setMessage] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const currentUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const user = currentUser?.user;
  // const userId = currentUser?.user.id;

  const handleJoinPresent = useCallback((data) => {
    if (data.firstName) {
      data.user = { firstName: data.firstName };
    } else if (user) {
      data.user = user;
    }
    // console.log("data", data);

    socket.emit("CLIENT_SEND_JOIN_PRESENTATION", data);
    socket.on("SERVER_SEND_JOIN_SUCCESS", (data, presentation) => {
      console.log("data", data);
      const presentationParse = JSON.parse(presentation);
      console.log("presentation", presentationParse);
      navigate(
        `/presentation/${presentationParse?.presentationId}/${presentationParse?.slideId}/participating`
      );
    });
    socket.on("SERVER_SEND_JOIN_FAIL", () => {
      setMessage(`Code ${data.code} could not be found. Please try again.`);
      setIsError(true);
    });
  }, []);

  const handleWithNameSubmit = (data) => {
    console.log(data);
    socket.emit("CLIENT_SEND_JOIN_PRESENTATION", data);
  };

  const handleNameInputChange = (e) => {
    console.log(e.target.value);
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  return (
    <>
      {isLoggedIn ? <NavBar /> : <UnregisteredNavBar />}
      {user ? (
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
          <StyledButton sx={{ width: "200px", mt: 2 }} type="submit">
            enter
          </StyledButton>
          <img
            src={MyDeco2Lines}
            className="deco-lines"
            draggable={false}
            alt="deco lines"
          />
        </Box>
      ) : (
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
            label="enter code"
            variant="outlined"
            // onChange={handleCodeChange}
            {...register("code", {
              required: true,
              pattern: {
                value: /^[0-9]{1,6}$/i,
                message: "wrong format!",
              },
            })}
          />
          {errors.name ? (
            <div className="error-message-validate">{errors.name.message}</div>
          ) : null}
          <FormDialog
            content={
              <StyledButton sx={{ width: "200px", mt: 2 }} type="submit">
                enter
              </StyledButton>
            }
            variant="primary"
            title="Your name ?"
          >
            <StyledPaper>
              <Box component="form" onSubmit={handleSubmit(handleJoinPresent)}>
                <DialogContent sx={{ p: 1 }}>
                  <StyledInputField
                    variant="outlined"
                    customvariant="light"
                    fullWidth
                    id="First Name"
                    label="First Name"
                    // onChange={handleNameInputChange}
                    {...register("firstName", {
                      required: true,
                    })}
                  />
                  {errors.name ? (
                    <div className="error-message-validate">
                      {errors.name.message}
                    </div>
                  ) : null}
                </DialogContent>
                <DialogActions>
                  <StyledButton fullWidth type="submit">
                    Done
                  </StyledButton>
                </DialogActions>
              </Box>
            </StyledPaper>
          </FormDialog>
          <img
            src={MyDeco2Lines}
            className="deco-lines"
            draggable={false}
            alt="deco lines"
          />
        </Box>
      )}
      {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
      })()}
    </>
  );
};

export default Play;
