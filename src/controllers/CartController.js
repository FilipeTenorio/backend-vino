import Cart from '../models/CartModel.js';
import Product from '../models/ProductModel.js';

// Buscar carrinho de um usuário
export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'nome preco');

    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado para este usuário.' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar carrinho.', error });
  }
};

// Adicionar item ao carrinho
export const addItemToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }

    if (quantity < 1 || quantity > product.estoque) {
      return res.status(400).json({ message: 'Quantidade inválida. Verifique o estoque disponível.' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      // Verifica se tem estoque suficiente para o aumento
      if (existingItem.quantity + quantity > product.estoque) {
        return res.status(400).json({ message: 'Estoque insuficiente para atualizar a quantidade.' });
      }
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    // Atualiza o estoque do produto
    product.estoque -= quantity;
    await product.save();

    await cart.save();

    res.status(200).json({ message: 'Produto adicionado ao carrinho e estoque atualizado.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar item ao carrinho.', error });
  }
};


// Atualizar quantidade de um item
export const updateItemQuantity = async (req, res) => {
  try {
    const { userId, itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantidade deve ser no mínimo 1.' });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado.' });
    }

    const item = cart.items.id(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item não encontrado no carrinho.' });
    }

    const product = await Product.findById(item.productId);
    if (quantity > product.estoque) {
      return res.status(400).json({ message: 'Quantidade excede o estoque disponível.' });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Quantidade atualizada.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar item.', error });
  }
};

// Remover item do carrinho
export const removeItemFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado.' });
    }

    const itemIndex = cart.items.findIndex(item => item.id.toString() === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item não encontrado.' });
    }

    const item = cart.items[itemIndex];

    // Atualiza o estoque do produto
    const product = await Product.findById(item.productId);
    if (product) {
      product.estoque += item.quantity;
      await product.save();
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({ message: 'Item removido do carrinho e devolvido às prateleiras!', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover item.', error });
  }
};

// Esvaziar carrinho
export const emptyCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Carrinho não encontrado.' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: 'Carrinho esvaziado.', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao esvaziar carrinho.', error });
  }
};