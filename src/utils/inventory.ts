import inventory from '../../inventory.json';
import Fuse from 'fuse.js';
import { RequestedProduct, InventoryStatus } from '../types';
import fuseOptions from './fuseConfig';


const fuse = new Fuse(inventory, fuseOptions);

export const checkInventory = (requestedProducts: RequestedProduct[]): InventoryStatus[] => {
  return requestedProducts.map((requestedProduct) => {
    // Perform fuzzy search
    const result = fuse.search(requestedProduct.name);
    const bestMatch = result.length > 0 ? result[0].item : null;

    return {
      id: bestMatch?.id || 0,
      name: bestMatch?.name || requestedProduct.name,
      price: bestMatch?.price || 0,
      quantity: bestMatch?.quantity || 0,
      requestedQuantity: requestedProduct.quantity,
      available: bestMatch ? bestMatch.quantity >= requestedProduct.quantity : false,
    };
  });
};
