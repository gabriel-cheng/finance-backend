import express from "express";
import controller from "../controllers/index.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.delete("/delete/:id", authMiddleware.checkAuthentication, controller.deleteExistingFinanca);
router.patch("/update/:id", authMiddleware.checkAuthentication, controller.updateExistingFinanca);
router.post("/register", authMiddleware.checkAuthentication, controller.registerNewFinanca);
router.get("/:id", authMiddleware.checkAuthentication, controller.findFinancaById);
router.get("/", controller.findAllFinancas);

export default router;
