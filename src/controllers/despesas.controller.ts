import { Request, Response } from "express";
import Despesas from "../models/Despesas.model";

export default {
  deleteExistingDespesa: async (req: Request, res: Response) => {
    const id = req.params.id;
    const despesaExists = await Despesas.findById(id);

    if (!despesaExists) {
      return res.status(404).json({ message: "A despesa não foi encontrada!" });
    }

    try {
      await Despesas.deleteOne({ _id: id });

      return res.status(200).json({ message: "Despesa deletada com sucesso!" });
    } catch (err) {
      console.log({ delete_post_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  updateExistingDespesa: async (req: Request, res: Response) => {
    const id = req.params.id;
    const existingDespesa = await Despesas.findById(id);

    if (!existingDespesa) {
      return res.status(404).json({ message: "Despesa não encontrada!" });
    }

    interface iDespesaUpdate {
      valor?: number;
      nota?: string;
    }

    const {
      valor,
      nota
    } = req.body;

    const despesaUpdated: iDespesaUpdate = {
      valor,
      nota
    };

    try {
      await Despesas.updateOne({ _id: id }, despesaUpdated);

      return res.status(201).json({ message: "Despesa atualizada com sucesso!" });
    } catch (err) {
      console.log({ update_post_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  registerNewDespesa: async (req: Request, res: Response) => {
    const newDespesa = {
      despesas: req.body?.despesas
    };

    try {
      await Despesas.create(newDespesa);

      return res.status(201).json({ message: "Despesa registrada com sucesso!" });
    } catch (err) {
      console.log({ create_new_financa_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  findDespesaById: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const despesa = await Despesas.findById(id);

      return res.status(200).json(despesa);
    } catch (err) {
      console.log({ find_post_by_id_request_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  findAllDespesas: async (req: Request, res: Response) => {
    try {
      const despesa = await Despesas.find();

      return res.status(200).json(despesa);
    } catch (err) {
      console.log({ find_all_financas_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  }
};
