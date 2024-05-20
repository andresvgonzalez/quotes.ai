import { IFuseOptions } from 'fuse.js';
import { Product } from '../types';

const fuseOptions: IFuseOptions<Product> = {
  keys: [
    {
      name: 'name',
      weight: 0.7,
    },
  ],
  threshold: 0.4, // Lower threshold for more precise matches
  distance: 100, // Distance for approximate matches
  minMatchCharLength: 10, // Minimum number of characters that must match
};

export default fuseOptions;
