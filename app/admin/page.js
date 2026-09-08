'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const SUPABASE_URL = 'https://kugoqyjxlbxykkjjxlia.supabase.co';
const SUPABASE_KEY = 'sb_publishable_blahC8UrqXE9g8vstmTNnQ_vJ7LNx5J';
const ADMIN_EMAIL = 'amilaml639@gmail.com';

async function request(path, { token = SUPABASE_KEY, method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(data?.msg || data?.message || data?.error_description || data?.hint || `HTTP ${response.status}`);
  return data;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const data = await request('/auth/v1/token?grant_type=password', {
        method: 'POST',
        body: { email: email.trim().toLowerCase(), password },
      });
      if (data.user?.email?.toLowerCase() !== ADMIN_EMAIL) throw new Error('هذا الحساب غير مخول لدخول لوحة الإدارة.');
      localStorage.setItem('aamil-admin-session', JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      setError(err?.message || 'فشل تسجيل الدخول.');
    } finally { setBusy(false); }
  };

  return <main dir="rtl" className="login-page"><form className="login-card" onSubmit={submit}>
    <div className="login-logo">ع</div><span className="eyebrow">عامل • إدارة العقود</span><h1>تسجيل دخول الإدارة</h1>
    <p>هذه الصفحة مخصصة لإدارة ومراجعة عقود التسجيل المرسلة من الموقع الرسمي.</p>
    <label>البريد الإلكتروني<input type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username" /></label>
    <label>كلمة المرور<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" placeholder="أدخل كلمة مرور حساب الإدارة" /></label>
    {error && <div className="error">{error}</div>}
    <button className="primary" disabled={busy}>{busy ? 'جاري التحقق...' : 'دخول لوحة الإدارة'}</button>
    <Link href="/" className="back">← العودة للموقع</Link>
  </form><style jsx global>{styles}</style></main>;
}

