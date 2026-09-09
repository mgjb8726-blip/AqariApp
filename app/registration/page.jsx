'use client';

import { useMemo, useState } from 'react';

const SUPABASE_URL = 'https://kugoqyjxlbxykkjjxlia.supabase.co';
const SUPABASE_KEY = 'sb_publishable_blahC8UrqXE9g8vstmTNnQ_vJ7LNx5J';

const provinces = {
  'بغداد': ['الكرخ','الرصافة','الأعظمية','الكاظمية','المنصور','العامرية','الدورة','السيدية','البياع','حي الجامعة','الغزالية','الشعلة','الشعب','مدينة الصدر','البلديات','زيونة','بغداد الجديدة','الزعفرانية','الكرادة','الجادرية','المدائن','أبو غريب','المحمودية'],
  'كركوك': ['مركز كركوك','رحيم آوه','المصلى','تسعين','واسطي','الواسطي الجديدة','الحي العسكري','الحي الصناعي','القادسية','المنطقة الخضراء','شوراو','العمل الشعبي','عرفة','الواسطية','الإسكان','الفيصلية','الماس','بنجة علي','ساحة الاحتفالات','حي النداء','حي النصر','حي الواسطي','الملتقى','دوميز','الزهراء','الحرية','التأميم','حي الربيع','حي اليرموك','حي العسكري','التون كوبري','الدبس','الحويجة','الزاب','الرياض','العباسي','الرشاد'],
  'نينوى': ['الموصل','الجانب الأيمن','الجانب الأيسر','الزهور','الدواسة','المنصور','الجامعة','المثنى','النور','الشرطة','الكرامة','الانتصار','القدس','عدن','التحرير','الحدباء','بعشيقة','الحمدانية','تلكيف','تلعفر','سنجار','الحضر','القيارة','حمام العليل','برطلة','زمار'],
  'البصرة': ['مركز البصرة','العشار','الجزائر','الطويسة','القبلة','الحسين','الزبير','أبو الخصيب','القرنة','شط العرب','الهارثة','الفاو','أم قصر','سفوان','المدينة'],
  'الأنبار': ['الرمادي','الفلوجة','الحبانية','الخالدية','هيت','حديثة','القائم','عانة','راوة','الرطبة','عامرية الفلوجة','الكرمة'],
  'بابل': ['الحلة','المسيب','المحاويل','الهاشمية','القاسم','الطليعة','الإسكندرية','الكفل'],
  'كربلاء': ['مركز كربلاء','الحسينية','الحر','الجدول الغربي','الهندية','عين التمر'],
  'النجف': ['مركز النجف','الكوفة','المناذرة','المشخاب','الحيدرية','العباسية'],
  'القادسية': ['الديوانية','الشامية','عفك','الحمزة','الدغارة','السنية'],
  'ميسان': ['العمارة','علي الغربي','علي الشرقي','المجر الكبير','الكحلاء','قلعة صالح','الميمونة'],
  'ذي قار': ['الناصرية','الشطرة','الرفاعي','سوق الشيوخ','الجبايش','الغراف','النصر'],
  'واسط': ['الكوت','الحي','النعمانية','الصويرة','العزيزية','بدرة','الزبيدية'],
  'ديالى': ['بعقوبة','المقدادية','الخالص','خانقين','بلدروز','مندلي','جلولاء','قرة تبة'],
  'صلاح الدين': ['تكريت','سامراء','بيجي','الدور','بلد','طوز خورماتو','الشرقاط','الدجيل'],
  'دهوك': ['دهوك','زاخو','سميل','العمادية','عقرة','بردرش'],
  'أربيل': ['أربيل','عنكاوا','كويسنجق','شقلاوة','سوران','خبات','مخمور','رواندوز','حرير'],
  'السليمانية': ['السليمانية','حلبجة','رانية','قلعة دزة','دوكان','جمجمال','كلار','دربندخان'],
  'المثنى': ['السماوة','الرميثة','الوركاء','الخضر','السلمان'],
};

