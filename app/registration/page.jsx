'use client';

import { useMemo, useState } from 'react';

const provinces = {
  'بغداد': ['الكرخ','الرصافة','الأعظمية','الكاظمية','المنصور','العامرية','الدورة','السيدية','البياع','حي الجامعة','الغزالية','الشعلة','الشعب','مدينة الصدر','البلديات','زيونة','بغداد الجديدة','الزعفرانية','الكرادة','الجادرية','المدائن','أبو غريب','المحمودية'],
  'كركوك': ['مركز كركوك','رحيم آوه','المصلى','تسعين','واسطي','الواسطي الجديدة','الحي العسكري','الحي الصناعي','القادسية','المنطقة الخضراء','شوراو','العمل الشعبي','عرفة','الواسطية','الإسكان','الفيصلية','الماس','بنجة علي','ساحة الاحتفالات','حي النداء','حي النصر','حي الواسطي','الملتقى','دوميز','الزهراء','الحرية','التأميم','حي الربيع','حي اليرموك','حي العسكري','التون كوبري','الدبس','الحويجة','الزاب','الرياض','العباسي','الرشاد'],
  'نينوى': ['الموصل','الجانب الأيمن','الجانب الأيسر','الزهور','الدواسة','المنصور','الجامعة','المثنى','النور','الشرطة','الكرامة','الانتصار','القدس','عدن','التحرير','الحدباء','بعشيقة','الحمدانية','تلكيف','تلعفر','سنجار','الحضر','القيارة','حمام العليل','برطلة','زمار'],
  'البصرة': ['مركز البصرة','العشار','الجزائر','الطويسة','القبلة','الحسين','الزبير','أبو الخصيب','القرنة','شط العرب','الهارثة','الفاو','أم قصر','سفوان','المدينة'],
  'الأنبار': ['الرمادي','الفلوجة','الحبانية','الخالدية','هيت','حديثة','القائم','عانة','راوة','الرطبة','عامرية الفلوجة','الكرمة','الرطبة'],
  'بابل': ['الحلة','المسيب','المحاويل','الهاشمية','القاسم','الطليعة','الإسكندرية','الكفل'],
  'كربلاء': ['مركز كربلاء','الحسينية','الحر','الجدول الغربي','الهندية','عين التمر'],
  'النجف': ['مركز النجف','الكوفة','المناذرة','المشخاب','الحيدرية','العباسية'],
  'القادسية': ['الديوانية','الشامية','عفك','الحمزة','الدغارة','السنية'],
  'ميسان': ['العمارة','علي الغربي','علي الشرقي','المجر الكبير','الكحلاء','قلعة صالح','الميمونة'],
  'ذي قار': ['الناصرية','الشطرة','الرفاعي','سوق الشيوخ','الجبايش','الچبايش','الغراف','النصر'],
  'واسط': ['الكوت','الحي','النعمانية','الصويرة','العزيزية','بدرة','الزبيدية'],
  'ديالى': ['بعقوبة','المقدادية','الخالص','خانقين','بلدروز','مندلي','جلولاء','قرة تبة'],
  'صلاح الدين': ['تكريت','سامراء','بيجي','الدور','بلد','طوز خورماتو','الشرقاط','الدجيل'],
  'دهوك': ['دهوك','زاخو','سميل','العمادية','عقرة','بردرش'],
  'أربيل': ['أربيل','عنكاوا','كويسنجق','شقلاوة','سوران','خبات','مخمور','رواندوز','حرير'],
  'السليمانية': ['السليمانية','حلبجة','رانية','قلعة دزة','دوكان','جمجمال','كلار','دربندخان'],
  'المثنى': ['السماوة','الرميثة','الوركاء','الخضر','السلمان'],
};

const professions = ['كهربائي','سباك','حداد','نجار','صباغ','بناء','عامل بناء','فني تكييف وتبريد','فني ألمنيوم','فني سيراميك وبلاط','عامل حدائق','تنظيف وصيانة','سائق','مقاول','مهندس','مكتب عقاري','صاحب عقار','صاحب شركة','موظف شركة','أخرى'];

