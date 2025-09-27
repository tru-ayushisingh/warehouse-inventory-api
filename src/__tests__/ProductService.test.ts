import { ProductService } from '../services/ProductService';
import { CreateProductRequest, UpdateProductRequest } from '../types/Product';

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  afterEach(() => {
    productService.clearAllProducts();
  });

  describe('createProduct', () => {
    it('should create a product with valid data', () => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100,
        low_stock_threshold: 10
      };

      const product = productService.createProduct(productData);

      expect(product).toBeDefined();
      expect(product.id).toBeDefined();
      expect(product.name).toBe('Test Product');
      expect(product.description).toBe('Test Description');
      expect(product.stock_quantity).toBe(100);
      expect(product.low_stock_threshold).toBe(10);
    });

    it('should use default low_stock_threshold if not provided', () => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100
      };

      const product = productService.createProduct(productData);
      expect(product.low_stock_threshold).toBe(10);
    });

    it('should throw error for empty name', () => {
      const productData: CreateProductRequest = {
        name: '',
        description: 'Test Description',
        stock_quantity: 100
      };

      expect(() => productService.createProduct(productData)).toThrow('Product name is required');
    });

    it('should throw error for empty description', () => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: '',
        stock_quantity: 100
      };

      expect(() => productService.createProduct(productData)).toThrow('Product description is required');
    });

    it('should throw error for negative stock quantity', () => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: -1
      };

      expect(() => productService.createProduct(productData)).toThrow('Stock quantity cannot be negative');
    });

    it('should throw error for negative low stock threshold', () => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100,
        low_stock_threshold: -1
      };

      expect(() => productService.createProduct(productData)).toThrow('Low stock threshold cannot be negative');
    });
  });

  describe('increaseStock', () => {
    let productId: string;

    beforeEach(() => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100
      };
      const product = productService.createProduct(productData);
      productId = product.id;
    });

    it('should increase stock quantity successfully', () => {
      const updatedProduct = productService.increaseStock(productId, 50);
      expect(updatedProduct.stock_quantity).toBe(150);
    });

    it('should throw error for non-existent product', () => {
      expect(() => productService.increaseStock('invalid-id', 50)).toThrow('Product not found');
    });

    it('should throw error for zero quantity', () => {
      expect(() => productService.increaseStock(productId, 0)).toThrow('Quantity must be greater than zero');
    });

    it('should throw error for negative quantity', () => {
      expect(() => productService.increaseStock(productId, -10)).toThrow('Quantity must be greater than zero');
    });
  });

  describe('decreaseStock', () => {
    let productId: string;

    beforeEach(() => {
      const productData: CreateProductRequest = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100
      };
      const product = productService.createProduct(productData);
      productId = product.id;
    });

    it('should decrease stock quantity successfully', () => {
      const updatedProduct = productService.decreaseStock(productId, 30);
      expect(updatedProduct.stock_quantity).toBe(70);
    });

    it('should throw error when trying to decrease more than available stock', () => {
      expect(() => productService.decreaseStock(productId, 150))
        .toThrow('Insufficient stock. Available: 100, Requested: 150');
    });

    it('should allow decreasing to exactly zero', () => {
      const updatedProduct = productService.decreaseStock(productId, 100);
      expect(updatedProduct.stock_quantity).toBe(0);
    });

    it('should throw error for non-existent product', () => {
      expect(() => productService.decreaseStock('invalid-id', 50)).toThrow('Product not found');
    });

    it('should throw error for zero quantity', () => {
      expect(() => productService.decreaseStock(productId, 0)).toThrow('Quantity must be greater than zero');
    });

    it('should throw error for negative quantity', () => {
      expect(() => productService.decreaseStock(productId, -10)).toThrow('Quantity must be greater than zero');
    });

    it('should handle edge case: trying to remove 1 from stock of 0', () => {
      // First reduce stock to 0
      productService.decreaseStock(productId, 100);
      
      // Now try to remove 1 more
      expect(() => productService.decreaseStock(productId, 1))
        .toThrow('Insufficient stock. Available: 0, Requested: 1');
    });
  });

  describe('getLowStockProducts', () => {
    it('should return products below low stock threshold', () => {
      // Create products with different stock levels
      const product1Data: CreateProductRequest = {
        name: 'Low Stock Product 1',
        description: 'Description 1',
        stock_quantity: 5,
        low_stock_threshold: 10
      };
      
      const product2Data: CreateProductRequest = {
        name: 'Normal Stock Product',
        description: 'Description 2',
        stock_quantity: 20,
        low_stock_threshold: 10
      };
      
      const product3Data: CreateProductRequest = {
        name: 'Low Stock Product 2',
        description: 'Description 3',
        stock_quantity: 8,
        low_stock_threshold: 15
      };

      productService.createProduct(product1Data);
      productService.createProduct(product2Data);
      productService.createProduct(product3Data);

      const lowStockProducts = productService.getLowStockProducts();
      expect(lowStockProducts).toHaveLength(2);
      expect(lowStockProducts[0].name).toBe('Low Stock Product 1');
      expect(lowStockProducts[1].name).toBe('Low Stock Product 2');
    });

    it('should return empty array when no products are below threshold', () => {
      const productData: CreateProductRequest = {
        name: 'Normal Stock Product',
        description: 'Description',
        stock_quantity: 20,
        low_stock_threshold: 10
      };

      productService.createProduct(productData);
      const lowStockProducts = productService.getLowStockProducts();
      expect(lowStockProducts).toHaveLength(0);
    });

    it('should include products with stock equal to zero', () => {
      const productData: CreateProductRequest = {
        name: 'Empty Stock Product',
        description: 'Description',
        stock_quantity: 0,
        low_stock_threshold: 5
      };

      productService.createProduct(productData);
      const lowStockProducts = productService.getLowStockProducts();
      expect(lowStockProducts).toHaveLength(1);
    });
  });

  describe('updateProduct', () => {
    let productId: string;

    beforeEach(() => {
      const productData: CreateProductRequest = {
        name: 'Original Product',
        description: 'Original Description',
        stock_quantity: 100,
        low_stock_threshold: 10
      };
      const product = productService.createProduct(productData);
      productId = product.id;
    });

    it('should update product successfully', () => {
      const updateData: UpdateProductRequest = {
        name: 'Updated Product',
        stock_quantity: 150
      };

      const updatedProduct = productService.updateProduct(productId, updateData);
      expect(updatedProduct.name).toBe('Updated Product');
      expect(updatedProduct.stock_quantity).toBe(150);
      expect(updatedProduct.description).toBe('Original Description'); // unchanged
    });

    it('should throw error when updating stock to negative value', () => {
      const updateData: UpdateProductRequest = {
        stock_quantity: -5
      };

      expect(() => productService.updateProduct(productId, updateData))
        .toThrow('Stock quantity cannot be negative');
    });

    it('should throw error for non-existent product', () => {
      const updateData: UpdateProductRequest = {
        name: 'Updated Product'
      };

      expect(() => productService.updateProduct('invalid-id', updateData))
        .toThrow('Product not found');
    });
  });
});