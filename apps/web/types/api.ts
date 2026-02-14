export interface GetProduct {
  limit?: number;
  skip?: number;
  q?: string;
  select?: string[];
}

export interface GetCartItemsOptions extends GetProduct {
  userId: number;
}