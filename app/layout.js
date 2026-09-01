import './globals.css';

export const metadata = {
  title: 'عقاري | عقارات كركوك',
  description: 'منصة عقارية لبيع وشراء وعرض العقارات في كركوك',
};

export default function RootLayout({ children }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
