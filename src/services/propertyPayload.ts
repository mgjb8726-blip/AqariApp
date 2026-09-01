import { Property, UserRole } from '../types';

/**
 * Shapes the property data exposed to the mobile client.
 * The backend must enforce the same rule server-side: guests never receive phone.
 */
export function publicProperty(property: Property, role: UserRole): Omit<Property, 'phone'> & { phone?: string } {
  if (role === 'guest') {
    const { phone: _phone, ...safeProperty } = property;
    return safeProperty;
  }
  return property;
}
