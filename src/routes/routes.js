import { FLayout } from "layouts";

import Confirmation from "../pages/Auth/confirmation";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Group from "../pages/Group";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Presentation from "../pages/Presentation";
import Profile from "../pages/User/Profile";

// public Routes
const publicRoutes = [
  { path: "/", component: Play },
  { path: "/register/*", component: Register },
  { path: "/login/*", component: Login },
  { path: "/confirmation/*", component: Confirmation },
];
// private Routes
const privateRoutes = [
  { path: "/home/*", component: Home },
  { path: "/group/*", component: Group },
  { path: "/presentation/*", component: Presentation },
  { path: "/profile/*", component: Profile },
];

export { publicRoutes, privateRoutes };
