export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  featured: boolean;
  subCategories: { id: number; name: string; slug: string }[];
}

export interface Review {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
  images?: string[];
}


export interface Product {
  id: number;
  title: string;
  previousPrice?: number;
  currentPrice: number;
  rating?: number;
  reviews?: Review[];
  imageUrl: string;
  category: string;
  subCategory: string;
  discount?: number;
  isWhiteListed?: boolean;
  colors?: string[];
  isNew?: boolean;
}