const professions = ['كهربائي','سباك','حداد','نجار','صباغ','بناء','عامل بناء','فني تكييف وتبريد','فني ألمنيوم','فني سيراميك وبلاط','عامل حدائق','تنظيف وصيانة','سائق','مقاول','مهندس','مكتب عقاري','صاحب عقار','صاحب شركة','موظف شركة','أخرى'];
const roles = ['عامل / حرفي','صاحب عقار','صاحب شركة','جهة أخرى'];

const terms = [
  ['الالتزام التام بالمواعيد','يلتزم مقدم الخدمة أو الطرف المعني بالحضور في الموعد المحدد بدقة دون أي تأخير غير مبرر. وفي حال وجود ظرف طارئ يمنع الالتزام، يجب إبلاغ الطرف الآخر والزبون قبل وقت كافٍ لتعديل الجدول.'],
  ['إنجاز العمل بالكامل وعدم التسويف','يجب إتمام العمل الموكل بالشكل الكامل والدقيق كما تم الاتفاق عليه. ويُمنع ترك العمل منتصف الطريق أو التباطؤ في التنفيذ. يحق للزبون طلب إصلاح أي نقص واضح وفق الاتفاق.'],
  ['الاحترام والسلوك المهني','الالتزام بالآداب العامة وحسن الخلق والاحترام المتبادل طوال فترة العمل، والمحافظة على خصوصية المكان، وعدم التصوير أو التدخل في أمور خارج نطاق العمل المتفق عليه.'],
  ['الوضوح في الاتفاق والأسعار','يجب توضيح نطاق العمل والمواد والأجور وأي مصاريف إضافية قبل البدء، وعدم فرض رسوم جديدة دون موافقة الطرف الآخر.'],
  ['ضمان حق مقدم الخدمة','يلتزم الزبون بتوفير ظروف آمنة ومناسبة للعمل، وعدم طلب أعمال إضافية خارج الاتفاق دون إعادة التفاوض على الأجر والمدة. كما يحق لمقدم الخدمة رفض أي عمل غير آمن أو غير قانوني، والمطالبة بأجره المتفق عليه عن العمل المنجز.'],
  ['الجزاءات وحالات إلغاء الاتفاق','يحق للزبون أو إدارة التطبيق إلغاء الاتفاق فوراً عند ثبوت سوء المعاملة أو التأخير المتكرر دون عذر أو رفض إتمام العمل بالمواصفات المتفق عليها. ويتحمل المنفذ المسؤولية عن الضرر المباشر الناتج عن إهمال مثبت. وبالمقابل، لا يتحمل مقدم الخدمة مسؤولية الأضرار الناتجة عن عيوب سابقة أو مواد وفرها الزبون إذا تم التنبيه عليها.'],
  ['حل النزاعات وحفظ الحقوق','يُفضّل توثيق أي خلاف أو تغيير في الاتفاق كتابةً داخل التطبيق، ومحاولة حله ودياً قبل اتخاذ أي إجراء آخر، مع حفظ حق كل طرف في المطالبة بحقه وفق القوانين النافذة.'],
];

const emptyForm = { role: 'عامل / حرفي', name: '', age: '', profession: '', companyType: '', province: '', area: '', phone: '', profile: '', idFront: '', idBack: '', residenceFront: '', residenceBack: '' };

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    ...options,
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const text = await response.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; } catch { data = text; }
  if (!response.ok) throw new Error(data?.message || data?.error_description || data?.hint || `HTTP ${response.status}`);
  return data;
}

function dataUrlToBlob(dataUrl) {
  const [meta, base64] = String(dataUrl).split(',');
  const mime = meta.match(/data:([^;]+);base64/)?.[1] || 'application/octet-stream';
  const binary = atob(base64 || '');
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function uploadDocument(requestId, type, dataUrl) {
  const path = `${requestId}/${type}-${Date.now()}.jpg`;
  const response = await fetch(`${SUPABASE_URL}/storage/v1/object/contract-documents/${path}`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': dataUrl.match(/data:([^;]+);base64/)?.[1] || 'image/jpeg', 'x-upsert': 'false' },
    body: dataUrlToBlob(dataUrl),
  });
  if (!response.ok) throw new Error(`فشل رفع ${type}: ${await response.text() || response.status}`);
  return path;
}

