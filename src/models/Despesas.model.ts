import { model, Schema } from "mongoose";

interface iDespesasSchema {
  despesas: [{ valor: number, nota: string }],
}

const despesasSchema = new Schema<iDespesasSchema>({
  despesas: [{
    valor: { type: Number, required: false },
    nota: { type: String, required: false }
  }],
});

const Despesas = model("Despesas", despesasSchema);

export default Despesas;