export default function Admin() {
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [docs, setDocs] = useState({});
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aamil-admin-session') || 'null');
      if (saved?.access_token && saved?.user?.email?.toLowerCase() === ADMIN_EMAIL) setSession(saved);
    } catch {}
    setLoading(false);
  }, []);

  const load = async (activeSession = session) => {
    if (!activeSession?.access_token) return;
    setLoading(true); setError('');
    try {
      const rows = await request('/rest/v1/aamil_contract_requests?select=*&order=created_at.desc', { token: activeSession.access_token });
      setItems(rows || []);
      const allDocs = await request('/rest/v1/aamil_contract_documents?select=*', { token: activeSession.access_token });
      const grouped = {};
      for (const d of allDocs || []) {
        try {
          const signed = await request('/storage/v1/object/sign/contract-documents/' + d.storage_path, {
            token: activeSession.access_token,
            method: 'POST',
            body: { expiresIn: 3600 },
          });
          grouped[d.request_id] ||= {};
          grouped[d.request_id][d.document_type] = signed?.signedURL?.startsWith('http') ? signed.signedURL : `${SUPABASE_URL}${signed?.signedURL || ''}`;
        } catch (e) { console.error('document sign failed', d.id, e); }
      }
      setDocs(grouped);
    } catch (err) {
      setError(err?.message || 'تعذر تحميل العقود.');
      if (/jwt|token|unauthor|expired/i.test(err?.message || '')) logout();
    } finally { setLoading(false); }
  };

  useEffect(() => { if (session) load(session); }, [session]);

  const logout = () => { localStorage.removeItem('aamil-admin-session'); setSession(null); setItems([]); setDocs({}); setSelected(null); };

  const act = async (id, status) => {
    try {
      await request(`/rest/v1/aamil_contract_requests?id=eq.${encodeURIComponent(id)}`, {
        token: session.access_token,
        method: 'PATCH',
        body: { status, reviewed_at: new Date().toISOString(), rejection_reason: status === 'rejected' ? 'تم رفض الطلب من الإدارة.' : null },
        headers: { Prefer: 'return=minimal' },
      });
      setItems(prev => prev.map(x => x.id === id ? { ...x, status } : x));
      setSelected(prev => prev?.id === id ? { ...prev, status } : prev);
    } catch (err) { setError(err?.message || 'تعذر تحديث حالة العقد.'); }
  };

  const visible = useMemo(() => items.filter(x => filter === 'all' || x.status === filter), [items, filter]);
  if (loading && !session) return <main dir="rtl" className="login-page"><div className="login-card"><div className="login-logo">ع</div><h1>جاري فتح الإدارة...</h1></div><style jsx global>{styles}</style></main>;
  if (!session) return <Login onLogin={setSession} />;

  return <main dir="rtl" className="admin-page"><header className="admin-head"><div><Link href="/">← عامل</Link><span className="eyebrow">لوحة الإدارة</span><h1>عقود التسجيل والاعتماد</h1><p>كل عقد يرسله المستخدم من الموقع الرسمي يظهر هنا بحالة «قيد المراجعة».</p></div><div className="head-actions"><button onClick={()=>load(session)}>↻ تحديث</button><button onClick={logout}>تسجيل خروج</button></div></header>
    {error && <div className="error global-error">{error}</div>}
    <div className="stats"><div><b>{items.filter(x=>x.status==='pending').length}</b><span>قيد المراجعة</span></div><div><b>{items.filter(x=>x.status==='published').length}</b><span>مقبولة</span></div><div><b>{items.filter(x=>x.status==='rejected').length}</b><span>مرفوضة</span></div><div><b>{items.length}</b><span>إجمالي العقود</span></div></div>
    <div className="tabs">{[['pending','طلبات المراجعة'],['published','المقبولة'],['rejected','المرفوضة'],['all','الكل']].map(([v,t])=><button key={v} className={filter===v?'active':''} onClick={()=>setFilter(v)}>{t}</button>)}</div>
    {loading ? <div className="empty">جاري تحميل العقود...</div> : visible.length === 0 ? <div className="empty">لا توجد عقود في هذا القسم.</div> : <div className="list">{visible.map(item => <article className="contract-card" key={item.id}>
      <div className="card-top"><span className={`status ${item.status}`}>{item.status==='pending'?'قيد المراجعة':item.status==='published'?'مقبول':'مرفوض'}</span><strong>{item.request_code}</strong></div>
      <h2>{item.full_name}</h2><p>{item.role} · {item.profession || 'بدون مهنة'} · {item.province} / {item.area}</p><p>الهاتف: {item.phone} · العمر: {item.age}</p><small>{new Date(item.created_at).toLocaleString('ar-IQ')}</small>
      <div className="card-actions"><button onClick={()=>setSelected(item)}>عرض العقد والوثائق</button>{item.status!=='published'&&<button className="approve" onClick={()=>act(item.id,'published')}>✓ موافقة</button>}{item.status!=='rejected'&&<button className="reject" onClick={()=>act(item.id,'rejected')}>✕ رفض</button>}</div>
    </article>)}</div>}
    {selected && <div className="overlay"><section className="detail"><button className="close" onClick={()=>setSelected(null)}>×</button><div className="detail-head"><div><span className="eyebrow">{selected.request_code}</span><h1>{selected.full_name}</h1><p>{selected.role} · {selected.profession}</p></div><span className={`status ${selected.status}`}>{selected.status==='pending'?'قيد المراجعة':selected.status==='published'?'مقبول':'مرفوض'}</span></div>
      <div className="detail-grid">{[['العمر',selected.age],['الهاتف',selected.phone],['المحافظة',selected.province],['المنطقة',selected.area],['الصفة',selected.role],['المهنة',selected.profession || '—']].map(([k,v])=><div key={k}><small>{k}</small><b>{v}</b></div>)}</div>
      <h3>الوثائق المرفوعة</h3><div className="docs">{[['profile','الصورة الشخصية'],['id-front','البطاقة الموحدة — الوجه'],['id-back','البطاقة الموحدة — الخلف'],['residence-front','بطاقة السكن — الوجه'],['residence-back','بطاقة السكن — الخلف']].map(([k,t])=><div className="doc" key={k}><span>{t}</span>{docs[selected.id]?.[k] ? <img src={docs[selected.id][k]} alt={t}/> : <div className="missing">لم تُحمّل الصورة</div>}</div>)}</div>
      <div className="detail-actions">{selected.status!=='published'&&<button className="approve" onClick={()=>act(selected.id,'published')}>✓ موافقة واعتماد</button>}{selected.status!=='rejected'&&<button className="reject" onClick={()=>act(selected.id,'rejected')}>✕ رفض</button>}<button onClick={()=>setSelected(null)}>إغلاق</button></div>
    </section></div>}
    <style jsx global>{styles}</style>
  </main>;
}

