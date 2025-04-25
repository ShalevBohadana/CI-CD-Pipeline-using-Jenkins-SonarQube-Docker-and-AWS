export type ExactlyOneProp<T> = {
  [K in keyof T]-?: Pick<T, K> & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];

export type Pretty<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;
export interface IProduct {
  id: number;
  name: string;
  image: string;
  price: number;
  features: string[];
  status: boolean;
  rating: number;
  quantity?: number;
}

export type GameCategory = {
  id: string;
  title: {
    en: string;
  };
  url: {
    en: string;
  };
  subCategories?: GameCategory[] | null;
};
export interface CardDetails {
  holder: string;
  number: string;
  expireDate: Date;
  cvv: string;
}

export interface WithdrawalFormInputs {
  method: string;
  amount: number;
  card: CardDetails;
}
export type Game = {
  isDisplayedInCatalog: boolean;
  id: string;
  title: {
    en: string;
  };
  categories?: GameCategory[];
};

export type NormalizedDbData = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
export type CommonParams = { uid: string };

export type commonDataType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
