import { Router } from "express";
import * as userController from "../controllers/userController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createUserData } from "../schema/userSchema";


const router = Router();


router.post("/users", validateBody(createUserData), userController.createUser);

router.get("/users/:id", userController.getUserById);

router.get("/users/email/:email", userController.getByEmail);

router.get("/users", userController.getAllUsers);

router.delete("/users/:id", userController.deleteUser);


export default router;