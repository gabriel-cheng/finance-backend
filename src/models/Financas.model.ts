import { model, Schema } from "mongoose";

interface iFinancasSchema {
    receitas: [{valor: number, nota: string}],
    despesas: [{valor: number, nota: string}],
    receber: [{valor: number, nota: string}],
}

const financasSchema = new Schema<iFinancasSchema>({
	receitas: [{
	  valor: { type: Number, required: false },
	  nota: { type: String, required: false }
	}],
	despesas: [{
	  valor: { type: Number, required: false },
	  nota: { type: String, required: false }
	}],
	receber: [{
	  valor: { type: Number, required: false },
	  nota: { type: String, required: false }
	}]
});

const Financas = model("Post", financasSchema);

export default Financas;
