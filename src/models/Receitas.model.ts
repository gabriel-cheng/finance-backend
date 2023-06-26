import { model, Schema } from "mongoose";

interface iReceitasSchema {
  receitas: [{ valor: number, nota: string }],
}

const receitasSchema = new Schema<iReceitasSchema>({
  receitas: [{
    valor: { type: Number, required: false },
    nota: { type: String, required: false }
  }]
});

const Receitas = model("Receitas", receitasSchema);

export default Receitas;
