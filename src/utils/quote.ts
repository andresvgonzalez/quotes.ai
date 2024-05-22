import { InventoryStatus, Quote } from '../types';

export const calculateQuotePrice = (products: InventoryStatus[]) => {
  return products.reduce((total, product) => total + product.requestedQuantity * (product.price ?? 0), 0);
};

export const generateQuote = (rfqData: Quote, inventoryStatus: InventoryStatus[]): Quote => {
  const availableProducts = inventoryStatus.filter(product => product.available);
  const outOfStockProducts = inventoryStatus.filter(
    (product) => !product.available
  );
  const totalPrice = calculateQuotePrice(availableProducts);

  return {
    id: generateUniqueId(),
    customer: rfqData.customer || "Not specified",
    products: availableProducts,
    outOfStockProducts,
    totalPrice,
    dueDate: rfqData.dueDate,
    shippingRestrictions: rfqData.shippingRestrictions,
    status: 'draft',
  };
};

// Utility function to generate unique IDs for quotes
const generateUniqueId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};






