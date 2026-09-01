import { Property } from '../types';

export type SmartFilters = {
  query: string;
  city?: string;
  district?: string;
  category?: string;
  mode?: 'بيع' | 'إيجار';
  maxPrice?: number;
  minArea?: number;
  rooms?: number;
};

const districts = ['الأمنية','المصلى','الواسطي','العروبة','حي الربيع','حي النصر','طريق بغداد','القادسية','الإسكان'];

export function parseIraqiRealEstateQuery(input: string): SmartFilters {
  const text = input.trim();
  const lower = text.toLowerCase();
  const filters: SmartFilters = { query: text, city: lower.includes('كركوك') ? 'كركوك' : undefined };
  filters.district = districts.find(d => text.includes(d));
  if (/إيجار|للايجار|للإيجار|مؤجر|تأجير/.test(text)) filters.mode = 'إيجار';
  else if (/بيع|للبيع|شراء|أشتري|اشتري/.test(text)) filters.mode = 'بيع';
  if (/شقة|شقق/.test(text)) filters.category = 'شقق';
  else if (/أرض|ارض|قطعة/.test(text)) filters.category = 'أراضي';
  else if (/محل|محلات|تجاري/.test(text)) filters.category = 'محلات';
  else if (/بيت|منزل|دار|دور/.test(text)) filters.category = 'منازل';
  const priceMatch = text.match(/(?:أقل من|اقل من|حدود|بحدود|ميزانيتي|سعره|سعرها)\s*(\d+(?:\.\d+)?)\s*(مليون|ملايين|مليار|الف|ألف)?/);
  if (priceMatch) {
    const value = Number(priceMatch[1]);
    const unit = priceMatch[2] || '';
    filters.maxPrice = /مليار/.test(unit) ? value * 1_000_000_000 : /مليون|ملايين/.test(unit) ? value * 1_000_000 : /الف|ألف/.test(unit) ? value * 1_000 : value;
  }
  const areaMatch = text.match(/(\d+)\s*(?:متر|م²|م2)/);
  if (areaMatch) filters.minArea = Number(areaMatch[1]);
  const roomMatch = text.match(/(\d+)\s*(?:غرف|غرفة)/);
  if (roomMatch) filters.rooms = Number(roomMatch[1]);
  return filters;
}

export function smartFilterProperties(items: Property[], filters: SmartFilters) {
  return items.filter(p => {
    if (filters.city && p.city !== filters.city) return false;
    if (filters.district && p.district !== filters.district) return false;
    if (filters.category && p.category !== filters.category) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minArea && p.area < filters.minArea) return false;
    if (filters.rooms && (p.bedrooms || 0) < filters.rooms) return false;
    return true;
  });
}

export function buildListingCopy(title: string, city: string, district: string, category: string, price: string, area: string, description: string) {
  const extras = description.trim() || 'موقع مناسب وقابل للمعاينة بعد التواصل مع المعلن.';
  return `🏠 ${title || category}\n\n📍 الموقع: ${city}${district ? ` - ${district}` : ''}\n📐 المساحة: ${area || 'غير محددة'} م²\n💰 السعر: ${price || 'عند التواصل'} د.ع\n\n${extras}\n\n✨ إعلان مرتب من عقاري — ابحث، قارن وتواصل بسهولة.`;
}

export function compareProperties(a: Property, b: Property) {
  const cheaper = a.price <= b.price ? a : b;
  const larger = a.area >= b.area ? a : b;
  return {
    cheaper,
    larger,
    summary: `${cheaper.title} أوفر سعراً، بينما ${larger.title} أكبر مساحة. المقارنة لا تغني عن معاينة العقار والتحقق من المستندات والموقع.`
  };
}