const terms = [
  ['الالتزام التام بالمواعيد','يلتزم مقدم الخدمة أو الطرف المعني بالحضور في الموعد المحدد بدقة دون أي تأخير غير مبرر. وفي حال وجود ظرف طارئ يمنع الالتزام، يجب إبلاغ الطرف الآخر والزبون قبل وقت كافٍ لتعديل الجدول.'],
  ['إنجاز العمل بالكامل وعدم التسويف','يجب إتمام العمل الموكل بالشكل الكامل والدقيق كما تم الاتفاق عليه. ويُمنع ترك العمل منتصف الطريق أو التباطؤ في التنفيذ. يحق للزبون طلب إصلاح أي نقص واضح وفق الاتفاق.'],
  ['الاحترام والسلوك المهني','الالتزام بالآداب العامة وحسن الخلق والاحترام المتبادل طوال فترة العمل، والمحافظة على خصوصية المكان، وعدم التصوير أو التدخل في أمور خارج نطاق العمل المتفق عليه.'],
  ['الوضوح في الاتفاق والأسعار','يجب توضيح نطاق العمل والمواد والأجور وأي مصاريف إضافية قبل البدء، وعدم فرض رسوم جديدة دون موافقة الطرف الآخر.'],
  ['ضمان حق مقدم الخدمة','يلتزم الزبون بتوفير ظروف آمنة ومناسبة للعمل، وعدم طلب أعمال إضافية خارج الاتفاق دون إعادة التفاوض على الأجر والمدة. كما يحق لمقدم الخدمة رفض أي عمل غير آمن أو غير قانوني، والمطالبة بأجره المتفق عليه عن العمل المنجز.'],
  ['الجزاءات وحالات إلغاء الاتفاق','يحق للزبون أو إدارة التطبيق إلغاء الاتفاق فوراً عند ثبوت سوء المعاملة أو التأخير المتكرر دون عذر أو رفض إتمام العمل بالمواصفات المتفق عليها. ويتحمل المنفذ المسؤولية عن الضرر المباشر الناتج عن إهمال مثبت. وبالمقابل، لا يتحمل مقدم الخدمة مسؤولية الأضرار الناتجة عن عيوب سابقة أو مواد وفرها الزبون إذا تم التنبيه عليها.'],
  ['حل النزاعات وحفظ الحقوق','يُفضّل توثيق أي خلاف أو تغيير في الاتفاق كتابةً داخل التطبيق، ومحاولة حله ودياً قبل اتخاذ أي إجراء آخر، مع حفظ حق كل طرف في المطالبة بحقه وفق القوانين النافذة.'],
];

const emptyForm = { role: 'عامل', name: '', age: '', profession: '', province: '', area: '', phone: '', profile: '', idFront: '', idBack: '', residenceFront: '', residenceBack: '' };

function UploadBox({ label, value, onChange, required = true }) {
  return (
    <label className="uploadBox">
      <div className="uploadIcon">⇧</div>
      <div className="uploadText"><strong>{label}</strong><span>{value ? 'تم اختيار الصورة ✓' : 'اضغط لاختيار صورة واضحة'}</span></div>
      <input type="file" accept="image/*" required={required && !value} onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => onChange(String(reader.result));
        reader.readAsDataURL(file);
      }} />
      {value && <img className="thumb" src={value} alt="preview" />}
    </label>
  );
}

