export type PropertyCategory = 'منازل' | 'شقق' | 'قطع أراضي' | 'مشتملات' | 'محلات' | 'مخازن';

export interface Property {
  id: string;
  title: string;
  category: PropertyCategory;
  city: string;
  district: string;
  price: number;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  description: string;
  image: string;
  phone: string;
}
