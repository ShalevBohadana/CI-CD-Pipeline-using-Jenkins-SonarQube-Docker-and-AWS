export interface CartItem {
  product: {
    name: string;
    description?: string;
    images?: string[];
    price: number;
  };
  productId: string;
  quantity: number;
}

export interface StripeSessionMetadata {
  cartId: string;
  userId: string;
}
