import { cacheLife } from "next/cache";

export const getProducts = async () => {
  'use cache';
  cacheLife('hours');


  const res = await fetch('https://dummyjson.com/products', {
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache'
  });

  const data = await res.json();

  return data;
}