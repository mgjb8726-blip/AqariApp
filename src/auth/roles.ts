import { UserRole } from '../types';

export const GUEST_ROLE: UserRole = 'guest';

export const canBrowse = (_role: UserRole) => true;
export const canSeeOwnerContact = (role: UserRole) => role === 'customer' || role === 'owner';
export const canPublishProperty = (role: UserRole) => role === 'owner';

export const roleLabel = (role: UserRole) => {
  if (role === 'owner') return 'صاحب عقار';
  if (role === 'customer') return 'زبون';
  return 'زائر';
};
