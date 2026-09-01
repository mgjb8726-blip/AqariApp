import { Property } from '../types';
import { properties } from '../data/properties';

/** Replace this implementation with a real HTTP client when the backend is ready. */
export const api = {
  async listProperties(): Promise<Property[]> { return properties; },
  async getProperty(id: string): Promise<Property | undefined> { return properties.find(p => p.id === id); }
};
