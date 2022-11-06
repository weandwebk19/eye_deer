import { TextField, Button } from "@mui/material";

import NavigationBar from "../components/Navigation/NavigationBar";

import MyLogo1 from "../assets/imgs/logo.svg";

const Home = () => {
  return (
    <>
      <NavigationBar />
      <img src={MyLogo1} alt="eyedeer logo" />
      <TextField id="outlined-basic" label="eyedeer code" variant="outlined" />
      <Button>enter</Button>
    </>
  );
};

export default Home;
