import express from "express";
import receitas from "../controllers/receitas.controller";
import despesas from "../controllers/despesas.controller";
import receber from "../controllers/receber.controller";
import authMiddleware from "../middlewares/auth.middleware";
const router = express.Router();

router.delete("/delete/receber/:id", authMiddleware.checkAuthentication, receber.deleteExistingReceber);
router.delete("/delete/despesas/:id", authMiddleware.checkAuthentication, despesas.deleteExistingDespesa);
router.delete("/delete/receitas/:id", authMiddleware.checkAuthentication, receitas.deleteExistingReceita);

router.patch("/update/receber/:id", authMiddleware.checkAuthentication, receber.updateExistingReceber);
router.patch("/update/despesas/:id", authMiddleware.checkAuthentication, despesas.updateExistingDespesa);
router.patch("/update/receitas/:id", authMiddleware.checkAuthentication, receitas.updateExistingReceita);

router.post("/register/receber", authMiddleware.checkAuthentication, receber.registerNewReceber);
router.post("/register/despesas", authMiddleware.checkAuthentication, despesas.registerNewDespesa);
router.post("/register/receitas", authMiddleware.checkAuthentication, receitas.registerNewReceita);

router.get("/receber/:id", authMiddleware.checkAuthentication, receber.findReceberById);
router.get("/despesas/:id", authMiddleware.checkAuthentication, despesas.findDespesaById);
router.get("/receitas/:id", authMiddleware.checkAuthentication, receitas.findReceitaById);

router.get("/receber", receber.findAllReceber);
router.get("/despesas", despesas.findAllDespesas);
router.get("/receitas", receitas.findAllReceitas);

export default router;
