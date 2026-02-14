import { cacheLife } from 'next/cache';
import { buildQueryParams } from 'helpers/buildQueryParams';
import { GetProduct, GetCartItemsOptions } from 'types/api';

export const getProducts = async (options: Partial<GetProduct> = {}) => {
  'use cache';
  cacheLife('minutes');

  const queryString = buildQueryParams(options);

  const url = `${process.env.BASE_URL}/products${
    queryString ? `?${queryString}` : ''
  }`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products!');
  }

  return res.json();
};

export const getSearchProducts = async (options: Partial<GetProduct>) => {
  'use cache';
  cacheLife('seconds');

  const queryString = buildQueryParams(options);

  const url = `${process.env.BASE_URL}/products/search${
    queryString ? `?${queryString}` : ''
  }`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products!');
  }

  return res.json();
};

export const getCategories = async () => {
  'use cache';
  cacheLife('minutes');

  const response = await fetch(`${process.env.BASE_URL}/products/categories`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.json();
};

export const getHighlightedItem = async () => {
  'use cache';
  cacheLife('minutes');

  const response = await fetch(`${process.env.BASE_URL}/products/1`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });

  return response.json();
};

export const getNewArrivalItem = async () => {
  'use cache';
  cacheLife('minutes');

  const response = await fetch(`${process.env.BASE_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  return response.json();
};

// export const getWishlistProducts = async () => {

// }

export const getCartItems = async ({
  userId,
  ...options
}: GetCartItemsOptions) => {
  'use cache';
  cacheLife('minutes');

  const queryString = buildQueryParams(options);

  const url = `${process.env.BASE_URL}/carts/user/${userId}${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  return response.json();
};
