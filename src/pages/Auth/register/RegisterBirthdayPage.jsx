import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box, FormControl, Select, InputLabel, MenuItem, Typography, Button, Grid } from "@mui/material";

const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
const days = Array(31).fill(1).map((n, i) => { 
  if(n + i < 10) {
    return `0${n + i}`;
  }
  else return `${n + i}`;
});

const years = Array(100).fill(1923).map((n, i) => { 
  return `${n + i}`
});

const RegisterBirthdayPage = () => {
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("Jan");
  const [year, setYear] = useState("2001");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleNavigate = () => {
    const path = "/register/form";
    navigate(path, { state: { birthday: new Date(`${month}-${day}-${year}`), role: state.role } });
  };

  const handleChangeDay = (e) => {
    setDay(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  };
  const handleChangeYear = (e) => {
    setYear(e.target.value);
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
          {/* <DesktopDatePicker
            label="Date desktop"
            inputFormat="MM/DD/YYYY"
            value={birthday}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth>
                <InputLabel id="month-select-label">Month</InputLabel>
                <Select
                  key={"month"}
                  labelId="month-select-input-label"
                  id="month-select"
                  label="Month"
                  value={month}
                  onChange={handleChangeMonth}
                >
                  {months.map((element, i) => {
                    return <MenuItem key={i} value={element}>{element}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth>
                <InputLabel id="day-select-label">Day</InputLabel>
                <Select
                  key={"day"}
                  labelId="day-select-input-label"
                  id="day-select"
                  label="Day"
                  value={day}
                  onChange={handleChangeDay}
                >
                  {days.map((element, i) => {
                    return <MenuItem key={i} value={element}>{element}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
              <FormControl fullWidth>
                <InputLabel id="year-select-label">Year</InputLabel>
                <Select
                  key={"year"}
                  labelId="year-select-input-label"
                  id="year-select"
                  label="Year"
                  value={year??"2001"}
                  onChange={handleChangeYear}
                >
                  {years.map((element, i) => {
                    return <MenuItem key={i} value={element}>{element}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleNavigate}>
            Continue
          </Button>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default RegisterBirthdayPage;
