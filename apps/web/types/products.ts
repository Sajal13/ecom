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
  price: number;
  rating?: number;
  reviews?: Review[];
  thumbnail: string;
  category: string;
  subCategory: string;
  discountPercentage?: number;
  isWhiteListed?: boolean;
  colors?: string[];
  isNew?: boolean;
  description?: string;
  warrantyInformation?: string;
  returnPolicy?: string; 
  images?: string[];
  sku?: string;
  brand?: string;
}

export interface PriceCalculation {
  originalPrice: number;
  discountedPrice: number;
  discountAmount: number;
  discountPercentage: number;
}

export interface ReviewSummary {
  totalReviewCount: number;
  ratingCounts: number[];
  averageRating: number;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  url?: string;
}