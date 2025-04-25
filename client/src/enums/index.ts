export const ORDER_STATUS = {
  PLACED: 'placed',
  PROCESSING: 'processing',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  PENDING: 'pending',
  CENCELLED: 'cencelled',
} as const;

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export const TWITTER_CARD_TYPES = {
  SUMMARY: 'summary',
  SUMMARY_LARGE_IMAGE: 'summary_large_image',
  PLAYER: 'player',
  PRODUCT: 'product',
  GALLERY: 'gallery',
  APP: 'app',
  APP_IMAGE: 'app:image',
  APP_VIDEO: 'app:video',
  APP_AUDIO: 'app:audio',
} as const;
export type TwitterCardType = (typeof TWITTER_CARD_TYPES)[keyof typeof TWITTER_CARD_TYPES];

export const OG_TYPES = {
  WEBSITE: 'website',
  ARTICLE: 'article',
  BLOG: 'blog',
  PROFILE: 'profile',
  PRODUCT: 'product',
  VIDEO: 'video',
  MUSIC: 'music',
  PLACE: 'place',
  APP: 'app',
  EVENT: 'event',
  BOOK: 'book',
} as const;

export type OGType = (typeof OG_TYPES)[keyof typeof OG_TYPES];

export const SITE_INFO = {
  name: {
    normalized: 'Fullboosts',
    capitalized: 'FullBoosts',
    short: 'FB',
  },
  url: new URL('https://fullboosts.com'),
} as const;

export const COMPANY_INFO = {
  name: 'SBDB Enterprise',
  type: 'Ltd.',
  address: {
    line1: 'Nikos Nikolaidis, 19,',
    line2: 'PETRIDEIO MEGARO, Address/Office 201-202',
    line3: '8010, Paphos, Cyprus Reg.number:HE 453175',
  },
  contacts: {
    emails: {
      customerSupport: 'support@fullboosts.com',
      businessInquiries: 'business@fullboosts.com',
    },
  },
} as const;

export const FOLDER_NAME = {
  GAME: 'games',
  OFFER: 'offers',
  OFFER_CURRENCY: 'offers-currency',
  AVATAR: 'avatar',
} as const;
export type FolderName = (typeof FOLDER_NAME)[keyof typeof FOLDER_NAME];

export const HTTP_VERB = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS',
} as const;
