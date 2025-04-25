interface DynamicFilter {
  name: string;
  type: string;
  fee: number;
  children: DynamicFilter[];
  _id: string;
}

interface Seller {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  userId: string;
  email: string;
  userName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  avatar: string;
  online: boolean;
  reviews: string[];
  roles: string[];
}

interface Discount {
  amount: number;
  type: string;
  _id: string;
}

interface Tag {
  value: string;
  label: string;
  _id: string;
}

interface Offer {
  _id: string;
  name: string;
  uid: string;
  dynamicFilters: DynamicFilter[];
  sellerId: Seller;
  gameUid: string;
  categoryUid: string;
  basePrice: number;
  description: string;
  offerPromo: string;
  image: string;
  discount: Discount;
  offerType: string;
  status: string;
  featuredList: string[];
  tags: Tag[];
  approximateOrderCompletionInMinutes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SelectedDataType {
  region: string;
  price: number;
  filters: string[]; // Adjust type as needed
  isDiscountApplied: boolean;
  amount?: number;
}

export interface CartSingleItemDataType {
  seller: string;
  offerId: Offer;
  //   offerId: string;
  itemType: string;
  offerName: string;
  offerImage: string;
  itemId: string;
  selected: SelectedDataType;
}

export interface CartItemDataType {
  _id: string;
  userId: string;
  items: CartSingleItemDataType[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  sessionId: string;
}
