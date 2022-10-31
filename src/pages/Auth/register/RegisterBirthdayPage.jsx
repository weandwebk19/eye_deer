import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, TextField, Typography, Button } from "@mui/material";

const RegisterBirthdayPage = () => {
  const [birthday, setBirthday] = useState(new Date());
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleNavigate = () => {
    const path = "/register/form";
    navigate(path, { state: { birthday: birthday, role: state.role } });
  };

  const handleChange = (newValue) => {
    setBirthday(newValue);
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box className="register-container" sx={{ flexGrow: 1 }}>
          <main>
            {/* Hero unit */}
            <div>
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Enter your date of birth
              </Typography>
            </div>
            {/* End hero unit */}
          </main>
          <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={birthday}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" onClick={handleNavigate}>
            Continue
          </Button>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default RegisterBirthdayPage;
