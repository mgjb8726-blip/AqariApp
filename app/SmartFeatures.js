'use client';
import Link from 'next/link';

const features=[
  ['🧮','محاكي شراء العقار','حدد نوع العقار وميزانيتك التقريبية.','/purchase-simulator'],
  ['🏗️','حاسبة بناء العقار','تقدير أولي لتكلفة البناء.','/building-calculator'],
  ['🤝','تسليم العقار','خطوات مرتبة لتوثيق واستلام العقار.','/property-handover'],
  ['🌙','الوضع الليلي','واجهة ليلية مريحة للعين.','/dark-mode'],
  ['🔄','مبادلة العقارات','اعرض عقارك وابحث عن عقار مناسب للمبادلة.','/property-exchange'],
  ['📈','الاستثمار العقاري','احسب العائد السنوي وجدوى الاستثمار.','/real-estate-investment'],
  ['⭐','عقار اليوم','فرصة عقارية مميزة يومياً.','/property-of-the-day'],
];

export default function SmartFeatures(){
 return <section className="aq-smart-launch-wrap" aria-label="مميزات عقاري الذكية">
  <Link className="aq-smart-launch" href="/purchase-simulator">
   <span>✨</span><b>مميزات عقاري الذكية</b><small>7 أدوات ذكية جديدة</small>
  </Link>
  <div className="aq-smart-links">
   {features.map(([icon,title,desc,href])=><Link className="aq-smart-card" href={href} key={title}>
    <span className="aq-smart-icon">{icon}</span><span><b>{title}</b><small>{desc}</small></span><i>←</i>
   </Link>)}
  </div>
  <style jsx>{` .aq-smart-launch-wrap{direction:rtl;position:relative;z-index:25;width:min(92%,760px);margin:14px auto}.aq-smart-launch{display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:10px;align-items:center;text-decoration:none;border:1px solid #e1bb62;background:linear-gradient(135deg,#d3a23b,#a97819);color:#fff;border-radius:18px;padding:12px 18px;box-shadow:0 10px 28px #0005}.aq-smart-launch span{grid-row:1/3;font-size:25px}.aq-smart-launch b{font-size:15px}.aq-smart-launch small{font-size:10px;opacity:.9}.aq-smart-links{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.aq-smart-card{display:flex;align-items:center;gap:10px;text-decoration:none;background:#fff;border:1px solid #e3e9ed;border-radius:16px;padding:13px;color:#0c2b44;box-shadow:0 6px 18px #10203312}.aq-smart-card:hover{border-color:#c99a32}.aq-smart-icon{font-size:25px}.aq-smart-card b{display:block;font-size:13px}.aq-smart-card small{display:block;color:#6d7c87;font-size:10px;margin-top:3px}.aq-smart-card i{margin-right:auto;color:#c99a32;font-style:normal;font-size:18px}@media(max-width:650px){.aq-smart-links{grid-template-columns:1fr}.aq-smart-launch-wrap{width:94%}}`}</style>
 </section>;
}
