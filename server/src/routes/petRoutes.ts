import { Router } from "express";
import * as petController from "../controllers/petController";
import { validateBody } from "../middlewares/validation";
import { createPetData } from "../schema/petSchema";
import { authMiddleware } from "../middlewares/auth";


const router = Router();

router.use(authMiddleware);

router.post("/pets", validateBody(createPetData), petController.createPet);
router.get("/pets/:id", petController.getPetById);
router.get("/pets", petController.getAllPets);
router.delete("/pets/:id", petController.deletePet);

export default router;
