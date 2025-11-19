import { Router } from "express";
import * as clientController from "../controllers/clientController";
import { validateBody, validateParams } from "../middlewares/validation";
import { createClientData } from "../schema/clientSchema";

const router = Router();

router.post("/clients", validateBody(createClientData), clientController.createClient);

router.get("/clients/:id", clientController.getClientById);

router.get("/clients/email/:email", clientController.getClientByEmail);

router.get("/clients", clientController.getAllClients);

router.delete("/clients/:id", clientController.deleteClient);

export default router;
