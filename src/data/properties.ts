import { Property } from '../types';

export const categories = ['منازل', 'شقق', 'قطع أراضي', 'مشتملات', 'محلات', 'مخازن'] as const;

export const properties: Property[] = [
  {
    id: '1', title: 'دار عصري للبيع في حي الواسطي', category: 'منازل', city: 'كركوك', district: 'الواسطي', price: 185000000, area: 240,
    bedrooms: 4, bathrooms: 3, description: 'دار مرتب بتصميم عصري، قريب من الخدمات والطرق الرئيسية.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80', phone: '07700000000'
  },
  {
    id: '2', title: 'شقة سكنية جاهزة للسكن', category: 'شقق', city: 'كركوك', district: 'المصلى', price: 92000000, area: 145,
    bedrooms: 3, bathrooms: 2, description: 'شقة واسعة ومشرقة، موقع هادئ وقريبة من الأسواق والمدارس.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80', phone: '07800000000'
  },
  {
    id: '3', title: 'قطعة أرض سكنية مميزة', category: 'قطع أراضي', city: 'كركوك', district: 'رحيم آوه', price: 75000000, area: 200,
    description: 'قطعة سكنية بواجهة جيدة وموقع مناسب للبناء والاستثمار.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80', phone: '07900000000'
  }
];
