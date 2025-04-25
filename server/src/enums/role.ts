export enum Role {
  OWNER = 'owner',
  ADMIN = 'admin',
  SUPPORT = 'support',
  PARTNER = 'partner',
  CURRENCY_SELLER = 'currencySeller',
  CURRENCY_SUPPLIER = 'currencySupplier',
  BOOSTER = 'booster',
  CUSTOMER = 'customer',
  VISITOR = 'visitor',
  USER = 'user'
}

export const PARTNER_ROLES = [
  Role.CURRENCY_SELLER,
  Role.CURRENCY_SUPPLIER,
  Role.BOOSTER
] as const;

export type PartnerRole = typeof PARTNER_ROLES[number];
export type ExcludedVisitorRole = Exclude<Role, Role.VISITOR>;