function UploadBox({ label, value, onChange }) {
  return (
    <label className="uploadBox">
      <div className="uploadIcon">＋</div>
      <div className="uploadText"><strong>{label}</strong><span>{value ? 'تم اختيار الصورة ✓' : 'اضغط لاختيار صورة واضحة'}</span></div>
      <input type="file" accept="image/*" required={!value} onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => onChange(String(reader.result)); reader.readAsDataURL(file); }} />
      {value && <img className="thumb" src={value} alt="معاينة" />}
    </label>
  );
}

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [requestCode, setRequestCode] = useState('');
  const areas = useMemo(() => form.province ? provinces[form.province] || [] : [], [form.province]);
  const update = (key, value) => setForm(old => ({ ...old, [key]: value }));

  const isWorker = form.role === 'عامل / حرفي';
  const isCompany = form.role === 'صاحب شركة';
  const professionValue = isCompany ? form.companyType : form.profession;

  const validate = () => {
    if (!form.name.trim()) return 'اكتب الاسم الثلاثي.';
    if (!form.age) return 'اختر العمر من 18 إلى 75 سنة.';
    if (!form.province || !form.area) return 'اختر المحافظة والمنطقة.';
    if (!/^07\d{9}$/.test(form.phone)) return 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 11 رقماً.';
    if (isWorker && !form.profession) return 'اختر المهنة / الاختصاص.';
    if (isCompany && !form.companyType) return 'اختر نوع الشركة.';
    if (!form.profile || !form.idFront || !form.idBack || !form.residenceFront || !form.residenceBack) return 'يرجى رفع كل الصور المطلوبة بوضوح.';
    return '';
  };

  const next = () => { const e = validate(); setError(e); if (!e) setStep(2); };

  const submitContract = async () => {
    if (submitting) return;
    setSubmitting(true); setError('');
    try {
      const id = crypto.randomUUID();
      const code = `AAM-${Date.now().toString().slice(-8)}`;
      await supabaseRequest('/rest/v1/aamil_contract_requests', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({
        id, request_code: code, full_name: form.name.trim(), age: Number(form.age), role: form.role,
        profession: isWorker ? form.profession : null, company_type: isCompany ? form.companyType : null,
        company_other: null, company_offers: null, province: form.province, area: form.area, phone: form.phone, status: 'pending'
      })});
      for (const [type, dataUrl] of [['profile',form.profile],['id-front',form.idFront],['id-back',form.idBack],['residence-front',form.residenceFront],['residence-back',form.residenceBack]]) {
        const storagePath = await uploadDocument(id, type, dataUrl);
        await supabaseRequest('/rest/v1/aamil_contract_documents', { method:'POST', headers:{Prefer:'return=minimal'}, body:JSON.stringify({request_id:id,document_type:type,storage_path:storagePath}) });
      }
      setRequestCode(code); setStep(3);
    } catch (err) { console.error(err); setError(`تعذر إرسال العقد إلى الإدارة. ${err?.message || 'حاول مرة أخرى.'}`); }
    finally { setSubmitting(false); }
  };

  const contractSvg = () => {
    const esc = s => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');
    const lines = terms.map((t,i) => `<text x="1040" y="${760+i*105}" text-anchor="end" font-size="26" font-weight="700">${i+1}. ${esc(t[0])}</text><foreignObject x="100" y="${775+i*105}" width="940" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial;direction:rtl;text-align:right;font-size:20px;line-height:1.6">${esc(t[1])}</div></foreignObject>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${900+terms.length*105}" viewBox="0 0 1200 ${900+terms.length*105}"><rect width="100%" height="100%" fill="#f7f4ec"/><rect x="35" y="35" width="1130" height="${820+terms.length*105}" rx="30" fill="#fff" stroke="#caa75d" stroke-width="4"/><text x="600" y="110" text-anchor="middle" font-size="42" font-weight="800">عقد تسجيل واعتماد</text><text x="600" y="155" text-anchor="middle" font-size="22">منصة عامل • نموذج بيانات واتفاق إلكتروني</text><text x="1040" y="220" text-anchor="end" font-size="25" font-weight="700">الاسم: ${esc(form.name)}</text><text x="1040" y="260" text-anchor="end" font-size="25">العمر: ${esc(form.age)} سنة • الصفة: ${esc(form.role)}</text><text x="1040" y="300" text-anchor="end" font-size="25">المهنة / الاختصاص: ${esc(professionValue)}</text><text x="1040" y="340" text-anchor="end" font-size="25">المحافظة: ${esc(form.province)} • المنطقة: ${esc(form.area)}</text><text x="1040" y="380" text-anchor="end" font-size="25">الهاتف: ${esc(form.phone)}</text><line x1="100" y1="420" x2="1100" y2="420" stroke="#ddd"/><text x="1040" y="470" text-anchor="end" font-size="30" font-weight="800">الشروط والضمانات</text>${lines}<text x="600" y="${820+terms.length*105}" text-anchor="middle" font-size="19">تمت الموافقة إلكترونياً • هذا النموذج للتوثيق والتنظيم.</text></svg>`;
  };
  const downloadContract = () => { const blob = new Blob([contractSvg()], {type:'image/svg+xml;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`عقد-${form.name||'عامل'}.svg`; a.click(); URL.revokeObjectURL(url); };

  return (
    <main className="page" dir="rtl">
      <section className="shell">
        <header className="hero">
          <div className="brandMark">ع</div>
          <div><h1>عامل</h1><p>نظام العقود والتسجيل الرسمي</p></div>
        </header>

        <div className="stepper" aria-label="مراحل التسجيل">
          <div className="step active"><b>1</b><span>البيانات</span></div><i/><div className={`step ${step >= 2 ? 'active' : ''}`}><b>2</b><span>الشروط</span></div><i/><div className={`step ${step >= 3 ? 'active' : ''}`}><b>3</b><span>التأكيد</span></div>
        </div>

        {step === 1 && <form className="card" onSubmit={e=>{e.preventDefault();next();}}>
          <div className="intro"><span>عقد بيانات وانضمام إلكتروني</span><h2>تسجيل بيانات المشترك</h2><p>أكمل جميع الحقول وارفع المستمسكات المطلوبة بوضوح.</p></div>
          <div className="goldLine"/>

          <section><div className="sectionHead"><b>01</b><h3>المعلومات الأساسية</h3></div>
            <div className="grid two">
              <label>الاسم الثلاثي<input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="مثال: محمد أحمد علي" /></label>
              <label>العمر<select value={form.age} onChange={e=>update('age',e.target.value)}><option value="">اختر العمر</option>{Array.from({length:58},(_,i)=>18+i).map(a=><option key={a}>{a}</option>)}</select></label>
              <label>الصفة / نوع الحساب<select value={form.role} onChange={e=>{setForm(o=>({...o,role:e.target.value,profession:'',companyType:''}));}}>{roles.map(r=><option key={r}>{r}</option>)}</select></label>
              {isWorker && <label>المهنة / الاختصاص<select value={form.profession} onChange={e=>update('profession',e.target.value)}><option value="">اختر المهنة</option>{professions.slice(0,13).map(p=><option key={p}>{p}</option>)}</select></label>}
              {isCompany && <label>نوع الشركة<select value={form.companyType} onChange={e=>update('companyType',e.target.value)}><option value="">اختر نوع الشركة</option><option>شركة كهرباء (تجهيز مواد كهربائية)</option></select></label>}
              <label>المحافظة<select value={form.province} onChange={e=>setForm(o=>({...o,province:e.target.value,area:''}))}><option value="">اختر المحافظة</option>{Object.keys(provinces).map(p=><option key={p}>{p}</option>)}</select></label>
              <label>المنطقة<select value={form.area} disabled={!form.province} onChange={e=>update('area',e.target.value)}><option value="">{form.province?'اختر المنطقة':'اختر المحافظة أولاً'}</option>{areas.map(a=><option key={a}>{a}</option>)}</select></label>
              <label>رقم الهاتف<input dir="ltr" inputMode="numeric" maxLength={11} value={form.phone} onChange={e=>update('phone',e.target.value.replace(/\D/g,'').slice(0,11))} placeholder="07XXXXXXXXX" /></label>
            </div>
          </section>

          <section><div className="sectionHead"><b>02</b><h3>المستمسكات والصورة</h3></div>
            <div className="uploads">
              <UploadBox label="الصورة الشخصية" value={form.profile} onChange={v=>update('profile',v)} />
              <UploadBox label="البطاقة الموحدة - الوجه" value={form.idFront} onChange={v=>update('idFront',v)} />
              <UploadBox label="البطاقة الموحدة - الخلف" value={form.idBack} onChange={v=>update('idBack',v)} />
              <UploadBox label="بطاقة السكن - الوجه" value={form.residenceFront} onChange={v=>update('residenceFront',v)} />
              <UploadBox label="بطاقة السكن - الخلف" value={form.residenceBack} onChange={v=>update('residenceBack',v)} />
            </div>
          </section>

          {error && <div className="error">{error}</div>}
          <button className="nextButton" type="submit">التالي — مراجعة الشروط <span>←</span></button>
        </form>}

        {step === 2 && <section className="card termsCard">
          <div className="intro"><span>مراجعة العقد</span><h2>الشروط والضمانات</h2><p>راجع البنود التالية ثم وافق للانتقال إلى العقد النهائي.</p></div><div className="goldLine"/>
          <div className="paper">{terms.map((t,i)=><article className="term" key={t[0]}><b>{i+1}</b><div><h3>{t[0]}</h3><p>{t[1]}</p></div></article>)}</div>
          <label className="check"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>قرأت جميع الشروط والضمانات وأوافق عليها، وأقر بأن البيانات المدخلة صحيحة.</span></label>
          {error && <div className="error">{error}</div>}
          <div className="actions"><button className="secondary" onClick={()=>setStep(1)}>رجوع</button><button className="nextButton" disabled={!accepted||submitting} onClick={submitContract}>{submitting?'جاري إرسال العقد...':'موافق وإظهار العقد'} <span>←</span></button></div>
        </section>}

        {step === 3 && <section className="card finalCard" id="contract">
          <div className="success">✓ تم إرسال البيانات والعقد إلى الإدارة</div>
          <div className="contractPreview">
            <div className="contractHeader"><div className="seal">ع</div><div><small>منصة عامل</small><h2>عقد تسجيل واعتماد</h2><p>بيانات المشترك والشروط والضمانات</p></div></div>
            <div className="person"><img src={form.profile} alt="الصورة الشخصية"/><div className="details"><div><b>الاسم الثلاثي</b><span>{form.name}</span></div><div><b>العمر</b><span>{form.age} سنة</span></div><div><b>الصفة</b><span>{form.role}</span></div><div><b>المهنة / الاختصاص</b><span>{professionValue || '—'}</span></div><div><b>المحافظة</b><span>{form.province}</span></div><div><b>المنطقة</b><span>{form.area}</span></div><div><b>رقم الهاتف</b><span>{form.phone}</span></div></div></div>
            <div className="docs"><div><b>البطاقة الموحدة</b><img src={form.idFront} alt="الوجه"/><img src={form.idBack} alt="الخلف"/></div><div><b>بطاقة السكن</b><img src={form.residenceFront} alt="الوجه"/><img src={form.residenceBack} alt="الخلف"/></div></div>
            <div className="termsMini"><h3>الشروط والضمانات</h3>{terms.map((t,i)=><p key={i}><b>{i+1}. {t[0]}:</b> {t[1]}</p>)}</div>
            <div className="approved">✓ تمت الموافقة الإلكترونية على الشروط من صاحب البيانات.</div>
            <div className="footerContract"><span>رقم الطلب: {requestCode || 'AAM'}</span><span>{new Date().toLocaleDateString('ar-IQ')}</span></div>
          </div>
          <div className="actions noPrint"><button className="secondary" onClick={()=>setStep(2)}>الشروط</button><button className="secondary" onClick={()=>window.print()}>طباعة / حفظ PDF</button><button className="nextButton" onClick={downloadContract}>تحميل العقد كصورة</button></div>
          <p className="note noPrint">حالة الطلب الآن: قيد المراجعة من الإدارة.</p>
        </section>}
      </section>

      <style jsx global>{`
        *{box-sizing:border-box}html,body{margin:0;padding:0}body{background:#f9fafb;color:#0f172a;font-family:Arial,Tahoma,sans-serif}.page{min-height:100vh;padding:0 16px 48px}.shell{width:min(980px,100%);margin:0 auto}.hero{background:#0f172a;color:#fff;margin:0 -16px 28px;padding:22px max(16px,calc((100vw - 948px)/2));border-radius:0 0 28px 28px;display:flex;align-items:center;gap:14px}.brandMark{width:54px;height:54px;border-radius:10px;background:#ca8a04;color:#000;display:grid;place-items:center;font-size:30px;font-weight:900}.hero h1{margin:0;font-size:27px}.hero p{margin:4px 0 0;color:#cbd5e1;font-size:13px}.stepper{display:grid;grid-template-columns:1fr 70px 1fr 70px 1fr;align-items:center;margin:0 auto 22px;max-width:650px}.step{display:flex;align-items:center;justify-content:center;gap:8px;color:#94a3b8;font-size:12px;font-weight:800}.step b{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:#fff;border:1px solid #cbd5e1}.step.active{color:#0f172a}.step.active b{background:#ca8a04;border-color:#ca8a04;color:#000}.stepper i{height:2px;background:#dbe1e7}.card{background:#fdfbf7;border:1px solid #e5e7eb;border-radius:30px;padding:30px;box-shadow:0 18px 55px rgba(15,23,42,.08)}.intro span{color:#ca8a04;font-size:13px;font-weight:900}.intro h2{margin:6px 0 5px;font-size:28px}.intro p{margin:0;color:#64748b;font-size:13px}.goldLine{height:2px;background:#ca8a04;width:100%;margin:18px 0 26px;opacity:.8}.sectionHead{display:flex;align-items:center;gap:10px;margin:0 0 15px}.sectionHead b{color:#ca8a04;font-size:13px}.sectionHead h3{margin:0;font-size:18px}.grid{display:grid;gap:15px}.grid.two{grid-template-columns:repeat(2,minmax(0,1fr))}label{display:flex;flex-direction:column;gap:7px;font-size:13px;font-weight:800;color:#334155}input,select{width:100%;border:1px solid #d7dde5;border-radius:13px;background:#fff;padding:13px 14px;color:#0f172a;outline:none}input:focus,select:focus{border-color:#ca8a04;box-shadow:0 0 0 3px rgba(202,138,4,.12)}select:disabled{background:#f1f5f9;color:#94a3b8}section+section{margin-top:28px}.uploads{display:grid;grid-template-columns:1fr 1fr;gap:12px}.uploadBox{position:relative;min-height:90px;border:1.5px dashed #cbd5e1;border-radius:16px;background:#fff;padding:13px;display:flex;align-items:center;gap:12px;cursor:pointer}.uploadBox input{position:absolute;inset:0;opacity:0;cursor:pointer}.uploadIcon{flex:0 0 44px;width:44px;height:44px;border-radius:10px;background:#0f172a;color:#ca8a04;display:grid;place-items:center;font-size:24px}.uploadText{display:flex;flex-direction:column;gap:4px;min-width:0}.uploadText strong{font-size:13px}.uploadText span{font-size:11px;color:#94a3b8;font-weight:600}.thumb{margin-right:auto;width:58px;height:58px;object-fit:cover;border-radius:9px;border:1px solid #e2e8f0}.error{margin-top:15px;background:#fff1f2;border:1px solid #fecdd3;color:#9f1239;border-radius:12px;padding:12px;font-size:12px}.nextButton,.secondary{border:0;border-radius:14px;padding:14px 20px;font-weight:900;cursor:pointer}.nextButton{background:#ca8a04;color:#0f172a;box-shadow:0 9px 20px rgba(202,138,4,.22)}.nextButton:hover{filter:brightness(1.05);transform:translateY(-1px)}.nextButton:disabled{opacity:.45;cursor:not-allowed;transform:none}.card>.nextButton{width:100%;margin-top:24px}.nextButton span{margin-right:8px}.secondary{background:#e2e8f0;color:#334155}.paper{background:#fff;border:1px solid #eadfc7;border-radius:18px;padding:20px;max-height:560px;overflow:auto}.term{display:flex;gap:12px;padding:15px 0;border-bottom:1px dashed #e5dcc8}.term:last-child{border-bottom:0}.term>b{flex:0 0 32px;width:32px;height:32px;border-radius:9px;background:#f4e7c4;color:#7c5a12;display:grid;place-items:center}.term h3{margin:0 0 5px;font-size:14px}.term p{margin:0;color:#64748b;font-size:12px;line-height:1.8}.check{flex-direction:row;align-items:center;margin-top:16px;padding:13px;background:#fff;border:1px solid #e2e8f0;border-radius:13px}.check input{width:18px;height:18px;accent-color:#ca8a04}.check span{font-size:12px}.actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:20px}.success{display:inline-block;background:#ecfdf3;color:#166534;border:1px solid #bbf7d0;border-radius:999px;padding:8px 13px;font-size:12px;font-weight:900;margin-bottom:15px}.contractPreview{background:#fffdf8;border:2px solid #d8b86b;border-radius:18px;padding:22px;box-shadow:inset 0 0 0 6px #fff8e8}.contractHeader{display:flex;gap:13px;align-items:center;border-bottom:1px solid #eadfc7;padding-bottom:15px}.seal{width:52px;height:52px;border-radius:13px;background:#0f172a;color:#ca8a04;display:grid;place-items:center;font-size:28px;font-weight:900}.contractHeader small{color:#a67a22;font-weight:900}.contractHeader h2{margin:3px 0;font-size:23px}.contractHeader p{margin:0;color:#64748b;font-size:11px}.person{display:flex;gap:16px;padding:18px 0;border-bottom:1px solid #eee7d8}.person>img{width:110px;height:130px;object-fit:cover;border-radius:12px;border:1px solid #ddd2ba}.details{flex:1;display:grid;grid-template-columns:repeat(2,1fr);gap:9px}.details div{background:#faf8f1;padding:9px;border-radius:9px}.details b{display:block;color:#a67a22;font-size:9px;margin-bottom:3px}.details span{font-size:12px;font-weight:800}.docs{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:18px 0}.docs>div{background:#faf8f1;border-radius:12px;padding:10px}.docs b{display:block;color:#7c5a12;font-size:11px;margin-bottom:8px}.docs img{width:calc(50% - 5px);height:100px;object-fit:cover;border-radius:8px}.docs img+img{margin-right:10px}.termsMini{border-top:1px solid #eee7d8;padding-top:15px}.termsMini h3{margin:0 0 9px;font-size:15px}.termsMini p{font-size:10px;line-height:1.7;color:#64748b;margin:6px 0}.approved{margin-top:14px;padding:10px;border-radius:10px;background:#ecfdf3;color:#166534;font-size:11px;font-weight:800}.footerContract{display:flex;justify-content:space-between;margin-top:12px;color:#94a3b8;font-size:9px}.note{text-align:center;color:#94a3b8;font-size:11px}.noPrint{}@media(max-width:700px){.page{padding:0 10px 35px}.hero{margin:0 -10px 20px;padding:18px 14px;border-radius:0 0 22px 22px}.hero h1{font-size:23px}.hero p{font-size:11px}.stepper{grid-template-columns:1fr 30px 1fr 30px 1fr}.step span{display:none}.card{padding:18px;border-radius:22px}.intro h2{font-size:23px}.grid.two,.uploads{grid-template-columns:1fr}.uploadBox{min-height:84px}.details{grid-template-columns:1fr}.person{align-items:flex-start}.person>img{width:82px;height:105px}.docs{grid-template-columns:1fr}.actions .nextButton,.actions .secondary{flex:1}.paper{max-height:500px}}@media print{body{background:#fff}.hero,.stepper,.noPrint{display:none!important}.page{padding:0}.shell{width:100%}.card{box-shadow:none;border:0;padding:0}.contractPreview{border:0;box-shadow:none}}
      `}</style>
    </main>
  );
}
