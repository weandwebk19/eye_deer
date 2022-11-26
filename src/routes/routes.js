import { FluidLayout } from "layouts";

import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import Group from "../pages/Group";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Profile from "../pages/User/Profile";

// public Routes
const publicRoutes = [
  { path: "/", component: Play },
  { path: "/register/*", component: Register },
  { path: "/login/*", component: Login },
];
// private Routes
const privateRoutes = [
  { path: "/home/*", component: Home },
  { path: "/group/*", component: Group },
  { path: "/profile/*", component: Profile },
];

export { publicRoutes, privateRoutes };
