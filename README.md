# Warehouse API

A robust backend API for tracking products in a warehouse with comprehensive inventory management capabilities.

## 📋 Project Description

This is a TypeScript/Node.js backend API that provides complete warehouse product management functionality. The API handles product CRUD operations, inventory tracking, stock management, and low-stock monitoring. Built with modern development practices including comprehensive error handling, input validation, and extensive test coverage.

## 🚀 Features

### Core Features
- **Full CRUD Operations**: Create, read, update, and delete products
- **Inventory Management**: Track stock quantities with validation
- **Stock Operations**: Increase and decrease stock with business logic
- **Data Validation**: Comprehensive input validation and error handling

### Bonus Features ✨
- **Low Stock Monitoring**: Track products below threshold levels
- **Stock Threshold Management**: Configurable low-stock alerts
- **Comprehensive Testing**: Unit and integration tests with edge cases
- **API Documentation**: Clear endpoint documentation and examples

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Testing**: Jest + Supertest
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Development**: ts-node-dev for hot reloading

## 📁 Project Structure

```
warehouse-api/
├── src/
│   ├── controllers/        # Request handlers
│   ├── services/          # Business logic
│   ├── routes/            # API route definitions
│   ├── types/             # TypeScript interfaces
│   ├── middleware/        # Custom middleware
│   ├── __tests__/         # Test files
│   └── app.ts             # Application entry point
├── dist/                  # Compiled JavaScript
├── coverage/              # Test coverage reports
└── package.json
```

## 🔧 Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd warehouse-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000`

5. **Start production server**
   ```bash
   npm start
   ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Generate coverage report
```bash
npm run test:coverage
```

The coverage report will be available in the `coverage/` directory.

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Health Check
```http
GET /health
```

### Products

#### Create Product
```http
POST /products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "stock_quantity": 100,
  "low_stock_threshold": 10
}
```

#### Get All Products
```http
GET /products
```

#### Get Product by ID
```http
GET /products/:id
```

#### Update Product
```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "stock_quantity": 150
}
```

#### Delete Product
```http
DELETE /products/:id
```

### Stock Management

#### Increase Stock
```http
POST /products/:id/increase-stock
Content-Type: application/json

{
  "quantity": 50
}
```

#### Decrease Stock
```http
POST /products/:id/decrease-stock
Content-Type: application/json

{
  "quantity": 30
}
```

### Low Stock Monitoring

#### Get Low Stock Products
```http
GET /products/low-stock/list
```

## 📊 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

## 🎯 Design Decisions and Assumptions

### Architecture Decisions

1. **In-Memory Storage**: Used Map-based storage for simplicity and quick setup. In production, this would be replaced with a database (PostgreSQL, MongoDB, etc.).

2. **Service Layer Pattern**: Implemented a clear separation between controllers (HTTP handling) and services (business logic) for better maintainability and testability.

3. **TypeScript**: Chosen for type safety, better IDE support, and reduced runtime errors.

4. **UUID for IDs**: Used UUID v4 for unique product identifiers to avoid collision issues.

### Business Logic Assumptions

1. **Stock Validation**: 
   - Stock quantities cannot be negative
   - Stock operations must be positive integers
   - Insufficient stock operations return descriptive error messages

2. **Product Validation**:
   - Product names and descriptions cannot be empty
   - Low stock threshold defaults to 10 if not provided
   - All fields are trimmed to handle whitespace

3. **Error Handling**:
   - 400 Bad Request for validation errors
   - 404 Not Found for missing resources
   - 500 Internal Server Error for unexpected issues

### Security Considerations

1. **Input Validation**: All inputs are validated before processing
2. **Security Headers**: Helmet middleware for security headers
3. **CORS**: Configured for cross-origin requests
4. **Request Logging**: Morgan middleware for request logging

## 🚦 Testing Strategy

### Unit Tests
- **ProductService**: Complete business logic testing
- **Edge Cases**: Boundary conditions and error scenarios
- **Validation**: Input validation and error handling

### Integration Tests
- **API Endpoints**: Full HTTP request/response cycle testing
- **Error Scenarios**: 400, 404, and 500 error responses
- **Stock Operations**: End-to-end inventory management

### Test Coverage
- Aims for 95%+ code coverage
- Covers all critical business logic paths
- Includes edge cases and error conditions

## 🔄 Development Workflow

1. **Development**: Use `npm run dev` for hot reloading
2. **Testing**: Run tests with `npm test` during development
3. **Building**: Use `npm run build` for production builds
4. **Deployment**: Use `npm start` for production server

## 📈 Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Authentication and authorization
- Pagination for product listings
- Product categories and tags
- Audit logging for stock changes
- Bulk operations support
- API rate limiting
- Docker containerization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details.

--