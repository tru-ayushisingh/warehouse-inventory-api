Warehouse Inventory Management API


A professional backend API system for managing products in a warehouse. This project demonstrates modern backend development skills with TypeScript, comprehensive testing, and production-ready code quality.
🎯 What This Project Does
This API helps warehouses manage their product inventory by:

Adding new products to the system
Tracking stock quantities in real-time
Preventing overselling (can't sell more than you have)
Alerting when stock is running low
Updating product information as needed

Think of it as the backend system that powers warehouse management software.
💼 Why This Project Matters
This showcases real-world backend development skills that companies need:

Building APIs that handle business logic
Writing code that prevents costly mistakes (like overselling)
Creating systems that scale with business growth
Following industry best practices for code quality

🛠️ Technologies Used

TypeScript - For type-safe, maintainable code
Node.js & Express - Popular backend framework
Jest - Professional testing framework
REST API Design - Industry-standard API architecture

⚡ Key Features
Core Functionality

✅ Full Product Management - Create, view, update, and delete products
✅ Smart Inventory Control - Stock can never go below zero
✅ Stock Operations - Add or remove inventory with validation
✅ Business Logic Protection - Prevents common inventory mistakes

Advanced Features

🚀 Low Stock Alerts - Automatically identifies products running low
🚀 Comprehensive Testing - 95%+ code coverage ensures reliability
🚀 Error Handling - Proper responses for all scenarios
🚀 Production Ready - Security middleware and logging included

📊 API Endpoints
ActionEndpointWhat It DoesCreate ProductPOST /api/v1/productsAdd a new productGet All ProductsGET /api/v1/productsList all productsGet One ProductGET /api/v1/products/{id}Get specific product detailsUpdate ProductPUT /api/v1/products/{id}Modify product informationDelete ProductDELETE /api/v1/products/{id}Remove a productAdd StockPOST /api/v1/products/{id}/increase-stockIncrease inventoryRemove StockPOST /api/v1/products/{id}/decrease-stockDecrease inventory (with validation)Low Stock AlertGET /api/v1/products/low-stock/listFind products running low
🚀 Quick Start Guide
Prerequisites

Node.js installed on your computer
Basic command line knowledge

Setup (5 minutes)
bash# 1. Clone the project
git clone <repository-url>
cd warehouse-inventory-api

# 2. Install dependencies
npm install

# 3. Run tests to verify everything works
npm test

# 4. Start the development server
npm run dev
The API will be running at http://localhost:3000
Test It Works
Visit http://localhost:3000/health in your browser - you should see a success message.
🧪 Testing the API
Option 1: Using VS Code (Recommended)

Install the "REST Client" extension in VS Code
Open the test-api.http file included in the project
Click "Send Request" above any endpoint to test it

Business Logic Examples
Example 1: Preventing Overselling
Current Stock: 10 units
Attempt to Remove: 15 units
Result: ❌ Error - "Insufficient stock. Available: 10, Requested: 15"
Example 2: Low Stock Detection
Product: Gaming Mouse
Current Stock: 3 units
Threshold: 5 units
Result: ✅ Appears in low-stock alert list
🧪 Running Tests
bash# Run all tests
npm test

# Run tests with detailed coverage report
npm run test:coverage

# Run tests in watch mode during development
npm run test:watch
Test Results:

✅ 20+ comprehensive tests
✅ 95%+ code coverage
✅ Tests all business logic scenarios
✅ Includes edge cases and error handling

📁 Project Structure
warehouse-inventory-api/
├── src/
│   ├── controllers/     # Handle HTTP requests/responses
│   ├── services/        # Business logic and data management
│   ├── types/          # TypeScript type definitions
│   ├── routes/         # API endpoint definitions
│   ├── middleware/     # Error handling and security
│   └── __tests__/      # Comprehensive test suite
├── test-api.http       # API testing file for VS Code
├── package.json        # Project dependencies and scripts
└── README.md          # This documentation
🎨 Code Quality Features

TypeScript - Catches errors before they reach production
Input Validation - All data is validated before processing
Error Handling - Proper error messages for debugging
Security Middleware - Protection against common web vulnerabilities
Clean Architecture - Organized, maintainable code structure

🚀 Production Readiness
This project includes everything needed for a production environment:

✅ Security headers (Helmet middleware)
✅ Request logging (Morgan middleware)
✅ Error handling (Graceful error responses)
✅ Input validation (Prevents bad data)
✅ Health check endpoint (System monitoring)
✅ Build process (Compiled TypeScript)

💡 Design Decisions
Why These Choices Were Made
TypeScript over JavaScript

Prevents common programming errors
Makes code easier to maintain and understand
Industry standard for professional projects

In-Memory Storage

Focuses on API logic rather than database complexity
Easy to test and demonstrate
Real projects would use PostgreSQL or MongoDB

Comprehensive Testing

Ensures code works as expected
Makes it safe to add new features
Standard practice in professional development

Service Layer Architecture

Separates business logic from HTTP handling
Makes code easier to test and modify
Follows enterprise development patterns

📈 Skills Demonstrated
This project showcases:

Backend API Development - RESTful services with Express
TypeScript Proficiency - Type-safe application development
Testing Excellence - Unit and integration testing with Jest
Business Logic Implementation - Real-world inventory management
Error Handling - Robust error responses and validation
Code Organization - Clean, maintainable project structure
Documentation - Clear README and code comments

🔮 Future Enhancements
Ideas for expanding this project:

Add database integration (PostgreSQL/MongoDB)
Implement user authentication and permissions
Add product categories and tags
Include audit logging for stock changes
Build a frontend dashboard
Add API rate limiting
Deploy to cloud platforms (AWS, Heroku)

Key Highlights:

🎯 Solves real business problems (inventory management)
🧪 Comprehensive test coverage (95%+)
🛡️ Production-ready security and error handling
📚 Clear documentation and setup process
⚡ Modern TypeScript/Node.js stack