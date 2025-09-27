import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { ProductService } from '../services/ProductService';

const router = Router();
const productService = new ProductService();
const productController = new ProductController(productService);

// Product CRUD routes
router.post('/products', productController.createProduct);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Stock management routes
router.post('/products/:id/increase-stock', productController.increaseStock);
router.post('/products/:id/decrease-stock', productController.decreaseStock);

// Low stock products (bonus feature)
router.get('/products/low-stock/list', productController.getLowStockProducts);

export default router;