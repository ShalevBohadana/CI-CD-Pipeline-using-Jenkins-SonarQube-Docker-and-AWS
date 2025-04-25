export const PARTNER_ROLE = {
  CURRENCY_SELLER: 'currencySeller', // 70
  CURRENCY_SUPPLIER: 'currencySupplier', // 70
  BOOSTER: 'booster', // 70
} as const;
export enum ROLE {
  VISITOR = 'visitor',
  SUPPORT = 'support',
  OWNER = 'owner', // 100
  ADMIN = 'admin', // 90
  PARTNER = 'partner', // 70
  CURRENCY_SELLER = 'currencySeller', // 70
  CURRENCY_SUPPLIER = 'currencySupplier', // 70
  BOOSTER = 'booster', // 70
  CUSTOMER = 'customer', // 20
}

export type Role = (typeof ROLE)[keyof typeof ROLE];
export type Roles = Role[];
export type ExcludedVisitorRole = Exclude<Role, 'visitor'>;
export type PartnerRole = (typeof PARTNER_ROLE)[keyof typeof PARTNER_ROLE];
