import { GetProduct } from 'types/api';

export const buildQueryParams = (paramsObj: Partial<GetProduct>) => {
  const params = new URLSearchParams();

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      params.set(key, value.join(','));
    } else {
      params.set(key, String(value));
    }
  });

  return params.toString();
};
