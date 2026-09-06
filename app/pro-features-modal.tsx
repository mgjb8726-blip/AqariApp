'use client';
import { useState } from 'react';
import Link from 'next/link';

const features = [
  ['✦','المساعد العقاري الذكي','/ai'],
  ['⚖','مقارنة العقارات','/compare'],
  ['📅','حجز موعد المعاينة','/booking'],
  ['▣','الحاسبة العقارية و ROI','/calculator'],
  ['📍','الموقع والاتجاهات','/properties'],
  ['♥','العقارات المفضلة','/favorites'],
  ['🛠','الحرفيون وخدمات البناء','/services']
];

export default function ProFeaturesButton(){
  const [open,setOpen]=useState(false);
  return <>
    <button className="proTrigger" onClick={()=>setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
      <span>✦</span> مميزات عقاري Pro
    </button>
    {open&&<div className="proOverlay" role="dialog" aria-modal="true" aria-label="مميزات عقاري Pro" onClick={()=>setOpen(false)}>
      <div className="proModal" onClick={e=>e.stopPropagation()}>
        <div className="proModalHead">
          <div><div className="proKicker">عقاري IQ</div><h2>مميزات عقاري Pro</h2><p>كل الأدوات الذكية في مكان واحد</p></div>
          <button className="proClose" onClick={()=>setOpen(false)} aria-label="إغلاق">×</button>
        </div>
        <div className="proFeatureGrid">
          {features.map(([icon,title,href])=><Link key={title} href={href} className="proFeature" onClick={()=>setOpen(false)}>
            <span className="proFeatureIcon">{icon}</span><span>{title}</span><b>‹</b>
          </Link>)}
        </div>
      </div>
    </div>}
  </>;
}
