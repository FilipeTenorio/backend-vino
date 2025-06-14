import express from 'express';
import { getAllProducts, getProductById, createProduct} from '../controllers/ProductController.js';


const router = express.Router();


router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/products/novoproduto', createProduct);



export default router;