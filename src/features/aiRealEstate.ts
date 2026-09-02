import { Property } from '../types';

export type SmartFilters = {
  query: string; city?: string; district?: string; category?: string;
  mode?: 'بيع' | 'إيجار'; maxPrice?: number; minArea?: number; rooms?: number;
  furnished?: boolean; newBuild?: boolean;
};

export type InstallmentPlan = {
  propertyPrice: number; downPayment: number; financedAmount: number;
  months: number; monthlyPayment: number; totalPaid: number;
};

export type NegotiationAdvice = {
  suggestedMin: number; suggestedMax: number; percent: number; reason: string;
};

const districts = ['الأمنية','المصلى','الواسطي','العروبة','حي الربيع','حي النصر','طريق بغداد','القادسية','الإسكان','العصري'];

export function parseIraqiRealEstateQuery(input: string): SmartFilters {
  const text = input.trim();
  const lower = text.toLowerCase();
  const filters: SmartFilters = { query: text, city: lower.includes('كركوك') ? 'كركوك' : undefined };
  filters.district = districts.find(d => text.includes(d));
  if (/إيجار|للايجار|للإيجار|مؤجر|تأجير/.test(text)) filters.mode = 'إيجار';
  else if (/بيع|للبيع|شراء|أشتري|اشتري/.test(text)) filters.mode = 'بيع';
  if (/شقة|شقق/.test(text)) filters.category = 'شقق';
  else if (/أرض|ارض|قطعة/.test(text)) filters.category = 'قطع أراضي';
  else if (/محل|محلات|تجاري/.test(text)) filters.category = 'محلات';
  else if (/بيت|منزل|دار|دور/.test(text)) filters.category = 'منازل';
  if (/مفروش|مفروشة|فرش كامل/.test(text)) filters.furnished = true;
  if (/جديد|بناء جديد|2025|2026/.test(text)) filters.newBuild = true;
  const priceMatch = text.match(/(?:أقل من|اقل من|حدود|بحدود|ميزانيتي|سعره|سعرها)\s*(\d+(?:\.\d+)?)\s*(مليون|ملايين|مليار|الف|ألف)?/);
  if (priceMatch) { const value = Number(priceMatch[1]); const unit = priceMatch[2] || ''; filters.maxPrice = /مليار/.test(unit) ? value * 1_000_000_000 : /مليون|ملايين/.test(unit) ? value * 1_000_000 : /الف|ألف/.test(unit) ? value * 1_000 : value; }
  const areaMatch = text.match(/(\d+)\s*(?:متر|م²|م2)/); if (areaMatch) filters.minArea = Number(areaMatch[1]);
  const roomMatch = text.match(/(\d+)\s*(?:غرف|غرفة)/); if (roomMatch) filters.rooms = Number(roomMatch[1]);
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

export function calculateInstallment(price: number, downPayment: number, years: number): InstallmentPlan {
  const safePrice = Math.max(0, price);
  const safeDown = Math.min(Math.max(0, downPayment), safePrice);
  const months = Math.max(1, Math.round(years * 12));
  const financedAmount = safePrice - safeDown;
  const monthlyPayment = Math.ceil(financedAmount / months);
  return { propertyPrice: safePrice, downPayment: safeDown, financedAmount, months, monthlyPayment, totalPaid: safeDown + monthlyPayment * months };
}

export function getNegotiationAdvice(price: number, listingDays = 0): NegotiationAdvice {
  const percent = listingDays >= 90 ? 8 : listingDays >= 60 ? 6 : listingDays >= 30 ? 4 : 2;
  return {
    suggestedMin: Math.ceil(price * (1 - percent / 100)),
    suggestedMax: Math.ceil(price * (1 - Math.max(1, percent - 3) / 100)),
    percent,
    reason: listingDays >= 30 ? `الإعلان موجود منذ ${listingDays} يوم؛ قد توجد مساحة تفاوض، لكن القرار يعتمد على المالك والسوق.` : 'الإعلان حديث؛ مساحة التفاوض المتوقعة أقل عادةً.'
  };
}

export function buildListingCopy(title: string, city: string, district: string, category: string, price: string, area: string, description: string) {
  const extras = description.trim() || 'موقع مناسب وقابل للمعاينة بعد التواصل مع المعلن.';
  return `🏠 ${title || category}\n\n📍 الموقع: ${city}${district ? ` - ${district}` : ''}\n📐 المساحة: ${area || 'غير محددة'} م²\n💰 السعر: ${price || 'عند التواصل'} د.ع\n\n${extras}\n\n✨ إعلان مرتب من عقاري — ابحث، قارن وتواصل بسهولة.`;
}

export function buildPropertyShareText(p: Property) {
  return `🏠 ${p.title}\n📍 ${p.city} - ${p.district}\n💰 ${p.price.toLocaleString('ar-IQ')} د.ع\n📐 ${p.area} م²${p.bedrooms ? `\n🛏️ ${p.bedrooms} غرف` : ''}\n📞 ${p.phone}\n\n${p.description}`;
}

export function compareProperties(items: Property[]) {
  const sorted = [...items].sort((a, b) => a.price - b.price);
  const largest = [...items].sort((a, b) => b.area - a.area)[0];
  const cheapest = sorted[0];
  return { cheapest, largest, summary: `${cheapest?.title || 'العقار الأول'} أوفر سعراً، بينما ${largest?.title || 'العقار الأكبر'} أكبر مساحة. المقارنة لا تغني عن المعاينة والتحقق من المستندات والموقع.` };
}
