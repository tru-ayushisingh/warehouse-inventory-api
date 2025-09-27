"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const uuid_1 = require("uuid");
class ProductService {
    constructor() {
        this.products = new Map();
    }
    createProduct(productData) {
        if (!productData.name?.trim()) {
            throw new Error('Product name is required');
        }
        if (!productData.description?.trim()) {
            throw new Error('Product description is required');
        }
        if (productData.stock_quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        if (productData.low_stock_threshold !== undefined && productData.low_stock_threshold < 0) {
            throw new Error('Low stock threshold cannot be negative');
        }
        const product = {
            id: (0, uuid_1.v4)(),
            name: productData.name.trim(),
            description: productData.description.trim(),
            stock_quantity: productData.stock_quantity,
            low_stock_threshold: productData.low_stock_threshold || 10,
            created_at: new Date(),
            updated_at: new Date()
        };
        this.products.set(product.id, product);
        return product;
    }
    getAllProducts() {
        return Array.from(this.products.values());
    }
    getProductById(id) {
        return this.products.get(id) || null;
    }
    updateProduct(id, updateData) {
        const product = this.products.get(id);
        if (!product) {
            throw new Error('Product not found');
        }
        // Validate stock quantity if being updated
        if (updateData.stock_quantity !== undefined && updateData.stock_quantity < 0) {
            throw new Error('Stock quantity cannot be negative');
        }
        // Validate low stock threshold if being updated
        if (updateData.low_stock_threshold !== undefined && updateData.low_stock_threshold < 0) {
            throw new Error('Low stock threshold cannot be negative');
        }
        // Validate name and description if being updated
        if (updateData.name !== undefined && !updateData.name.trim()) {
            throw new Error('Product name cannot be empty');
        }
        if (updateData.description !== undefined && !updateData.description.trim()) {
            throw new Error('Product description cannot be empty');
        }
        const updatedProduct = {
            ...product,
            name: updateData.name?.trim() ?? product.name,
            description: updateData.description?.trim() ?? product.description,
            stock_quantity: updateData.stock_quantity ?? product.stock_quantity,
            low_stock_threshold: updateData.low_stock_threshold ?? product.low_stock_threshold,
            updated_at: new Date()
        };
        this.products.set(id, updatedProduct);
        return updatedProduct;
    }
    deleteProduct(id) {
        return this.products.delete(id);
    }
    increaseStock(id, quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        const product = this.products.get(id);
        if (!product) {
            throw new Error('Product not found');
        }
        const updatedProduct = {
            ...product,
            stock_quantity: product.stock_quantity + quantity,
            updated_at: new Date()
        };
        this.products.set(id, updatedProduct);
        return updatedProduct;
    }
    decreaseStock(id, quantity) {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        const product = this.products.get(id);
        if (!product) {
            throw new Error('Product not found');
        }
        if (product.stock_quantity < quantity) {
            throw new Error(`Insufficient stock. Available: ${product.stock_quantity}, Requested: ${quantity}`);
        }
        const updatedProduct = {
            ...product,
            stock_quantity: product.stock_quantity - quantity,
            updated_at: new Date()
        };
        this.products.set(id, updatedProduct);
        return updatedProduct;
    }
    getLowStockProducts() {
        return Array.from(this.products.values())
            .filter(product => product.stock_quantity < product.low_stock_threshold);
    }
    // Helper method for testing
    clearAllProducts() {
        this.products.clear();
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map