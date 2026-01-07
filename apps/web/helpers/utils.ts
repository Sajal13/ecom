import { PriceCalculation, Review, ReviewSummary } from 'types/products';

export const hexToRgb = (hex: string) => {
  hex = hex.startsWith('#') ? hex.slice(1) : hex;

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (hex.length !== 6) {
    throw new Error("Invalid hex color format. Expected 3 or 6 characters (excluding '#').");
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

export const currencyFormat = (amount: number, options: Intl.NumberFormatOptions = {}) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options,
  })
    .format(amount)
    .replace('BDT', '৳');
};

export const numberFormat = (num: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-BD', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    ...options,
  }).format(num);
};

export const getFileExtension = (fileName: string, separator = '.') =>
  fileName.split(separator).pop() || 'unknown';

export const isImageFile = (file: File) => {
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  return imageMimeTypes.includes(file.type);
};

export const convertFileToAttachment = (file: File) => ({
  name: file.name,
  size: `${(file.size / 1024).toFixed(2)} KB`,
  format: getFileExtension(file.name),
  preview: isImageFile(file) ? URL.createObjectURL(file) : undefined,
});

export const calculatePrice = (price: number, discountPercentage: number): PriceCalculation => {
  if (discountPercentage <= 0) {
    return {
      originalPrice: price,
      discountedPrice: price,
      discountAmount: 0,
      discountPercentage: 0,
    };
  }

  const originalPrice = price / (1 - discountPercentage / 100);
  const discountAmount = originalPrice - price;

  return {
    originalPrice: Number(originalPrice.toFixed(2)),
    discountedPrice: Number(price.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    discountPercentage: Math.floor(discountPercentage),
  };
};

export const reviewSummary = (reviews: Review[]): ReviewSummary => {
  const totalReviews = reviews.length;
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (star) =>
      reviews.filter((r) => Math.floor(r.rating) === star || Math.round(r.rating) === star).length,
  );
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / (totalReviews || 1);

  return { totalReviewCount: totalReviews, ratingCounts, averageRating };
};

export const getPercentage = (count: number, totalReviews: number) => {
  return totalReviews === 0 ? 0 : (count / totalReviews) * 100;
};
