"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
class ProductController {
    constructor(productService) {
        this.createProduct = (req, res) => {
            try {
                const product = this.productService.createProduct(req.body);
                res.status(201).json({
                    success: true,
                    data: product,
                    message: 'Product created successfully'
                });
            }
            catch (error) {
                res.status(400).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.getAllProducts = (req, res) => {
            try {
                const products = this.productService.getAllProducts();
                res.status(200).json({
                    success: true,
                    data: products,
                    count: products.length
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.getProductById = (req, res) => {
            try {
                const product = this.productService.getProductById(req.params.id);
                if (!product) {
                    return res.status(404).json({
                        success: false,
                        error: 'Product not found'
                    });
                }
                res.status(200).json({
                    success: true,
                    data: product
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.updateProduct = (req, res) => {
            try {
                const product = this.productService.updateProduct(req.params.id, req.body);
                res.status(200).json({
                    success: true,
                    data: product,
                    message: 'Product updated successfully'
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.deleteProduct = (req, res) => {
            try {
                const deleted = this.productService.deleteProduct(req.params.id);
                if (!deleted) {
                    return res.status(404).json({
                        success: false,
                        error: 'Product not found'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'Product deleted successfully'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.increaseStock = (req, res) => {
            try {
                const product = this.productService.increaseStock(req.params.id, req.body.quantity);
                res.status(200).json({
                    success: true,
                    data: product,
                    message: 'Stock increased successfully'
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.decreaseStock = (req, res) => {
            try {
                const product = this.productService.decreaseStock(req.params.id, req.body.quantity);
                res.status(200).json({
                    success: true,
                    data: product,
                    message: 'Stock decreased successfully'
                });
            }
            catch (error) {
                const statusCode = error instanceof Error && error.message === 'Product not found' ? 404 : 400;
                res.status(statusCode).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.getLowStockProducts = (req, res) => {
            try {
                const products = this.productService.getLowStockProducts();
                res.status(200).json({
                    success: true,
                    data: products,
                    count: products.length,
                    message: products.length > 0 ? 'Low stock products found' : 'No products below low stock threshold'
                });
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error occurred'
                });
            }
        };
        this.productService = productService;
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map