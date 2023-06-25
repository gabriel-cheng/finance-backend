import { Request, Response } from "express";
import Financa from "../models/Financas.model";

export default {
	deleteExistingFinanca: async(req: Request, res: Response) => {
		const id = req.params.id;
		const postExists = await Financa.findById(id);

		if(!postExists) {
			return res.status(404).json({message: "A postagem não foi encontrada!"});
		}

		try {
			await Financa.deleteOne({_id: id});

			return res.status(200).json({message: "Postagem deletada com sucesso!"});
		} catch(err) {
			console.log({delete_post_error: err});
			return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
		}
	},
	updateExistingFinanca: async(req: Request, res: Response) => {
		const id = req.params.id;
		const file = req.file;
		const existingPost = await Financa.findById(id);

		if(!existingPost) {
			return res.status(404).json({message: "Postagem não encontrada!"});
		}

        interface iPostUpdate {
            title?: string;
            shortDescription?: string;
            description?: string;
            pictureName?: string;
            pictureSrc?: string;
        }

        const {
        	title,
        	shortDescription,
        	description
        } = req.body;

        const updatedPost: iPostUpdate = {
        	title,
        	shortDescription,
        	description,
        };

        try {
        	await Financa.updateOne({_id: id}, updatedPost);

        	return res.status(201).json({message: "Postagem atualizada com sucesso!"});
        } catch(err) {
        	console.log({update_post_error: err});
        	return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
        }
	},
	registerNewFinanca: async(req: Request, res: Response) => {
		const newFinanca = {
			receitas: req.body?.receitas,
			despesas: req.body?.despesas,
			receber: req.body?.receber
		};

		try {
			await Financa.create(newFinanca);

			return res.status(201).json({message: "Dados registrados com sucesso!"});
		} catch(err) {
			console.log({create_new_financa_error: err});
			return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
		}
	},
	findFinancaById: async(req: Request, res: Response) => {
		const id = req.params.id;

		try {
			const financa = await Financa.findById(id);

			return res.status(200).json(financa);
		} catch(err) {
			console.log({find_financa_by_id_error: err});
			return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
		}
	},
	findAllFinancas: async(req: Request, res: Response) => {
		try {
			const financa = await Financa.find();

			return res.status(200).json(financa);
		} catch(err) {
			console.log({find_all_financas_error: err});
			return res.status(500).json({message: "Erro interno de servidor, tente novamente mais tarde!"});
		}
	}
};
