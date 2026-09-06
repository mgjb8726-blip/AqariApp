import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'عقاري | سوق العقارات العراقي', description: 'منصة عقارية عراقية حديثة للبحث والبيع والشراء والإيجار.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}