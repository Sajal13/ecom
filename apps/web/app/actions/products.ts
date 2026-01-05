import { cacheLife } from 'next/cache';
import { GetProduct } from 'types/api';

export const getProducts = async ({ limit, select, skip, q }: Partial<GetProduct> = {}) => {
  'use cache';
  cacheLife('seconds');

  const params = new URLSearchParams();

  if (limit) params.set('limit', limit.toString());
  if (skip) params.set('skip', skip.toString());
  if (select) params.set('select', select.join(','));
  if (q) params.set('q', q);

  const url = `https://dummyjson.com/products${params.toString() ? `?${params.toString()}` : ''}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products!');
  };

  return res.json();
};
