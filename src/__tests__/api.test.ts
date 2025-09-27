import request from 'supertest';
import app from '../app';

describe('API Integration Tests', () => {
  let productId: string;

  describe('POST /api/v1/products', () => {
    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        stock_quantity: 100,
        low_stock_threshold: 10
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
      expect(response.body.data.id).toBeDefined();
      
      productId = response.body.data.id;
    });

    it('should return 400 for invalid product data', async () => {
      const productData = {
        name: '',
        description: 'Test Description',
        stock_quantity: -1
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(productData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/v1/products', () => {
    beforeAll(async () => {
      // Create a test product first
      const productData = {
        name: 'Test Product for GET',
        description: 'Test Description',
        stock_quantity: 50
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(productData);
      
      productId = response.body.data.id;
    });

    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/v1/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/products/:id', () => {
    it('should get a product by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(productId);
    });

    it('should return 404 for non-existent product', async () => {
      const response = await request(app)
        .get('/api/v1/products/invalid-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('Stock Management', () => {
    beforeAll(async () => {
      // Create a test product for stock operations
      const productData = {
        name: 'Stock Test Product',
        description: 'Product for stock testing',
        stock_quantity: 100
      };

      const response = await request(app)
        .post('/api/v1/products')
        .send(productData);
      
      productId = response.body.data.id;
    });

    describe('POST /api/v1/products/:id/increase-stock', () => {
      it('should increase stock successfully', async () => {
        const response = await request(app)
          .post(`/api/v1/products/${productId}/increase-stock`)
          .send({ quantity: 50 })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.stock_quantity).toBe(150);
      });

      it('should return 400 for invalid quantity', async () => {
        const response = await request(app)
          .post(`/api/v1/products/${productId}/increase-stock`)
          .send({ quantity: -10 })
          .expect(400);

        expect(response.body.success).toBe(false);
      });
    });

    describe('POST /api/v1/products/:id/decrease-stock', () => {
      it('should decrease stock successfully', async () => {
        const response = await request(app)
          .post(`/api/v1/products/${productId}/decrease-stock`)
          .send({ quantity: 30 })
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.stock_quantity).toBe(120); // 150 - 30
      });

      it('should return 400 for insufficient stock', async () => {
        const response = await request(app)
          .post(`/api/v1/products/${productId}/decrease-stock`)
          .send({ quantity: 200 })
          .expect(400);

        expect(response.body.success).toBe(false);
        expect(response.body.error).toContain('Insufficient stock');
      });

      it('should return 400 for invalid quantity', async () => {
        const response = await request(app)
          .post(`/api/v1/products/${productId}/decrease-stock`)
          .send({ quantity: 0 })
          .expect(400);

        expect(response.body.success).toBe(false);
      });
    });
  });

  describe('GET /api/v1/products/low-stock/list', () => {
    beforeAll(async () => {
      // Create products with low stock
      await request(app)
        .post('/api/v1/products')
        .send({
          name: 'Low Stock Product 1',
          description: 'Low stock item',
          stock_quantity: 5,
          low_stock_threshold: 10
        });

      await request(app)
        .post('/api/v1/products')
        .send({
          name: 'Normal Stock Product',
          description: 'Normal stock item',
          stock_quantity: 20,
          low_stock_threshold: 10
        });
    });

    it('should get products with low stock', async () => {
      const response = await request(app)
        .get('/api/v1/products/low-stock/list')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.count).toBeGreaterThan(0);
    });
  });

  describe('Health Check', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Warehouse API is running');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/api/v1/invalid-route')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });
});