const styles = `
*{box-sizing:border-box}body{margin:0;font-family:Arial,Tahoma,sans-serif;background:#f3f6f8;color:#122033}button,input{font:inherit}.login-page{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 20% 10%,#e8f3f5,transparent 35%),#f3f6f8}.login-card{width:min(460px,100%);background:#fff;border:1px solid #e2e8ed;border-radius:28px;padding:34px;box-shadow:0 25px 70px #14243812}.login-logo{width:68px;height:68px;border-radius:20px;background:#071b31;color:#d9b66b;display:grid;place-items:center;font-size:36px;font-weight:900;margin:0 auto 18px}.login-card h1{margin:5px 0 8px;text-align:center;font-size:27px}.login-card p{color:#697686;line-height:1.7;text-align:center}.eyebrow{display:block;color:#9a7a3a;font-size:13px;font-weight:900;margin-bottom:7px}.login-card label{display:flex;flex-direction:column;gap:7px;font-weight:800;margin-top:16px}.login-card input{padding:14px;border:1px solid #d8e0e7;border-radius:13px;outline:none}.primary,.head-actions button,.tabs button,.card-actions button,.detail-actions button{border:0;border-radius:13px;padding:13px 17px;cursor:pointer;font-weight:900}.login-card .primary{width:100%;margin-top:20px;background:#071b31;color:#fff}.primary:disabled{opacity:.5}.back{display:block;text-align:center;margin-top:18px;color:#607082;text-decoration:none}.error{background:#fff0f0;color:#9d3d3d;border:1px solid #efcccc;border-radius:12px;padding:11px 13px;font-size:13px}.admin-page{min-height:100vh;padding:28px;max-width:1250px;margin:auto}.admin-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:22px}.admin-head a{color:#566678;text-decoration:none}.admin-head h1{margin:4px 0;font-size:30px}.admin-head p{margin:7px 0;color:#718091}.head-actions{display:flex;gap:8px}.head-actions button{background:#fff;border:1px solid #dce3e8}.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}.stats div{background:#fff;border:1px solid #e1e7ec;border-radius:18px;padding:18px}.stats b{display:block;font-size:28px}.stats span{color:#718091;font-size:13px}.tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}.tabs button{background:#e9eef2;color:#445366}.tabs .active{background:#071b31;color:#fff}.list{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.contract-card{background:#fff;border:1px solid #e1e7ec;border-radius:20px;padding:20px;box-shadow:0 12px 35px #14243808}.card-top{display:flex;justify-content:space-between;align-items:center}.status{display:inline-block;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:900}.status.pending{background:#fff5dc;color:#87621b}.status.published{background:#e7f7ed;color:#237043}.status.rejected{background:#fff0f0;color:#a13d3d}.contract-card h2{margin:13px 0 6px}.contract-card p{margin:5px 0;color:#647284;font-size:13px}.contract-card small{color:#8994a0}.card-actions{display:flex;gap:8px;margin-top:15px;flex-wrap:wrap}.card-actions button{background:#edf1f4}.card-actions .approve,.detail-actions .approve{background:#0d6b43;color:#fff}.card-actions .reject,.detail-actions .reject{background:#a83d3d;color:#fff}.empty{background:#fff;border:1px dashed #cfd8e0;border-radius:18px;padding:50px;text-align:center;color:#7c8895}.global-error{margin-bottom:15px}.overlay{position:fixed;inset:0;background:#08152299;z-index:20;padding:20px;overflow:auto}.detail{position:relative;background:#fff;max-width:1050px;margin:30px auto;border-radius:24px;padding:26px}.close{position:absolute;left:18px;top:15px;border:0;background:#eef2f5;width:36px;height:36px;border-radius:50%;font-size:22px;cursor:pointer}.detail-head{display:flex;justify-content:space-between;gap:15px;align-items:flex-start;padding-bottom:15px;border-bottom:1px solid #e6ebef}.detail-head h1{margin:0 0 5px}.detail-head p{margin:0;color:#697789}.detail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:18px 0}.detail-grid div{background:#f7f9fa;border-radius:12px;padding:12px}.detail-grid small,.detail-grid b{display:block}.detail-grid small{color:#9a7a3a;margin-bottom:4px}.docs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.doc{background:#f7f9fa;border-radius:14px;padding:10px}.doc span{display:block;font-size:12px;font-weight:900;margin-bottom:8px}.doc img{width:100%;height:170px;object-fit:cover;border-radius:10px;background:#fff}.missing{height:170px;display:grid;place-items:center;color:#8b97a3;font-size:12px}.detail-actions{display:flex;gap:8px;justify-content:flex-start;margin-top:18px}.detail-actions button{background:#e9eef2}.detail-actions .approve,.detail-actions .reject{color:#fff}@media(max-width:800px){.admin-page{padding:16px}.admin-head{flex-direction:column}.stats{grid-template-columns:repeat(2,1fr)}.list{grid-template-columns:1fr}.detail-grid{grid-template-columns:repeat(2,1fr)}.docs{grid-template-columns:1fr}.detail{padding:18px}.detail-head{padding-top:18px}}
`;