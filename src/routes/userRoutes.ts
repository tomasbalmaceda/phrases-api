import { Router } from "express";

import phraseController from "../controllers/phraseController";

const router = Router();

router.post("/frases", phraseController.createPhrase);
router.get("/frases", phraseController.getPhrases);
router.get("/frase/aleatoria", phraseController.randomPhrase);

router.put("/frase/:id", phraseController.updatePhrase);
router.get("/frase/:id", phraseController.getPhrase);
router.delete("/frase/:id", phraseController.deletePhrase);

export default router;
