import { Request, Response } from "express";
import Receitas from "../models/Receitas.model";

export default {
  deleteExistingReceita: async (req: Request, res: Response) => {
    const id = req.params.id;
    const postExists = await Receitas.findById(id);

    if (!postExists) {
      return res.status(404).json({ message: "Receita não encontrada!" });
    }

    try {
      await Receitas.deleteOne({ _id: id });

      return res.status(200).json({ message: "Receita deletada com sucesso!" });
    } catch (err) {
      console.log({ delete_post_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  updateExistingReceita: async (req: Request, res: Response) => {
    const id = req.params.id;
    const existingReceita = await Receitas.findById(id);

    if (!existingReceita) {
      return res.status(404).json({ message: "Receita não encontrada!" });
    }

	const receitaUpdated = {
		receitas: req.body?.receitas
	};

    try {
      await Receitas.updateOne({ _id: id }, receitaUpdated);

      return res.status(201).json({ message: "Receita atualizada com sucesso!" });
    } catch (err) {
      console.log({ update_post_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  registerNewReceita: async (req: Request, res: Response) => {
    const newReceita = {
      receitas: req.body?.receitas
    };

    try {
      await Receitas.create(newReceita);

      return res.status(201).json({ message: "Receita registrada com sucesso!" });
    } catch (err) {
      console.log({ create_new_financa_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  findReceitaById: async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const receita = await Receitas.findById(id);

      return res.status(200).json(receita);
    } catch (err) {
      console.log({ find_post_by_id_request_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
  findAllReceitas: async (req: Request, res: Response) => {
    try {
      const receita = await Receitas.find();

      return res.status(200).json(receita);
    } catch (err) {
      console.log({ find_all_financas_error: err });
      return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
    }
  },
};
