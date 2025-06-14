import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: true,
    trim: true,
  },
  preco: {
    type: Number,
    required: true,
    min: [0, 'O preço deve ser maior ou igual a zero'],
  },
  estoque: {
    type: Number,
    required: true,
    min: [0, 'O estoque deve ser maior ou igual a zero'],
  },
  imagemUrl: {
    type: String,
    default: 'URL da imagem do produto',
  },
  categoria: {
    type: String,
    required: true,
  },
  links: [
    {
      nome: { type: String, required: true },
      url: { type: String, required: true }
    }
  ]
});

const Product = mongoose.model('Product', productSchema);

export default Product;
