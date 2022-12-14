import { FLayout } from "layouts";
import PresenatationParticipantView from "pages/Presentation/ParticipantViewPresentation/PresentationParticipantView";

import Confirmation from "../pages/Auth/confirmation";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import ResetPassword from "../pages/Auth/reset-password";
import Group from "../pages/Group";
import Home from "../pages/Home";
import Play from "../pages/Play";
import Presentation from "../pages/Presentation";
import Profile from "../pages/User/Profile";
import PresentationManagement from "../pages/PresentationManagement";

// public Routes
const publicRoutes = [
  { path: "/", component: Play },
  { path: "/register/*", component: Register },
  { path: "/login/*", component: Login },
  { path: "/reset-password/*", component: ResetPassword },
  { path: "/confirmation/*", component: Confirmation },
];
// private Routes
const privateRoutes = [
  { path: "/home/*", component: Home },
  { path: "/group/*", component: Group },
  { path: "/presentation/*", component: Presentation },
  { path: "/profile/*", component: Profile },
  { path: "/presentation-management/*", component: PresentationManagement },
];

export { publicRoutes, privateRoutes };
