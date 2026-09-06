'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const KEY='aqari-account';
export default function AccountPage(){
 const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [role,setRole]=useState('مشتري'); const [saved,setSaved]=useState(false);
 useEffect(()=>{try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');setName(x.name||'');setPhone(x.phone||'');setRole(x.role||'مشتري')}catch{}}
 ,[]);
 const save=()=>{localStorage.setItem(KEY,JSON.stringify({name,phone,role}));setSaved(true);setTimeout(()=>setSaved(false),1800)};
 return <main className="container section" style={{maxWidth:760}}>
  <div className="eyebrow">الحساب الشخصي</div><h1>حسابي</h1><p className="muted">إدارة معلوماتك وبيانات التواصل من مكان واحد.</p>
  <section className="form" style={{marginTop:18}}>
   <label>الاسم الكامل<input value={name} onChange={e=>setName(e.target.value)} placeholder="اكتب اسمك الكامل"/></label>
   <label>رقم الهاتف<input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="07xxxxxxxxx" inputMode="tel"/></label>
   <label>نوع الحساب<select value={role} onChange={e=>setRole(e.target.value)}><option>مشتري</option><option>مالك عقار</option></select></label>
   <button className="goldbtn" onClick={save}>{saved?'✓ تم الحفظ':'حفظ البيانات'}</button>
  </section>
  <section className="features" style={{marginTop:18}}>
   <Link href="/booking" className="feature"><strong>📅 حجوزاتي</strong><span className="muted">عرض وإدارة مواعيد المعاينة.</span></Link>
   <Link href="/favorites" className="feature"><strong>♥ المفضلة</strong><span className="muted">العقارات التي حفظتها.</span></Link>
   <Link href="/publish" className="feature"><strong>＋ نشر عقار</strong><span className="muted">إضافة عقار جديد كمالك.</span></Link>
  </section>
 </main>;
}
