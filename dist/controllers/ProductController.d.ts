import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { CreateProductRequest, UpdateProductRequest, StockUpdateRequest } from '../types/Product';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    createProduct: (req: Request<{}, {}, CreateProductRequest>, res: Response) => void;
    getAllProducts: (req: Request, res: Response) => void;
    getProductById: (req: Request<{
        id: string;
    }>, res: Response) => Response<any, Record<string, any>> | undefined;
    updateProduct: (req: Request<{
        id: string;
    }, {}, UpdateProductRequest>, res: Response) => void;
    deleteProduct: (req: Request<{
        id: string;
    }>, res: Response) => Response<any, Record<string, any>> | undefined;
    increaseStock: (req: Request<{
        id: string;
    }, {}, StockUpdateRequest>, res: Response) => void;
    decreaseStock: (req: Request<{
        id: string;
    }, {}, StockUpdateRequest>, res: Response) => void;
    getLowStockProducts: (req: Request, res: Response) => void;
}
//# sourceMappingURL=ProductController.d.ts.map