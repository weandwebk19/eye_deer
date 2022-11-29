import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { DialogActions, DialogContent } from "@mui/material";

import { getSearchUsers, sendEmailToInviteMember } from "httpClient";

import { StyledButton } from "components/Button";
import { StyledPaper } from "components/Paper";
import { InstantMessage } from "components/Popup";
import { ScrollStack } from "components/Stack";
import { StyledInputField } from "components/TextField";

import ChooseMemberButton from "./ChooseMemberButton";
import MemberChosen from "./MemberChosen";

const AddMember = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [users, setUsers] = useState([]);
  const [memberChosen, setMemberChosen] = useState();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const groupId = params.id;

  // state of ui after add member
  const [isError, setIsError] = useState("");
  const [messageFromServer, setMessageFromServer] = useState("");

  const onSubmit = async () => {
    // call api add user to group with groupId and user is memberChosen
    // And at the same time Send email to memberChosen
    const res = await sendEmailToInviteMember(
      currentUser,
      dispatch,
      groupId,
      memberChosen.id
    );

    // handle res
    if (res.success === true) {
      setMessageFromServer(res.message);
      setIsError(false);
    } else {
      setMessageFromServer(res.message);
      setIsError(true);
    }
  };

  const handleOnChange = (e) => {
    (async () => {
      const term = e.target.value;
      const users = await getSearchUsers(currentUser, dispatch, term).catch(
        (err) => {
          console.error(err);
        }
      );

      setUsers(users);
    })();
  };

  const generateChooseMemberButtons = (users) => {
    return users.map((user) => {
      return (
        <ChooseMemberButton
          user={user}
          onClick={(e) => handleChooseMember(user, e)}
        />
      );
    });
  };

  const handleChooseMember = (user, event) => {
    setUsers([]);
    setMemberChosen(user);
  };

  return (
    <StyledPaper sx={{ top: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ p: 1 }}>
          <StyledInputField
            onChange={handleOnChange}
            variant="outlined"
            customvariant="light"
            fullWidth
            id="term"
            label="username or email"
            name="term"
            autoComplete="term"
          />
          {errors.name ? (
            <div className="error-message-validate">{errors.name.message}</div>
          ) : null}
          <ScrollStack items={generateChooseMemberButtons(users)} />
          {(() => {
            if (memberChosen) {
              const handleCancel = () => {
                setMemberChosen(null);
              };
              return (
                <MemberChosen user={memberChosen} onCancel={handleCancel} />
              );
            }
          })()}
        </DialogContent>
        <DialogActions>
          <StyledButton fullWidth type="submit">
            Add
          </StyledButton>
        </DialogActions>
        {(() => {
          if (isError === false) {
            return (
              <InstantMessage variant="success" message={messageFromServer} />
            );
          } else if (isError === true) {
            return (
              <InstantMessage variant="error" message={messageFromServer} />
            );
          }
          return "";
        })()}
      </form>
    </StyledPaper>
  );
};

export default AddMember;
