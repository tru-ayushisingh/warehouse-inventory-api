import { Product, CreateProductRequest, UpdateProductRequest } from '../types/Product';
export declare class ProductService {
    private products;
    createProduct(productData: CreateProductRequest): Product;
    getAllProducts(): Product[];
    getProductById(id: string): Product | null;
    updateProduct(id: string, updateData: UpdateProductRequest): Product;
    deleteProduct(id: string): boolean;
    increaseStock(id: string, quantity: number): Product;
    decreaseStock(id: string, quantity: number): Product;
    getLowStockProducts(): Product[];
    clearAllProducts(): void;
}
//# sourceMappingURL=ProductService.d.ts.map