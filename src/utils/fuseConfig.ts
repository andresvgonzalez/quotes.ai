import { IFuseOptions } from 'fuse.js';
import { Product } from '../types';

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    {
      name: 'name',
      weight: 0.5,
    },
    {
      name: 'dimensions',
      weight: 0.3,
    },
    {
      name: 'materialSpecifications',
      weight: 0.2,
    },
  ],
  threshold: 0.3, // Lower threshold for more precise matches
  distance: 50, // Decreased distance for more accurate matches
  minMatchCharLength: 3, // Reduced minimum match length for more flexibility
};


export default fuseOptions;
