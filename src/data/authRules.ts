export const AQARI_AUTH_RULES = {
  guest: {
    browse: true,
    search: true,
    viewPropertyDetails: true,
    viewOwnerPhone: false,
    contactOwner: false,
    favorites: false,
    publishProperty: false,
  },
  customer: {
    browse: true,
    search: true,
    viewPropertyDetails: true,
    viewOwnerPhone: true,
    contactOwner: true,
    favorites: true,
    publishProperty: false,
  },
  owner: {
    browse: true,
    search: true,
    viewPropertyDetails: true,
    viewOwnerPhone: true,
    contactOwner: true,
    favorites: true,
    publishProperty: true,
  },
} as const;
