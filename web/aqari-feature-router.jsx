(() => {
  'use strict';

  const FEATURES = {
    purchase: {icon:'🏠', title:'محاكي شراء العقار', sub:'اعرف شنو تگدر تشتري ضمن ميزانيتك'},
    build: {icon:'🧱', title:'حاسبة بناء العقار', sub:'قدّر تكلفة البناء قبل ما تبدأ'},
    handover: {icon:'🔑', title:'تسليم العقار', sub:'قائمة فحص مرتبة لاستلام العقار'},
    dark: {icon:'🌙', title:'الوضع الليلي', sub:'غيّر مظهر عقاري واحفظ اختيارك'},
    exchange: {icon:'🤝', title:'مبادلة العقارات', sub:'اعرض عقارك للمبادلة بالتفاصيل الكاملة'},
    investment: {icon:'📈', title:'الاستثمار العقاري', sub:'احسب العائد السنوي وشوف جدوى الاستثمار'},
    daily: {icon:'⭐', title:'عقار اليوم', sub:'فرصة مميزة مختارة لهذا اليوم'}
  };

  const getProps = () => Array.isArray(window.__AQARI_PROPS__) ? window.__AQARI_PROPS__ : [];
  const money = n => new Intl.NumberFormat('ar-IQ').format(Math.round(Number(n)||0)) + ' د.ع';
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));

  const css = `
  #aqFeatureBar{direction:rtl;margin:22px 0 90px;padding:0 2px}
  #aqFeatureBar .aq-title{display:flex;align-items:end;justify-content:space-between;margin-bottom:12px}
  #aqFeatureBar h2{margin:0;font-size:21px;color:#071d35}
  #aqFeatureBar .aq-title span{font-size:12px;color:#708096}
  #aqFeatureGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}
  .aq-feature-btn{border:1px solid #dfe6ee;background:linear-gradient(145deg,#fff,#f5f8fb);border-radius:20px;padding:15px;text-align:right;min-height:116px;cursor:pointer;box-shadow:0 8px 22px rgba(7,29,53,.07);transition:.18s;position:relative;overflow:hidden}
  .aq-feature-btn:active{transform:scale(.98)}
  .aq-feature-btn .ico{width:44px;height:44px;border-radius:14px;display:grid;place-items:center;background:#071d35;color:#fff;font-size:23px;margin-bottom:9px;box-shadow:0 5px 15px rgba(7,29,53,.18)}
  .aq-feature-btn strong{display:block;color:#071d35;font-size:14px;margin-bottom:4px}
  .aq-feature-btn small{display:block;color:#718096;font-size:11px;line-height:1.55}
  #aqFeatureLayer{position:fixed;inset:0;z-index:2147483000;display:none;background:rgba(3,14,27,.72);backdrop-filter:blur(8px);padding:14px}
  #aqFeatureLayer.on{display:flex;align-items:flex-end;justify-content:center}
  #aqFeatureWindow{width:min(620px,100%);max-height:92vh;overflow:auto;background:#f7f9fc;border-radius:28px 28px 18px 18px;box-shadow:0 30px 90px rgba(0,0,0,.38);animation:aqIn .2s ease}
  @keyframes aqIn{from{transform:translateY(25px);opacity:.2}to{transform:none;opacity:1}}
  .aq-head{position:sticky;top:0;z-index:2;background:linear-gradient(135deg,#071d35,#0b3150);color:#fff;padding:18px 18px 16px;display:flex;align-items:center;gap:12px}
  .aq-head .aq-bigico{width:50px;height:50px;border-radius:16px;display:grid;place-items:center;background:#d8ad3d;color:#071d35;font-size:26px}
  .aq-head h2{margin:0;font-size:19px}.aq-head p{margin:4px 0 0;color:#c8d7e6;font-size:11px}.aq-close{margin-right:auto;border:0;background:rgba(255,255,255,.12);color:#fff;border-radius:12px;width:40px;height:40px;font-size:22px;cursor:pointer}
  .aq-body{padding:18px}.aq-card{background:#fff;border:1px solid #e1e8f0;border-radius:20px;padding:15px;margin-bottom:12px}.aq-card h3{margin:0 0 10px;color:#071d35;font-size:15px}.aq-note{background:#eef8f7;border-right:4px solid #13a6a1;padding:11px;border-radius:12px;color:#24434a;font-size:12px;line-height:1.7}
  .aq-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.aq-field{display:flex;flex-direction:column;gap:6px}.aq-field.full{grid-column:1/-1}.aq-field label{font-size:11px;color:#64748b}.aq-field input,.aq-field select,.aq-field textarea{width:100%;border:1px solid #d8e1eb;background:#fbfcfe;border-radius:12px;padding:12px;font:inherit;font-size:13px;outline:none}.aq-field textarea{min-height:85px;resize:vertical}.aq-field input:focus,.aq-field select:focus,.aq-field textarea:focus{border-color:#13a6a1;box-shadow:0 0 0 3px rgba(19,166,161,.1)}
  .aq-primary{width:100%;border:0;border-radius:14px;padding:13px;background:#071d35;color:#fff;font:inherit;font-weight:700;cursor:pointer}.aq-primary.gold{background:#d8ad3d;color:#071d35}.aq-secondary{border:1px solid #d7e0ea;background:#fff;color:#071d35;border-radius:12px;padding:10px 12px;font:inherit;cursor:pointer}.aq-result{margin-top:12px;padding:13px;border-radius:15px;background:#071d35;color:#fff;line-height:1.8;font-size:13px}.aq-property{display:grid;grid-template-columns:86px 1fr;gap:12px;align-items:center}.aq-property img{width:86px;height:72px;object-fit:cover;border-radius:13px}.aq-property h4{margin:0 0 4px;color:#071d35;font-size:14px}.aq-property p{margin:0;color:#64748b;font-size:11px;line-height:1.6}.aq-list{display:grid;gap:9px}.aq-check{display:flex;align-items:center;gap:9px;padding:10px;border:1px solid #e4eaf0;border-radius:12px;background:#fff;font-size:12px}.aq-check input{width:18px;height:18px;accent-color:#13a6a1}
  .aq-dark-preview{border-radius:18px;background:#071d35;color:#fff;padding:17px}.aq-dark-preview b{color:#d8ad3d}
  @media(max-width:430px){#aqFeatureGrid{grid-template-columns:1fr 1fr}.aq-grid{grid-template-columns:1fr 1fr}.aq-body{padding:14px}}
  `;

  function injectStyle(){if(document.getElementById('aq-feature-style'))return;const s=document.createElement('style');s.id='aq-feature-style';s.textContent=css;document.head.appendChild(s)}

  function closeFeature(){const layer=document.getElementById('aqFeatureLayer');if(layer){layer.classList.remove('on');setTimeout(()=>{if(!layer.classList.contains('on'))layer.style.display='none'},180)}}

  function shell(f, body){
    const layer=document.getElementById('aqFeatureLayer');
    layer.style.display='flex';
    requestAnimationFrame(()=>layer.classList.add('on'));
    document.getElementById('aqFeatureWindow').innerHTML=`<div class="aq-head"><div class="aq-bigico">${f.icon}</div><div><h2>${f.title}</h2><p>${f.sub}</p></div><button class="aq-close" id="aqClose" aria-label="إغلاق">×</button></div><div class="aq-body">${body}</div>`;
    document.getElementById('aqClose').onclick=closeFeature;
  }

  function openFeature(id){
    const f=FEATURES[id];if(!f)return;
    const ps=getProps();
    if(id==='purchase')return shell(f,`<div class="aq-card"><h3>حدد ميزانيتك</h3><div class="aq-grid"><div class="aq-field"><label>نوع العقار</label><select id="pType"><option value="الكل">كل الأنواع</option><option>منازل</option><option>شقق</option><option>قطع أراضي</option><option>مشتملات</option><option>محلات</option><option>مخازن</option></select></div><div class="aq-field"><label>الميزانية القصوى (مليون)</label><input id="pBudget" type="number" inputmode="numeric" placeholder="مثال: 200"></div></div><button class="aq-primary gold" id="pRun" style="margin-top:12px">اعرض العقارات المناسبة</button><div id="pOut"></div></div><div class="aq-note">المحاكي يستخدم العقارات الموجودة حالياً داخل موقع عقاري ويعرض الخيارات الأقرب لميزانيتك.</div>`);
    if(id==='build')return shell(f,`<div class="aq-card"><h3>تقدير أولي للبناء</h3><div class="aq-grid"><div class="aq-field"><label>نوع البناء</label><select id="bType"><option>بيت سكني</option><option>فيلا</option><option>مشتمل</option><option>شقة</option></select></div><div class="aq-field"><label>المساحة (م²)</label><input id="bArea" type="number" inputmode="numeric" placeholder="مثال: 200"></div><div class="aq-field"><label>مستوى التشطيب</label><select id="bFinish"><option value="450000">اقتصادي</option><option value="650000" selected>متوسط</option><option value="900000">جيد جداً</option><option value="1200000">فاخر</option></select></div><div class="aq-field"><label>ميزانيتك التقريبية (د.ع)</label><input id="bBudget" type="number" inputmode="numeric" placeholder="مثال: 150000000"></div></div><button class="aq-primary gold" id="bRun" style="margin-top:12px">احسب التكلفة</button><div id="bOut"></div></div><div class="aq-note">هذه حاسبة تقديرية وليست عرض سعر هندسي نهائي. التكلفة الفعلية تعتمد على الأرض والمواد والتصميم والتنفيذ.</div>`);
    if(id==='handover')return shell(f,`<div class="aq-card"><h3>قائمة تسليم العقار</h3><div class="aq-field" style="margin-bottom:12px"><label>اختر العقار</label><select id="hProp">${ps.length?ps.map(p=>`<option value="${p.id}">${esc(p.t)} — ${esc(p.d)}</option>`).join(''):'<option>لا توجد عقارات حالياً</option>'}</select></div><div class="aq-list" id="hChecks">${['مطابقة اسم المالك والوثائق','فحص الكهرباء والماء والصرف','فحص الأبواب والنوافذ والأقفال','تسجيل قراءات العدادات','استلام المفاتيح والريموتات','تصوير حالة العقار عند الاستلام','تثبيت أي ملاحظات أو نواقص'].map((x,i)=>`<label class="aq-check"><input type="checkbox" data-h="${i}"> ${x}</label>`).join('')}</div><div class="aq-field full" style="margin-top:12px"><label>ملاحظات الاستلام</label><textarea id="hNotes" placeholder="اكتب أي ملاحظات أو نواقص..."></textarea></div><button class="aq-primary" id="hSave" style="margin-top:12px">حفظ قائمة التسليم</button><div id="hOut"></div></div>`);
    if(id==='dark')return shell(f,`<div class="aq-card"><div class="aq-dark-preview"><b>عقاري</b><br>اختار المظهر اللي يناسبك وخليه محفوظ على جهازك.</div><button class="aq-primary gold" id="darkToggle" style="margin-top:12px">${document.body.classList.contains('aq-night')?'☀️ إيقاف الوضع الليلي':'🌙 تفعيل الوضع الليلي'}</button><div id="darkOut" class="aq-note" style="margin-top:12px">الوضع الليلي يبقى محفوظاً حتى بعد إغلاق الموقع.</div></div>`);
    if(id==='exchange')return shell(f,`<div class="aq-card"><h3>تفاصيل العقار المطلوب للمبادلة</h3><div class="aq-grid"><div class="aq-field"><label>نوع العقار</label><select id="eType"><option>بيت</option><option>شقة</option><option>أرض</option><option>فيلا</option><option>مشتمل</option><option>محل</option><option>مخزن</option></select></div><div class="aq-field"><label>الموقع</label><input id="eLoc" placeholder="الحي / المنطقة"></div><div class="aq-field"><label>المساحة م²</label><input id="eArea" type="number"></div><div class="aq-field"><label>السعر التقريبي</label><input id="ePrice" type="number"></div><div class="aq-field"><label>غرف النوم</label><input id="eBeds" type="number"></div><div class="aq-field"><label>غرف المعيشة</label><input id="eLiving" type="number"></div><div class="aq-field"><label>الحمامات</label><input id="eBath" type="number"></div><div class="aq-field"><label>المطابخ</label><input id="eKitchen" type="number"></div><div class="aq-field"><label>عدد الطوابق</label><input id="eFloors" type="number"></div><div class="aq-field"><label>عدد الساحات / المناور</label><input id="eCourts" type="number"></div><div class="aq-field"><label>كراج</label><select id="eGarage"><option>غير متوفر في عقاري</option><option>متوفر</option></select></div><div class="aq-field"><label>حديقة</label><select id="eGarden"><option>غير متوفر في عقاري</option><option>متوفر</option></select></div><div class="aq-field"><label>سطح</label><select id="eRoof"><option>غير متوفر في عقاري</option><option>متوفر</option></select></div><div class="aq-field"><label>حالة العقار</label><select id="eCondition"><option>جديد</option><option>جيد</option><option>يحتاج صيانة</option></select></div><div class="aq-field full"><label>الإضافات والمواصفات</label><textarea id="eExtras" placeholder="مثال: مفروش، مولدة، تكييف، قريب من شارع رئيسي..."></textarea></div><div class="aq-field full"><label>ماذا تريد مقابل العقار؟</label><textarea id="eTerms" placeholder="اكتب نوع العقار أو الفرق المالي المقبول..."></textarea></div></div><button class="aq-primary gold" id="eSave" style="margin-top:12px">نشر طلب المبادلة</button><div id="eOut"></div></div><div class="aq-note">يمكنك كتابة «غير متوفر في عقاري» لأي ميزة لا تملكها، حتى تكون معلومات العرض واضحة للطرف الآخر.</div>`);
    if(id==='investment')return shell(f,`<div class="aq-card"><h3>احسب جدوى الاستثمار</h3><div class="aq-grid"><div class="aq-field"><label>سعر الشراء</label><input id="iPrice" type="number" inputmode="numeric" placeholder="د.ع"></div><div class="aq-field"><label>الإيجار الشهري المتوقع</label><input id="iRent" type="number" inputmode="numeric" placeholder="د.ع"></div><div class="aq-field"><label>مصاريف سنوية تقريبية</label><input id="iExp" type="number" inputmode="numeric" placeholder="د.ع"></div><div class="aq-field"><label>المنطقة</label><input id="iLoc" placeholder="كركوك - المنطقة"></div></div><button class="aq-primary gold" id="iRun" style="margin-top:12px">احسب العائد</button><div id="iOut"></div></div><div class="aq-note">العائد السنوي = صافي دخل الإيجار السنوي ÷ سعر الشراء. النتيجة تقديرية ولا تشمل تغير قيمة العقار مستقبلاً.</div>`);
    if(id==='daily'){
      const p=ps.length?ps[Math.floor((new Date().getDate()-1)%ps.length)]:null;
      return shell(f,p?`<div class="aq-card"><div class="aq-property"><img src="${esc(p.img)}"><div><h4>${esc(p.t)}</h4><p>📍 ${esc(p.city)} — ${esc(p.d)}<br>📐 ${p.a} م² • 🛏 ${p.r||0} • 🚿 ${p.b||0}<br><strong style="color:#071d35">${money(p.p)}</strong></p></div></div></div><div class="aq-note"><b>ليش اخترناه اليوم؟</b><br>عقار مختار من البيانات الحالية ليكون فرصة يومية سريعة للمستخدم. راجع التفاصيل واتصل بالمالك قبل اتخاذ القرار.</div><button class="aq-primary gold" id="dailyOpen" style="margin-top:12px">فتح تفاصيل العقار</button>`:'<div class="aq-note">لا توجد عقارات حالياً لعرض عقار اليوم.</div>`);
    }
  }

  function bindLayer(){let l=document.getElementById('aqFeatureLayer');if(l)return l;l=document.createElement('div');l.id='aqFeatureLayer';l.innerHTML='<div id="aqFeatureWindow"></div>';document.body.appendChild(l);l.addEventListener('click',e=>{if(e.target===l)closeFeature()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeFeature()});return l}

  function installBar(){
    const app=document.querySelector('.app');if(!app)return;
    let bar=document.getElementById('aqFeatureBar');
    if(!bar){
      bar=document.createElement('section');bar.id='aqFeatureBar';
      bar.innerHTML=`<div class="aq-title"><div><h2>مميزات عقاري الذكية</h2><span>أدوات عملية داخل الموقع — اضغط على أي ميزة لفتح نافذة مستقلة</span></div></div><div id="aqFeatureGrid">${Object.entries(FEATURES).map(([id,f])=>`<button type="button" class="aq-feature-btn" data-aq-feature="${id}"><span class="ico">${f.icon}</span><strong>${f.title}</strong><small>${f.sub}</small></button>`).join('')}</div>`;
      const nav=app.querySelector('nav');if(nav)app.insertBefore(bar,nav);else app.appendChild(bar);
    }
    bindLayer();
  }

  function applyNight(on){
    document.body.classList.toggle('aq-night',on);
    localStorage.setItem('aqNight',on?'1':'0');
    let s=document.getElementById('aq-night-style');
    if(!s){s=document.createElement('style');s.id='aq-night-style';document.head.appendChild(s)}
    s.textContent=on?`.aq-night{background:#071d35!important;color:#e9f1f7!important}.aq-night .app{background:#071d35!important}.aq-night header,.aq-night .section h2,.aq-night .section a,.aq-night h1,.aq-night h2,.aq-night h3,.aq-night h4,.aq-night p,.aq-night small,.aq-night .muted{color:#e9f1f7!important}.aq-night article,.aq-night .quick button,.aq-night .cats button{background:#0b2944!important;color:#e9f1f7!important;border-color:#244762!important}.aq-night nav{background:#06192b!important;border-color:#244762!important}`:'';
  }
  applyNight(localStorage.getItem('aqNight')==='1');

  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-aq-feature]');
    if(!btn)return;
    e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();
    openFeature(btn.getAttribute('data-aq-feature'));
  },true);

  document.addEventListener('click',e=>{
    const id=e.target.id;
    if(id==='pRun'){
      const type=document.getElementById('pType').value,b=Number(document.getElementById('pBudget').value||0)*1000000,out=document.getElementById('pOut');
      if(!b){out.innerHTML='<div class="aq-result">اكتب ميزانيتك أولاً.</div>';return}
      const arr=getProps().filter(p=>(type==='الكل'||p.c===type)&&p.p<=b).sort((a,c)=>c.p-a.p).slice(0,5);
      out.innerHTML=`<div class="aq-card" style="margin-top:12px"><h3>${arr.length?'العقارات المناسبة':'ما لقينا عقار ضمن هالميزانية حالياً'}</h3>${arr.map(p=>`<div class="aq-property" style="padding:8px 0;border-bottom:1px solid #edf1f5"><img src="${esc(p.img)}"><div><h4>${esc(p.t)}</h4><p>📍 ${esc(p.d)} • ${p.a} م²<br><b>${money(p.p)}</b></p></div></div>`).join('')}</div>`;
    }
    if(id==='bRun'){
      const area=Number(document.getElementById('bArea').value||0),rate=Number(document.getElementById('bFinish').value||0),budget=Number(document.getElementById('bBudget').value||0),out=document.getElementById('bOut');
      if(!area){out.innerHTML='<div class="aq-result">اكتب مساحة البناء أولاً.</div>';return}
      const total=area*rate;out.innerHTML=`<div class="aq-result">التقدير التقريبي: <b>${money(total)}</b><br>المساحة: ${area} م² • سعر المتر المستخدم: ${money(rate)}${budget?`<br>ميزانيتك: ${money(budget)} — ${budget>=total?'ضمن التقدير ✅':'تحتاج ميزانية إضافية تقريباً '+money(total-budget)}`:''}</div>`;
    }
    if(id==='hSave'){
      const n=[...document.querySelectorAll('[data-h]:checked')].length,out=document.getElementById('hOut');out.innerHTML=`<div class="aq-result">تم حفظ قائمة التسليم محلياً ✅<br>أنجزت ${n} من 7 بنود.${n===7?' كل البنود مكتملة.':''}</div>`;
      localStorage.setItem('aqHandover',JSON.stringify({date:Date.now(),count:n,notes:document.getElementById('hNotes')?.value||''}));
    }
    if(id==='darkToggle'){
      const on=!document.body.classList.contains('aq-night');applyNight(on);e.target.textContent=on?'☀️ إيقاف الوضع الليلي':'🌙 تفعيل الوضع الليلي';
    }
    if(id==='eSave'){
      const req=['eLoc','eArea','ePrice'].map(x=>document.getElementById(x)?.value.trim());const out=document.getElementById('eOut');
      if(req.some(x=>!x)){out.innerHTML='<div class="aq-result">كمل الموقع والمساحة والسعر حتى يكون عرض المبادلة واضحاً.</div>';return}
      const data={type:document.getElementById('eType').value,location:req[0],area:req[1],price:req[2],beds:document.getElementById('eBeds').value,living:document.getElementById('eLiving').value,bath:document.getElementById('eBath').value,kitchen:document.getElementById('eKitchen').value,floors:document.getElementById('eFloors').value,courts:document.getElementById('eCourts').value,garage:document.getElementById('eGarage').value,garden:document.getElementById('eGarden').value,roof:document.getElementById('eRoof').value,condition:document.getElementById('eCondition').value,extras:document.getElementById('eExtras').value,terms:document.getElementById('eTerms').value};localStorage.setItem('aqExchange',JSON.stringify(data));out.innerHTML='<div class="aq-result">تم تجهيز طلب المبادلة وحفظه على جهازك ✅<br>سيظهر بهذه التفاصيل عند ربط النشر بقاعدة البيانات.</div>';
    }
    if(id==='iRun'){
      const price=Number(document.getElementById('iPrice').value||0),rent=Number(document.getElementById('iRent').value||0),exp=Number(document.getElementById('iExp').value||0),out=document.getElementById('iOut');
      if(!price||!rent){out.innerHTML='<div class="aq-result">اكتب سعر الشراء والإيجار الشهري.</div>';return}
      const gross=rent*12,net=Math.max(0,gross-exp),yieldPct=net/price*100,years=net?price/net:0;out.innerHTML=`<div class="aq-result">الدخل السنوي: <b>${money(gross)}</b><br>صافي الدخل: <b>${money(net)}</b><br>العائد السنوي التقريبي: <b>${yieldPct.toFixed(2)}%</b><br>مدة استرداد رأس المال تقريباً: ${years.toFixed(1)} سنة</div>`;
    }
    if(id==='dailyOpen'){
      const ps=getProps(),p=ps.length?ps[Math.floor((new Date().getDate()-1)%ps.length)]:null;if(p){closeFeature();setTimeout(()=>{const target=[...document.querySelectorAll('article')].find(a=>a.textContent.includes(p.t));target?.querySelector('.details')?.click()},220)}
    }
  },true);

  function boot(){injectStyle();installBar();const observer=new MutationObserver(()=>{installBar()});observer.observe(document.body,{childList:true,subtree:true});setTimeout(()=>installBar(),300);setTimeout(()=>installBar(),1200)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
