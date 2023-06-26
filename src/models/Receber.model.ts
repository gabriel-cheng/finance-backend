import { model, Schema } from "mongoose";

interface iReceberSchema {
  receber: [{ valor: number, nota: string }],
}

const receberSchema = new Schema<iReceberSchema>({
  receber: [{
    valor: { type: Number, required: false },
    nota: { type: String, required: false }
  }],
});

const Receber = model("Receber", receberSchema);

export default Receber;
