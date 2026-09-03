'use client';
import {useState} from 'react';

const features=[
  ['🧮','محاكي شراء العقار','حدد نوع العقار وميزانيتك التقريبية، ونقترح لك الخيارات المناسبة.'],
  ['🏗️','حاسبة بناء العقار','أدخل نوع البناء والميزانية لتحصل على تقدير أولي وخيارات مناسبة.'],
  ['🤝','تسليم العقار','خطوات مرتبة لتوثيق واستلام العقار بسهولة وأمان.'],
  ['🌙','الوضع الليلي','واجهة ليلية مريحة للعين مع حفظ اختيارك.'],
  ['🔄','مبادلة العقارات','اعرض عقارك بكل تفاصيله وابحث عن عقار مناسب للمبادلة.'],
  ['📈','الاستثمار العقاري','السعر، الإيجار المتوقع والعائد السنوي ومؤشرات فرصة الاستثمار.'],
  ['⭐','عقار اليوم','عقار مميز يومياً مع إبراز السعر والموقع والمعلومات المهمة.'],
];

export default function SmartFeatures(){
 const [open,setOpen]=useState(false);
 return <>
  <button className="aq-smart-launch" onClick={()=>setOpen(true)} aria-label="مميزات عقاري الذكية">
   <span>✨</span><b>مميزات عقاري الذكية</b><small>7 أدوات ذكية جديدة</small>
  </button>
  {open&&<div className="aq-smart-overlay" onClick={()=>setOpen(false)}>
   <div className="aq-smart-modal" onClick={e=>e.stopPropagation()}>
    <button className="aq-smart-close" onClick={()=>setOpen(false)}>×</button>
    <div className="aq-smart-head"><span>✨</span><div><h2>مميزات عقاري الذكية</h2><p>كل الأدوات الجديدة بمكان واحد</p></div></div>
    <div className="aq-smart-grid">{features.map(([icon,title,desc])=><button className="aq-smart-card" key={title} onClick={()=>alert(title+'\n\n'+desc)}><span className="aq-smart-icon">{icon}</span><div><b>{title}</b><p>{desc}</p></div><span className="aq-smart-arrow">←</span></button>)}</div>
   </div>
  </div>}
  <style jsx>{` .aq-smart-launch{position:absolute;z-index:25;top:86px;left:50%;transform:translateX(-50%);width:min(92%,430px);border:1px solid #e1bb62!important;background:linear-gradient(135deg,#d3a23b,#a97819)!important;color:#fff!important;border-radius:18px!important;padding:12px 18px!important;box-shadow:0 10px 28px #0005;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:10px;align-items:center}.aq-smart-launch span{grid-row:1/3;font-size:25px}.aq-smart-launch b{font-size:15px;text-align:right}.aq-smart-launch small{font-size:10px;opacity:.9;text-align:right}.aq-smart-overlay{position:fixed;inset:0;background:#061321cc;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px}.aq-smart-modal{background:#fff;width:min(720px,96vw);max-height:90vh;overflow:auto;border-radius:26px;padding:20px;position:relative;box-shadow:0 25px 70px #0006}.aq-smart-close{position:absolute;left:15px;top:12px;width:38px;height:38px;border-radius:50%;font-size:25px;background:#edf2f5}.aq-smart-head{display:flex;align-items:center;gap:12px;border-bottom:1px solid #e7ebee;padding:4px 0 16px}.aq-smart-head>span{font-size:35px}.aq-smart-head h2{margin:0;color:#0a2439;font-size:23px}.aq-smart-head p{margin:4px 0 0;color:#7b8790;font-size:12px}.aq-smart-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:16px}.aq-smart-card{display:flex;align-items:center;gap:10px;text-align:right;background:#f7f9fa!important;border:1px solid #e3e9ed!important;border-radius:18px!important;padding:14px!important}.aq-smart-card:hover{border-color:#c99a32!important}.aq-smart-icon{font-size:27px}.aq-smart-card b{color:#0c2b44;font-size:14px}.aq-smart-card p{margin:4px 0 0;color:#6d7c87;font-size:11px;line-height:1.55}.aq-smart-arrow{margin-right:auto;color:#c99a32;font-size:18px}@media(max-width:650px){.aq-smart-launch{top:82px}.aq-smart-grid{grid-template-columns:1fr}.aq-smart-modal{padding:16px}.aq-smart-head h2{font-size:20px}}`}</style>
 </>;
}