export default function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(emptyForm);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const areas = useMemo(() => form.province ? provinces[form.province] || [] : [], [form.province]);

  const update = (key, value) => setForm((old) => ({ ...old, [key]: value }));

  const validate = () => {
    if (!form.name.trim()) return 'اكتب الاسم الثلاثي.';
    if (!form.age) return 'اختر العمر من 18 إلى 75 سنة.';
    if (!form.profession) return 'اختر المهنة أو الصفة.';
    if (!form.province || !form.area) return 'اختر المحافظة والمنطقة.';
    if (!/^07\d{9}$/.test(form.phone)) return 'رقم الهاتف يجب أن يبدأ بـ 07 ويتكون من 11 رقماً.';
    if (!form.profile || !form.idFront || !form.idBack || !form.residenceFront || !form.residenceBack) return 'يرجى رفع كل الصور المطلوبة بوضوح.';
    return '';
  };

  const next = () => {
    const e = validate();
    setError(e);
    if (!e) setStep(2);
  };

  const contractSvg = () => {
    const esc = (s) => String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const lines = terms.map((t, i) => `<text x="1040" y="${760 + i*105}" text-anchor="end" font-size="26" font-weight="700">${i+1}. ${esc(t[0])}</text><foreignObject x="100" y="${775 + i*105}" width="940" height="80"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial;direction:rtl;text-align:right;font-size:20px;line-height:1.6">${esc(t[1])}</div></foreignObject>`).join('');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${900 + terms.length*105}" viewBox="0 0 1200 ${900 + terms.length*105}"><rect width="100%" height="100%" fill="#f7f4ec"/><rect x="35" y="35" width="1130" height="${820 + terms.length*105}" rx="30" fill="#fff" stroke="#caa75d" stroke-width="4"/><text x="600" y="110" text-anchor="middle" font-size="42" font-weight="800">عقد تسجيل واعتماد</text><text x="600" y="155" text-anchor="middle" font-size="22">منصة عامل • نموذج بيانات واتفاق إلكتروني</text><text x="1040" y="220" text-anchor="end" font-size="25" font-weight="700">الاسم: ${esc(form.name)}</text><text x="1040" y="260" text-anchor="end" font-size="25">العمر: ${esc(form.age)} سنة • الصفة: ${esc(form.role)}</text><text x="1040" y="300" text-anchor="end" font-size="25">المهنة: ${esc(form.profession)}</text><text x="1040" y="340" text-anchor="end" font-size="25">المحافظة: ${esc(form.province)} • المنطقة: ${esc(form.area)}</text><text x="1040" y="380" text-anchor="end" font-size="25">الهاتف: ${esc(form.phone)}</text><line x1="100" y1="420" x2="1100" y2="420" stroke="#ddd"/><text x="1040" y="470" text-anchor="end" font-size="30" font-weight="800">الشروط والضمانات</text>${lines}<text x="600" y="${820 + terms.length*105}" text-anchor="middle" font-size="19">تمت الموافقة إلكترونياً • هذا النموذج للتوثيق والتنظيم ولا يغني عن أي متطلبات قانونية خاصة.</text></svg>`;
  };

  const downloadContract = () => {
    const blob = new Blob([contractSvg()], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `عقد-${form.name || 'عامل'}.svg`; a.click(); URL.revokeObjectURL(url);
  };

  const printContract = () => window.print();

  return (
    <main className="page">
      <div className="ambient one"/><div className="ambient two"/>
      <section className="shell">
        <header className="hero">
          <div className="brandMark">ع</div>
          <div><p className="eyebrow">عامل • نظام التوثيق</p><h1>تسجيل البيانات والعقد</h1><p>نموذج عصري ومرتب لتسجيل العمال وأصحاب العقارات والشركات والجهات المهنية.</p></div>
        </header>

        <div className="progress"><div className={step >= 1 ? 'active' : ''}><b>01</b><span>البيانات والوثائق</span></div><i/><div className={step >= 2 ? 'active' : ''}><b>02</b><span>الشروط</span></div><i/><div className={step >= 3 ? 'active' : ''}><b>03</b><span>العقد النهائي</span></div></div>

        {step === 1 && <form className="card" onSubmit={(e)=>{e.preventDefault();next();}}>
          <div className="cardHead"><div><span className="mini">الخطوة الأولى</span><h2>معلومات صاحب الطلب</h2></div><span className="secure">خصوصية • توثيق</span></div>
          <div className="roleGrid">{['عامل','صاحب عقار','صاحب شركة','جهة أخرى'].map(r => <button type="button" key={r} className={form.role===r?'role activeRole':'role'} onClick={()=>update('role',r)}>{r}</button>)}</div>
          <div className="grid two"><label>الاسم الثلاثي<input value={form.name} onChange={e=>update('name',e.target.value)} placeholder="مثال: محمد أحمد علي"/></label><label>العمر<select value={form.age} onChange={e=>update('age',e.target.value)}><option value="">اختر العمر</option>{Array.from({length:58},(_,i)=>18+i).map(a=><option key={a}>{a}</option>)}</select></label></div>
          <UploadBox label="الصورة الشخصية" value={form.profile} onChange={v=>update('profile',v)} />
          <div className="sectionTitle">البطاقة الوطنية الموحدة</div>
          <div className="grid two"><UploadBox label="وجه البطاقة الموحدة" value={form.idFront} onChange={v=>update('idFront',v)} /><UploadBox label="خلف البطاقة الموحدة" value={form.idBack} onChange={v=>update('idBack',v)} /></div>
          <div className="sectionTitle">بطاقة السكن</div>
          <div className="grid two"><UploadBox label="وجه بطاقة السكن" value={form.residenceFront} onChange={v=>update('residenceFront',v)} /><UploadBox label="خلف بطاقة السكن" value={form.residenceBack} onChange={v=>update('residenceBack',v)} /></div>
          <div className="grid two"><label>المهنة / الصفة<select value={form.profession} onChange={e=>update('profession',e.target.value)}><option value="">اختر المهنة</option>{professions.map(p=><option key={p}>{p}</option>)}</select></label><label>المحافظة<select value={form.province} onChange={e=>setForm(o=>({...o,province:e.target.value,area:''}))}><option value="">اختر المحافظة</option>{Object.keys(provinces).map(p=><option key={p}>{p}</option>)}</select></label></div>
          <div className="grid two"><label>المنطقة<select value={form.area} disabled={!form.province} onChange={e=>update('area',e.target.value)}><option value="">{form.province?'اختر المنطقة':'اختر المحافظة أولاً'}</option>{areas.map(a=><option key={a}>{a}</option>)}</select></label><label>رقم الهاتف<input inputMode="numeric" maxLength={11} value={form.phone} onChange={e=>update('phone',e.target.value.replace(/\D/g,'').slice(0,11))} placeholder="07XXXXXXXXX"/><small>أرقام فقط • يبدأ بـ 07</small></label></div>
          {error && <div className="error">{error}</div>}
          <button className="primary" type="submit">التالي <span>←</span></button>
        </form>}

        {step === 2 && <section className="card termsCard">
          <div className="cardHead"><div><span className="mini">الخطوة الثانية</span><h2>الشروط والضمانات</h2></div><span className="contractTag">مسودة اتفاق</span></div>
          <div className="paper"><div className="paperTop"><span>عقد تسجيل واعتماد</span><small>منصة عامل</small></div>{terms.map((t,i)=><article className="term" key={t[0]}><div className="num">{i+1}</div><div><h3>{t[0]}</h3><p>{t[1]}</p></div></article>)}</div>
          <label className="check"><input type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)}/><span>قرأت جميع الشروط والضمانات وأوافق عليها، وأقر بأن البيانات المدخلة صحيحة.</span></label>
          <div className="actions"><button className="secondary" onClick={()=>setStep(1)}>رجوع</button><button className="primary" disabled={!accepted} onClick={()=>setStep(3)}>موافق وإظهار العقد <span>←</span></button></div>
        </section>}

        {step === 3 && <section className="card finalCard" id="contract">
          <div className="finalRibbon">✓ تم التوثيق</div>
          <div className="contractPreview">
            <div className="contractHeader"><div className="seal">ع</div><div><span>منصة عامل</span><h2>عقد تسجيل واعتماد</h2><p>بيانات الطرف المسجل والشروط والضمانات</p></div></div>
            <div className="person"><img src={form.profile} alt="الصورة الشخصية"/><div className="details"><div><b>الاسم الثلاثي</b><span>{form.name}</span></div><div><b>العمر</b><span>{form.age} سنة</span></div><div><b>الصفة</b><span>{form.role}</span></div><div><b>المهنة</b><span>{form.profession}</span></div><div><b>المحافظة</b><span>{form.province}</span></div><div><b>المنطقة</b><span>{form.area}</span></div><div><b>رقم الهاتف</b><span>{form.phone}</span></div></div></div>
            <div className="docs"><div><b>البطاقة الموحدة</b><img src={form.idFront}/><img src={form.idBack}/></div><div><b>بطاقة السكن</b><img src={form.residenceFront}/><img src={form.residenceBack}/></div></div>
            <div className="termsMini"><h3>الشروط والضمانات</h3>{terms.map((t,i)=><p key={i}><b>{i+1}. {t[0]}:</b> {t[1]}</p>)}</div>
            <div className="approved"><span>✓</span> تمت الموافقة الإلكترونية على الشروط من صاحب البيانات.</div>
            <div className="footerContract"><span>رقم نموذج: AAM-{Date.now().toString().slice(-8)}</span><span>{new Date().toLocaleDateString('ar-IQ')}</span></div>
          </div>
          <div className="actions noPrint"><button className="secondary" onClick={()=>setStep(2)}>الشروط</button><button className="secondary" onClick={printContract}>طباعة / حفظ PDF</button><button className="primary" onClick={downloadContract}>تحميل العقد كصورة</button></div>
          <p className="note noPrint">ملاحظة: رفع المستندات هنا يعرضها داخل النموذج فقط. لربط الحفظ الدائم والتخزين الآمن للوثائق، يجب إضافة قاعدة بيانات وتخزين خاص مع صلاحيات وصول.</p>
        </section>}
      </section>
      <style jsx global>{`
        *{box-sizing:border-box}body{margin:0;background:#f2f5f8;color:#122033;font-family:Arial,Tahoma,sans-serif}button,input,select{font:inherit}.page{direction:rtl;min-height:100vh;padding:40px 18px;position:relative;overflow:hidden}.ambient{position:absolute;border-radius:50%;filter:blur(2px);opacity:.45;pointer-events:none}.ambient.one{width:420px;height:420px;background:#dcebf0;top:-180px;right:-120px}.ambient.two{width:340px;height:340px;background:#efe3c5;bottom:-140px;left:-100px}.shell{width:min(1050px,100%);margin:auto;position:relative}.hero{display:flex;gap:18px;align-items:center;margin-bottom:24px}.brandMark{width:62px;height:62px;border-radius:20px;background:#071b31;color:#d8b56b;display:grid;place-items:center;font-size:35px;font-weight:900;box-shadow:0 16px 35px #071b3126}.eyebrow,.mini{color:#9b7b39;font-weight:800;font-size:13px;margin:0 0 5px}.hero h1{margin:0;font-size:31px}.hero p:last-child{margin:7px 0 0;color:#667386}.progress{display:grid;grid-template-columns:1fr 90px 1fr 90px 1fr;align-items:center;margin-bottom:18px}.progress>div{display:flex;align-items:center;gap:9px;color:#8793a3;font-size:13px;font-weight:700}.progress b{width:35px;height:35px;border-radius:50%;display:grid;place-items:center;background:#e6ebf0}.progress .active{color:#13243a}.progress .active b{background:#d9b96f;color:#071b31}.progress i{height:2px;background:#dfe5eb}.card{background:#fff;border:1px solid #e4e9ee;border-radius:26px;padding:28px;box-shadow:0 18px 50px #13243a0c}.cardHead{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin-bottom:22px}.cardHead h2{margin:0;font-size:25px}.secure,.contractTag{background:#f4f7f8;border:1px solid #e1e7ea;border-radius:999px;padding:8px 12px;font-size:12px;color:#647180}.roleGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}.role{border:1px solid #dce3e8;background:#f8fafb;border-radius:14px;padding:13px;cursor:pointer;color:#455466}.activeRole{border-color:#d0ac5e;background:#fff8e9;color:#725719;font-weight:800}.grid{display:grid;gap:14px}.grid.two{grid-template-columns:repeat(2,1fr)}label{display:flex;flex-direction:column;gap:7px;font-weight:700;font-size:14px;color:#344457}input,select{border:1px solid #d9e0e7;border-radius:13px;padding:13px 14px;background:#fff;outline:none;color:#1a2a3b}input:focus,select:focus{border-color:#b79552;box-shadow:0 0 0 3px #d5b66a20}small{font-size:11px;color:#8995a2;font-weight:500}.uploadBox{position:relative;min-height:92px;border:1.5px dashed #cbd5df;border-radius:16px;padding:13px 14px;display:flex;align-items:center;gap:12px;background:#fbfcfd;cursor:pointer;margin:12px 0}.uploadBox input{position:absolute;inset:0;opacity:0;cursor:pointer}.uploadIcon{width:44px;height:44px;border-radius:13px;background:#071b31;color:#e0be70;display:grid;place-items:center;font-size:22px}.uploadText{display:flex;flex-direction:column;gap:4px}.uploadText span{font-size:12px;color:#84909d;font-weight:500}.thumb{width:64px;height:64px;object-fit:cover;border-radius:11px;margin-right:auto;border:1px solid #ddd}.sectionTitle{font-size:16px;font-weight:900;border-right:4px solid #d1ae61;padding-right:9px;margin:22px 0 5px}.grid.two>.uploadBox{margin:0}.primary,.secondary{border:0;border-radius:14px;padding:14px 20px;cursor:pointer;font-weight:800}.primary{background:#071b31;color:#fff;box-shadow:0 10px 25px #071b3120}.primary:hover{transform:translateY(-1px)}.primary:disabled{opacity:.4;cursor:not-allowed}.secondary{background:#eef2f5;color:#344457}.primary span{margin-right:10px}.card>.primary{display:block;margin:24px auto 0;min-width:210px}.error{margin-top:14px;background:#fff1f1;color:#a43c3c;border:1px solid #f0caca;padding:12px 14px;border-radius:12px;font-size:13px}.paper{background:#faf8f1;border:1px solid #e6dcc5;border-radius:18px;padding:22px;max-height:580px;overflow:auto}.paperTop{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #dfd5bd;padding-bottom:15px;margin-bottom:12px;color:#725719;font-weight:900}.paperTop small{color:#a1844d}.term{display:flex;gap:12px;padding:16px 0;border-bottom:1px dashed #ddd1b7}.term:last-child{border:0}.num{flex:0 0 34px;height:34px;border-radius:10px;background:#e8d19b;color:#604816;display:grid;place-items:center;font-weight:900}.term h3{margin:0 0 5px;font-size:15px}.term p{margin:0;line-height:1.8;color:#5f6976;font-size:13px}.check{flex-direction:row;align-items:center;margin-top:18px;background:#f6f9fa;border:1px solid #e1e7eb;padding:13px;border-radius:13px}.check input{accent-color:#071b31;width:18px;height:18px}.check span{font-size:13px}.actions{display:flex;justify-content:center;gap:10px;margin-top:20px;flex-wrap:wrap}.finalCard{position:relative}.finalRibbon{display:inline-block;background:#e9f7ef;color:#237346;border:1px solid #c8ead5;border-radius:999px;padding:7px 12px;font-size:12px;font-weight:800;margin-bottom:14px}.contractPreview{background:#fffdf8;border:2px solid #d7b66e;border-radius:18px;padding:24px;box-shadow:inset 0 0 0 8px #fff8e8}.contractHeader{display:flex;gap:14px;align-items:center;border-bottom:2px solid #eee3ca;padding-bottom:18px}.seal{width:58px;height:58px;border-radius:18px;background:#071b31;color:#d9b66b;display:grid;place-items:center;font-size:30px;font-weight:900}.contractHeader span{font-size:12px;color:#987a3e;font-weight:800}.contractHeader h2{margin:2px 0;font-size:25px}.contractHeader p{margin:0;color:#7a8490;font-size:12px}.person{display:flex;gap:18px;padding:20px 0;border-bottom:1px solid #ece7dc}.person>img{width:120px;height:140px;border-radius:14px;object-fit:cover;border:1px solid #d9cfba}.details{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;flex:1}.details div{background:#faf8f1;padding:10px;border-radius:10px}.details b,.details span{display:block}.details b{font-size:10px;color:#9a7c42;margin-bottom:4px}.details span{font-size:13px;font-weight:800}.docs{display:grid;grid-template-columns:1fr 1fr;gap:15px;padding:20px 0}.docs>div{background:#faf8f1;border-radius:13px;padding:12px}.docs b{display:block;margin-bottom:9px;color:#715a2e}.docs img{width:calc(50% - 5px);height:105px;object-fit:cover;border-radius:9px;border:1px solid #d9cfba}.docs img+img{margin-right:10px}.termsMini{border-top:1px solid #ece7dc;padding-top:16px}.termsMini h3{font-size:17px;margin:0 0 10px}.termsMini p{font-size:11px;line-height:1.75;color:#5d6671;margin:7px 0}.approved{margin-top:15px;background:#edf8f1;color:#256b42;border:1px solid #cde8d6;border-radius:11px;padding:11px;font-size:12px;font-weight:800}.approved span{margin-left:7px}.footerContract{display:flex;justify-content:space-between;color:#8b8d8b;font-size:10px;margin-top:14px}.note{font-size:11px;color:#87919d;text-align:center;line-height:1.7;margin:15px auto 0;max-width:750px}
        @media(max-width:700px){.page{padding:22px 10px}.hero h1{font-size:24px}.hero p:last-child{font-size:12px}.roleGrid{grid-template-columns:repeat(2,1fr)}.grid.two{grid-template-columns:1fr}.progress{grid-template-columns:1fr 20px 1fr 20px 1fr}.progress>div span{display:none}.progress>div{justify-content:center}.card{padding:18px;border-radius:20px}.cardHead{align-items:flex-start}.secure{display:none}.person{align-items:flex-start}.person>img{width:88px;height:110px}.details{grid-template-columns:1fr}.docs{grid-template-columns:1fr}.contractPreview{padding:14px;box-shadow:inset 0 0 0 4px #fff8e8}.actions .primary,.actions .secondary{flex:1}.paper{max-height:500px}}
        @media print{body{background:#fff}.page{padding:0}.ambient,.hero,.progress,.noPrint{display:none!important}.shell{width:100%}.card{box-shadow:none;border:0;padding:0}.contractPreview{border:0;box-shadow:none}.finalCard{padding:0}.finalRibbon{display:none}}
      `}</style>
    </main>
  );
}
