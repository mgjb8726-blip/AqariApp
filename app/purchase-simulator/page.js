'use client';
import {useState} from 'react';

const money=n=>new Intl.NumberFormat('ar-IQ').format(Math.round(Number(n)||0))+' د.ع';

export default function PurchaseSimulator(){
 const [type,setType]=useState('منزل');
 const [budget,setBudget]=useState('');
 const [result,setResult]=useState(null);
 const simulate=()=>{const value=Number(budget);if(!value){setResult({error:'أدخل الميزانية التقريبية أولاً.'});return}setResult({value,type,low:value*.9,high:value*1.1})};
 return <main dir="rtl" className="purchase-page">
  <header className="purchase-header"><a href="/" className="back">→</a><div><h1>محاكي شراء العقار</h1><p>صفحة مستقلة بالكامل</p></div></header>
  <section className="purchase-wrap">
   <div className="hero-card"><span>🧮</span><div><b>محاكي شراء العقار</b><p>حدد نوع العقار وميزانيتك التقريبية، وسنحسب لك نطاقاً مناسباً للبحث.</p></div></div>
   <section className="form-card">
    <label>نوع العقار<select value={type} onChange={e=>setType(e.target.value)}><option>منزل</option><option>شقة</option><option>قطعة أرض</option><option>مشتمل</option><option>محل</option><option>مخزن</option></select></label>
    <label>الميزانية التقريبية بالدينار العراقي<input type="number" inputMode="numeric" value={budget} onChange={e=>setBudget(e.target.value)} placeholder="مثلاً 200000000"/></label>
    <button onClick={simulate}>محاكاة الشراء</button>
    {result?.error&&<div className="notice">{result.error}</div>}
    {result&&!result.error&&<div className="result"><div>نوع العقار <b>{result.type}</b></div><div>الميزانية <b>{money(result.value)}</b></div><div>نطاق البحث المقترح <strong>{money(result.low)} — {money(result.high)}</strong></div></div>}
   </section>
   <div className="info"><b>ملاحظة</b><br/>هذه صفحة Route مستقلة وليست Modal أو نافذة منبثقة. يمكنك الرجوع للصفحة الرئيسية من زر السهم بالأعلى.</div>
  </section>
  <style jsx>{`*{box-sizing:border-box}.purchase-page{min-height:100vh;background:#f5f7fb;color:#10263a;font-family:Arial,Tahoma,sans-serif}.purchase-header{height:76px;background:#fff;border-bottom:1px solid #e5ebf0;display:flex;align-items:center;gap:13px;padding:0 max(16px,calc((100vw - 920px)/2));position:sticky;top:0;z-index:5}.back{width:44px;height:44px;border-radius:13px;background:#eef3f6;color:#0c2b44;text-decoration:none;display:grid;place-items:center;font-size:25px}.purchase-header h1{font-size:20px;margin:0}.purchase-header p{font-size:11px;color:#7a8793;margin:4px 0}.purchase-wrap{width:min(920px,100%);margin:auto;padding:24px 16px 60px}.hero-card{display:flex;gap:15px;align-items:center;background:linear-gradient(135deg,#071d35,#0c456b);color:#fff;border-radius:24px;padding:24px;margin-bottom:16px;box-shadow:0 15px 40px #071d3526}.hero-card>span{font-size:40px}.hero-card b{font-size:22px}.hero-card p{color:#cfdae4;line-height:1.8;margin:6px 0 0;font-size:13px}.form-card{background:#fff;border:1px solid #e2e9ef;border-radius:22px;padding:20px;box-shadow:0 10px 30px #10203310;display:grid;gap:15px}.form-card label{display:grid;gap:7px;font-size:12px;color:#64748b}.form-card input,.form-card select{width:100%;padding:14px;border:1px solid #d9e2e9;border-radius:13px;background:#fbfcfd;outline:none;font:inherit;color:#10263a}.form-card>button{padding:14px;border:0;border-radius:13px;background:#d1a23b;color:#10263a;font-weight:900;font:inherit;cursor:pointer}.result{background:#edf8f7;border:1px solid #bfe5e2;border-radius:16px;padding:16px;line-height:2}.result div{display:flex;justify-content:space-between;gap:15px;border-bottom:1px solid #d9eeec;padding:5px 0}.result div:last-child{border:0}.result strong{color:#087f7a}.notice,.info{background:#fff6df;border-right:4px solid #d1a23b;border-radius:13px;padding:13px;line-height:1.8;font-size:12px}.info{margin-top:16px;background:#eef8f7;border-right-color:#11a39d}@media(max-width:600px){.hero-card{align-items:flex-start}.hero-card b{font-size:19px}.purchase-wrap{padding:18px 12px 45px}.result div{display:block}.result b,.result strong{display:block}}`}</style>
 </main>;
}
