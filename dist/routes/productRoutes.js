"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const ProductService_1 = require("../services/ProductService");
const router = (0, express_1.Router)();
const productService = new ProductService_1.ProductService();
const productController = new ProductController_1.ProductController(productService);
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
exports.default = router;
//# sourceMappingURL=productRoutes.js.map