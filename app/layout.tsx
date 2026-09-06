import type { Metadata } from 'next';
import './globals.css';
import './quick-access.css';
import './property-details.css';
import BackButton from './back-button';

export const metadata: Metadata = { title: 'عقاري | سوق العقارات العراقي', description: 'منصة عقارية عراقية حديثة للبحث والبيع والشراء والإيجار.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body><BackButton />{children}</body></html>;
}
