export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  featured: boolean;
  subCategories: { id: number; name: string; slug: string }[];
}


export interface Product {
  id: number;
  title: string;
  previousPrice?: number;
  currentPrice: number;
  rating?: number;
  totalReviews?: number;
  imageUrl: string;
  category: string;
  subCategory: string;
  discount?: number;
  isWhiteListed?: boolean;
  colors?: string[];
  isNew?: boolean;
}