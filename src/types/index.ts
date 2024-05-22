export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  dimensions: string;
  materialSpecifications: string;
}

export interface RequestedProduct {
  name: string;
  quantity: number;
  dimensions: string;
  materialSpecifications: string;
}

export interface InventoryStatus {
  id: number;
  name: string;
  price: number;
  quantity: number;
  requestedQuantity: number;
  available: boolean;
  dimensions: string;
  requestedDimensions?: string;
  materialSpecifications: string;
}

export interface Quote {
  id: string;
  customer: string;
  products: InventoryStatus[];
  outOfStockProducts?: InventoryStatus[];
  totalPrice: number;
  relatedProducts?: string;
  shippingRestrictions?: string;
  status: 'draft' | 'sent';
  dueDate?: string;
}

export interface RFQData {
  customer: string;
  products: {
    name: string;
    quantity: number;
    dimensions: string;
  }[];
  dueDate?: string;
  shippingRestrictions?: string;
}
