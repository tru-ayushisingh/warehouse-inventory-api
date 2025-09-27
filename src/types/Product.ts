export interface Product {
  id: string;
  name: string;
  description: string;
  stock_quantity: number;
  low_stock_threshold: number;
  created_at: Date;
  updated_at: Date;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  stock_quantity: number;
  low_stock_threshold?: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  stock_quantity?: number;
  low_stock_threshold?: number;
}

export interface StockUpdateRequest {
  quantity: number;
}