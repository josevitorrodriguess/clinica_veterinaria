import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import clientRoutes from "./clientRoutes";

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes);
routes.use(clientRoutes)


export default routes;