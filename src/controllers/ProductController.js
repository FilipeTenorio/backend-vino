import Product from '../models/ProductModel.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products.length === 0) {
      return res.status(404).send('Nenhum produto encontrado');
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Erro ao buscar produtos');
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Produto não encontrado');
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send('Erro ao buscar produto');
  }
};

//SOMENTE PARA POVOAR O BANCO DE DADOS

export const createProduct = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, imagemUrl, categoria, links } = req.body;

    // validação simples para links: se existir, deve ser array
    if (links && !Array.isArray(links)) {
      return res.status(400).send('Links deve ser um array');
    }

    const newProduct = new Product({ nome, descricao, preco, estoque, imagemUrl, categoria, links });
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send('Erro ao criar produto');
  }
};
