import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  TextField,
} from "@mui/material";

import { getSearchUsers } from "httpClient";

import { StyledButton } from "components/Button";
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

  const onSubmit = async () => {
    console.log("submit");
    // call api add user to group with groupId and user is memberChosen
    // And at the same time Send email to memberChosen
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent>
        <Grid container spacing={3} pt={1} flexDirection="row">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <StyledInputField
              onChange={handleOnChange}
              variant="light"
              fullWidth
              id="term"
              label="username or email"
              name="term"
              autoComplete="term"
            />
            {errors.name ? (
              <div className="error-message-validate">
                {errors.name.message}
              </div>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
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
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <StyledButton fullWidth type="submit">
          Add
        </StyledButton>
      </DialogActions>
    </form>
  );
};

export default AddMember;
