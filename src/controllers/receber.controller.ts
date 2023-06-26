import { Request, Response } from "express";
import Receber from "../models/Receber.model";

export default {
	deleteExistingReceber: async (req: Request, res: Response) => {
		const id = req.params.id;
		const postExists = await Receber.findById(id);

		if (!postExists) {
			return res.status(404).json({ message: "O item não foi encontrado!" });
		}

		try {
			await Receber.deleteOne({ _id: id });

			return res.status(200).json({ message: "Item deletado com sucesso!" });
		} catch (err) {
			console.log({ delete_post_error: err });
			return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
		}
	},
	updateExistingReceber: async (req: Request, res: Response) => {
		const id = req.params.id;
		const existingReceber = await Receber.findById(id);

		if (!existingReceber) {
			return res.status(404).json({ message: "Item não encontrado!" });
		}

		interface iReceberUpdate {
			valor?: number;
			nota?: string;
		}

		const {
			valor,
			nota
		} = req.body;

		const receberUpdated: iReceberUpdate = {
			valor,
			nota
		};

		try {
			await Receber.updateOne({ _id: id }, receberUpdated);

			return res.status(201).json({ message: "Item atualizado com sucesso!" });
		} catch (err) {
			console.log({ update_post_error: err });
			return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
		}
	},
	registerNewReceber: async (req: Request, res: Response) => {
		const newReceber = {
			receber: req.body?.receber
		};

		try {
			await Receber.create(newReceber);
			return res.status(201).json({ message: "Item adicionado com sucesso!" });
		} catch (err) {
			console.log({ create_new_financa_error: err });
			return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
		}
	},
	findReceberById: async (req: Request, res: Response) => {
		const id = req.params.id;

		try {
		  const receber = await Receber.findById(id);

		  return res.status(200).json(receber);
		} catch (err) {
		  console.log({ find_post_by_id_request_error: err });
		  return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
		}
	},
	findAllReceber: async (req: Request, res: Response) => {
		try {
			const receber = await Receber.find();

			return res.status(200).json(receber);
		} catch (err) {
			console.log({ find_all_financas_error: err });
			return res.status(500).json({ message: "Erro interno de servidor, tente novamente mais tarde!" });
		}
	}
};
