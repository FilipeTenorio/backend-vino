import express from 'express';
import {getCart, addItemToCart, updateItemQuantity, removeItemFromCart, emptyCart} from '../controllers/CartController.js';

const router = express.Router();

// Listar itens do carrinho
router.get('/cart/:userId', getCart);

// Adicionar item ao carrinho
router.post('/cart/:userId', addItemToCart);

// Atualizar quantidade de item
router.put('/cart/:userId/:itemId', updateItemQuantity);

// Remover item específico
router.delete('/cart/:userId/:itemId', removeItemFromCart);

// Esvaziar carrinho
router.delete('/cart/:userId', emptyCart);

export default router;