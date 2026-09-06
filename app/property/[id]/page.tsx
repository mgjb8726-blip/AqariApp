'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const properties = [
  {id:'1',title:'دار سكنية حديثة في حي الواسطي',type:'دار',city:'كركوك',area:'الواسطي',price:185000000,rooms:4,size:240,img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85'},
  {id:'2',title:'شقة راقية قرب شارع بغداد',type:'شقة',city:'كركوك',area:'شارع بغداد',price:125000000,rooms:3,size:165,img:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85'},
  {id:'3',title:'قطعة أرض تجارية على شارع رئيسي',type:'أرض',city:'الموصل',area:'الدواسة',price:320000000,rooms:0,size:500,img:'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85'},
  {id:'4',title:'مشتمل مستقل مع حديقة',type:'مشتمل',city:'كركوك',area:'حي العسكري',price:98000000,rooms:2,size:120,img:'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85'},
  {id:'5',title:'محل تجاري جاهز للاستثمار',type:'محل',city:'بغداد',area:'المنصور',price:275000000,rooms:0,size:90,img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85'},
  {id:'6',title:'مخزن واسع مع مدخل شاحنات',type:'مخزن',city:'نينوى',area:'الجانب الأيمن',price:410000000,rooms:0,size:800,img:'https://images.unsplash.com/photo-1586528116493-da8b6f2a5a17?auto=format&fit=crop&w=1400&q=85'}
];

const money=(n:number)=>new Intl.NumberFormat('ar-IQ').format(n)+' د.ع';

export default function PropertyDetails({params}:{params:{id:string}}){
  const p=useMemo(()=>properties.find(x=>x.id===params.id)||properties[0],[params.id]);
  const [fav,setFav]=useState(false);
  const [photo,setPhoto]=useState(p.img);
  const [copied,setCopied]=useState(false);
  useEffect(()=>{const f=JSON.parse(localStorage.getItem('fav')||'[]');setFav(f.includes(p.id));},[p.id]);
  const toggleFav=()=>{const f=JSON.parse(localStorage.getItem('fav')||'[]');const next=fav?f.filter((x:string)=>x!==p.id):[...f,p.id];localStorage.setItem('fav',JSON.stringify(next));setFav(!fav)};
  const copy=async()=>{try{await navigator.clipboard.writeText(window.location.href);setCopied(true);setTimeout(()=>setCopied(false),1800)}catch{}};
  const roi=((900000*12/p.price)*100).toFixed(2);
  const thumbs=[p.img,'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80','https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=80'];
  return <main className="container section propertyDetailPage">
    <div className="detailTop"><Link href="/properties" className="backLink">← العودة للعقارات</Link><button className="outlinebtn" onClick={copy}>{copied?'تم نسخ الرابط ✓':'مشاركة العقار'}</button></div>
    <section className="detailHero">
      <div className="gallery">
        <div className="mainPhoto"><img src={photo} alt={p.title}/><span className="detailBadge">عقار موثّق</span><button className="detailHeart" onClick={toggleFav}>{fav?'♥':'♡'}</button></div>
        <div className="thumbs">{thumbs.map((x,i)=><button key={i} className={'thumb '+(photo===x?'selected':'')} onClick={()=>setPhoto(x)}><img src={x} alt=""/></button>)}</div>
      </div>
      <div className="detailInfo">
        <div className="eyebrow">{p.type} · {p.city} · {p.area}</div>
        <h1>{p.title}</h1><div className="detailPrice">{money(p.price)}</div>
        <p className="muted">فرصة عقارية مميزة بموقع مناسب. يمكن طلب المعاينة والتواصل مع المالك مباشرة.</p>
        <div className="specGrid"><div><b>{p.size}</b><span>م² المساحة</span></div><div><b>{p.rooms||'—'}</b><span>الغرف</span></div><div><b>✓</b><span>موثّق</span></div><div><b>{roi}%</b><span>ROI تقديري</span></div></div>
        <div className="detailActions"><Link href="/booking" className="goldLink">احجز موعد معاينة</Link><button className="waBtn" onClick={()=>window.open('https://wa.me/9647500000000','_blank')}>واتساب المالك</button><button className="outlinebtn" onClick={()=>window.open('tel:+9647500000000','_self')}>اتصال</button></div>
      </div>
    </section>
    <section className="detailSections">
      <div className="detailPanel"><h2>تفاصيل العقار</h2><div className="detailRows"><div><span>نوع العقار</span><b>{p.type}</b></div><div><span>المحافظة</span><b>{p.city}</b></div><div><span>المنطقة</span><b>{p.area}</b></div><div><span>المساحة</span><b>{p.size} م²</b></div><div><span>عدد الغرف</span><b>{p.rooms||'غير محدد'}</b></div><div><span>السعر لكل م²</span><b>{money(Math.round(p.price/p.size))}</b></div></div></div>
      <div className="detailPanel"><h2>الموقع والاتجاه</h2><div className="mapBox"><div className="mapPin">⌖</div><strong>{p.area} · {p.city}</strong><span>الموقع التقريبي حفاظًا على الخصوصية</span><button className="goldbtn" onClick={()=>window.open('https://www.google.com/maps/search/'+encodeURIComponent(p.area+' '+p.city),'_blank')}>فتح الاتجاهات</button></div></div>
      <div className="detailPanel"><h2>العائد الاستثماري ROI</h2><div className="roiBox"><div><span>الإيجار الشهري المتوقع</span><b>900,000 د.ع</b></div><div><span>العائد السنوي التقديري</span><b>{roi}%</b></div><Link href="/calculator" className="outlinebtn">افتح الحاسبة كاملة</Link></div></div>
      <div className="detailPanel"><h2>تواصل وحجز</h2><p className="muted">احجز وقت المعاينة المناسب أو تواصل مباشرة مع المالك للاستفسار عن العقار.</p><div className="detailActions"><Link href="/booking" className="goldLink">حجز المعاينة</Link><button className="waBtn" onClick={()=>window.open('https://wa.me/9647500000000','_blank')}>مراسلة واتساب</button></div></div>
    </section>
  </main>
}
