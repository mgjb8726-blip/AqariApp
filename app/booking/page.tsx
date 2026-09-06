'use client';
import { useEffect, useState } from 'react';

const KEY='aqari-bookings';
export default function BookingPage(){
 const [property,setProperty]=useState('اختيار العقار'); const [date,setDate]=useState(''); const [time,setTime]=useState(''); const [note,setNote]=useState(''); const [items,setItems]=useState<any[]>([]); const [msg,setMsg]=useState('');
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem(KEY)||'[]'))}catch{}},[]);
 const save=()=>{if(property==='اختيار العقار'||!date||!time){setMsg('يرجى اختيار العقار والتاريخ والوقت');return} const item={id:Date.now().toString(),property,date,time,note,status:'قيد التأكيد'};const next=[item,...items];setItems(next);localStorage.setItem(KEY,JSON.stringify(next));setMsg('✓ تم حفظ موعد المعاينة بنجاح');setProperty('اختيار العقار');setDate('');setTime('');setNote('')};
 const cancel=(id:string)=>{const next=items.map(x=>x.id===id?{...x,status:'ملغى'}:x);setItems(next);localStorage.setItem(KEY,JSON.stringify(next))};
 return <main className="container section" style={{maxWidth:900}}><div className="eyebrow">المواعيد</div><h1>حجوزات المعاينة</h1><p className="muted">احجز موعدك واحتفظ بكل عمليات الحجز في حسابك.</p>
 <section className="form" style={{marginTop:18}}><label>العقار<select value={property} onChange={e=>setProperty(e.target.value)}><option>اختيار العقار</option><option>دار سكنية حديثة في حي الواسطي</option><option>شقة راقية قرب شارع بغداد</option><option>قطعة أرض تجارية على شارع رئيسي</option><option>دار عائلية واسعة مع كراج</option><option>شقة استثمارية مناسبة للإيجار</option><option>دار حديثة بتصميم فاخر</option></select></label><label>التاريخ<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>الوقت<input type="time" value={time} onChange={e=>setTime(e.target.value)}/></label><label>ملاحظات إضافية<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="مثلاً: أفضّل الاتصال قبل الوصول"/></label><button className="goldbtn" onClick={save}>تأكيد الحجز</button>{msg&&<div className="feature">{msg}</div>}</section>
 <section className="section"><h2>حجوزاتي السابقة</h2>{items.length===0?<div className="feature">لا توجد حجوزات محفوظة حالياً.</div>:items.map(x=><article key={x.id} className="feature" style={{marginTop:10,display:'flex',justifyContent:'space-between',gap:12,alignItems:'center'}}><div><strong>{x.property}</strong><div className="muted">{x.date} · {x.time} · {x.status}</div>{x.note&&<div className="muted">{x.note}</div>}</div>{x.status!=='ملغى'&&<button className="outlinebtn" onClick={()=>cancel(x.id)}>إلغاء</button>}</article>)}</section>
 </main>;
}
