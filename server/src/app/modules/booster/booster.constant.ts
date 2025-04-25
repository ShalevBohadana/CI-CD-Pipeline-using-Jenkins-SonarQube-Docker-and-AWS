export const BOOSTER_SEARCH_FIELDS = [
  'email',
  'discordTag',
  'telegramUsername',
];
export const BOOSTER_FILTER_FIELDS = [
  'search',
  'isApproved',
  'status',
  'selectedGames',
  'email',
];
export const BoosterStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;
