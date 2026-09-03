(() => {
  'use strict';

  const FEATURES = {
    purchase: ['🏠', 'محاكي شراء العقار'],
    build: ['🧱', 'حاسبة بناء العقار'],
    handover: ['🔑', 'تسليم العقار'],
    dark: ['🌙', 'الوضع الليلي'],
    exchange: ['🤝', 'مبادلة العقارات'],
    investment: ['📈', 'الاستثمار العقاري'],
    daily: ['⭐', 'عقار اليوم']
  };

  const money = n => new Intl.NumberFormat('ar-IQ').format(Math.round(Number(n) || 0)) + ' د.ع';
  const esc = s => String(s ?? '').replace(/[&<>\"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
  const props = () => Array.isArray(window.__AQARI_PROPS__) ? window.__AQARI_PROPS__ : [];

  const css = `
  #aqfRoot{direction:rtl;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif}
  #aqfRoot *{box-sizing:border-box}
  .aqfMenu{position:fixed;inset:0;z-index:2147483646;background:rgba(0,0,0,.58);display:flex;align-items:center;justify-content:center;padding:14px}
  .aqfPanel{width:min(650px,100%);max-height:92vh;overflow:auto;background:linear-gradient(145deg,#06182d,#0a4962);color:#fff;border:1px solid #d9a441;border-radius:28px;padding:20px;box-shadow:0 28px 90px rgba(0,0,0,.45)}
  .aqfHead{display:flex;align-items:center;justify-content:space-between;gap:12px}.aqfHead b{font-size:21px}.aqfHead small{display:block;opacity:.72;margin-top:4px}
  .aqfClose,.aqfBack{border:0;border-radius:13px;padding:11px 15px;font-weight:900;cursor:pointer}.aqfClose{background:rgba(255,255,255,.12);color:#fff}.aqfBack{background:#071d35;color:#fff}
  .aqfGrid{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-top:16px}.aqfBtn{border:1px solid #31516b;border-radius:19px;background:#102f4d;color:#fff;padding:16px;text-align:right;min-height:116px;cursor:pointer}.aqfBtn:active{transform:scale(.985)}.aqfBtn span{font-size:30px}.aqfBtn b{display:block;margin-top:8px}.aqfBtn small{display:block;margin-top:6px;opacity:.68}
  .aqfScreen{position:fixed;inset:0;z-index:2147483647;overflow:auto;background:#f7f9fb;color:#101828;padding:16px 14px 70px}.aqfWrap{width:min(650px,100%);margin:auto}.aqfScreen h1{font-size:25px;color:#071d35;margin:20px 0 8px}.aqfScreen p{color:#667085;line-height:1.8}.aqfField{display:block;margin:13px 0}.aqfField span{display:block;font-size:12px;font-weight:900;margin-bottom:6px}.aqfField input,.aqfField select,.aqfField textarea{width:100%;padding:14px;border:1px solid #d0d5dd;border-radius:14px;background:#fff;color:#101828;font:inherit}.aqfField textarea{min-height:115px;resize:vertical}.aqfAction{width:100%;padding:15px;border:0;border-radius:15px;background:#071d35;color:#fff;font-weight:900;cursor:pointer;margin:7px 0 13px}.aqfCard{background:#fff;border:1px solid #e4e7ec;border-radius:18px;padding:15px;margin:11px 0}.aqfCard b{display:block}.aqfCard small{display:block;color:#667085;line-height:1.75;margin:5px 0}.aqfPrice{font-weight:900;color:#071d35}.aqfKpi{display:grid;grid-template-columns:1fr 1fr;gap:9px}.aqfOk{background:#ecfdf3;border:1px solid #abefc6;color:#067647;border-radius:15px;padding:13px;font-weight:900;margin:10px 0}.aqfEmpty{padding:16px;text-align:center;color:#667085;background:#fff;border:1px dashed #d0d5dd;border-radius:16px}
  body.aqNight{background:#050b13!important;color:#f8fafc!important}body.aqNight #root{background:#050b13!important;color:#f8fafc!important}body.aqNight #root *{border-color:#24384b!important}body.aqNight .aqfScreen{background:#050b13;color:#f8fafc}body.aqNight .aqfScreen h1{color:#fff}body.aqNight .aqfScreen p{color:#aab7c4}body.aqNight .aqfField input,body.aqNight .aqfField select,body.aqNight .aqfField textarea,body.aqNight .aqfCard{background:#0b1724;color:#f8fafc;border-color:#24384b}
  @media(max-width:520px){.aqfGrid{grid-template-columns:1fr 1fr}.aqfPanel{padding:15px}.aqfBtn{min-height:105px;padding:13px}}
  `;
  if(!document.getElementById('aqfStyle')){const s=document.createElement('style');s.id='aqfStyle';s.textContent=css;document.head.appendChild(s)}

  const night = () => { try { return localStorage.getItem('aqNight') === '1'; } catch { return false; } };
  const applyNight = () => document.body.classList.toggle('aqNight', night());
  const setNight = v => { try { localStorage.setItem('aqNight', v ? '1' : '0'); } catch {} applyNight(); };
  applyNight();

  function close(){ document.querySelectorAll('.aqfMenu,.aqfScreen').forEach(x=>x.remove()); }

  function menu(){
    close();
    const r=document.createElement('div'); r.id='aqfRoot'; r.className='aqfMenu';
    r.innerHTML=`<section class="aqfPanel"><div class="aqfHead"><div><b>مميزات عقاري الذكية</b><small>اضغط على أي ميزة لفتح الأداة التفاعلية مباشرة</small></div><button class="aqfClose" data-aq-close>✕</button></div><div class="aqfGrid">${Object.entries(FEATURES).map(([id,f])=>`<button type="button" class="aqfBtn" data-aq-feature="${id}"><span>${f[0]}</span><b>${f[1]}</b><small>${id==='dark'?'تبديل مباشر للوضع الليلي':'فتح الأداة التفاعلية'}</small></button>`).join('')}</div></section>`;
    document.body.appendChild(r);
  }

  function screen(id){
    if(id==='dark'){ setNight(!night()); return; }
    close();
    const f=FEATURES[id], p=props();
    const r=document.createElement('div'); r.id='aqfRoot'; r.className='aqfScreen';
    let body=`<div class="aqfWrap"><button type="button" class="aqfBack" data-aq-back>→ رجوع</button><h1>${f[0]} ${f[1]}</h1>`;

    if(id==='purchase') body+=`<p>أدخل ميزانيتك واختر نوع العقار، وسيعرض لك التطبيق العقارات المناسبة من البيانات المتاحة.</p><label class="aqfField"><span>نوع العقار</span><select id="pType"><option value="all">كل الأنواع</option>${[...new Set(p.map(x=>x.c).filter(Boolean))].map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label><label class="aqfField"><span>الميزانية القصوى</span><input id="pBudget" type="number" inputmode="numeric" placeholder="مثال: 200000000"></label><button type="button" class="aqfAction" id="pRun">🔎 إظهار العقارات المناسبة</button><div id="pOut"></div>`;

    if(id==='build') body+=`<p>احسب مساحة البناء التقريبية الممكنة حسب ميزانيتك وسعر المتر. النتيجة تقديرية وليست عرض سعر هندسي.</p><label class="aqfField"><span>نوع البناء</span><select id="bType"><option>بيت سكني</option><option>فيلا</option><option>مشتمل</option><option>شقق</option></select></label><label class="aqfField"><span>الميزانية</span><input id="bBudget" type="number" inputmode="numeric" placeholder="مثال: 150000000"></label><label class="aqfField"><span>سعر المتر التقديري</span><input id="bRate" type="number" inputmode="numeric" value="750000"></label><button type="button" class="aqfAction" id="bRun">🧮 احسب الآن</button><div id="bOut"></div>`;

    if(id==='handover') body+=`<p>أنشئ محضر تسليم مرتب وحدد البنود التي تم فحصها قبل إتمام التسليم.</p><label class="aqfField"><span>العقار</span><select id="hProp">${p.map(x=>`<option value="${esc(x.id)}">${esc(x.t)} — ${money(x.p)}</option>`).join('')}</select></label><div class="aqfCard">${['مطابقة هوية الأطراف','مراجعة سند الملكية','فحص حالة العقار','الكهرباء والماء','المفاتيح','العدادات','توقيع محضر التسليم'].map((x,i)=>`<label style="display:block;padding:11px 0;border-bottom:1px solid #eee"><input type="checkbox" data-h="${i}"> ${x}</label>`).join('')}</div><label class="aqfField"><span>ملاحظات</span><textarea id="hNote" placeholder="اكتب الملاحظات..."></textarea></label><button type="button" class="aqfAction" id="hSave">💾 حفظ محضر التسليم</button><div id="hOut"></div>`;

    if(id==='exchange') body+=`<p>سجّل مواصفات عقارك بالكامل. أي خانة غير متوفرة يمكن تركها فارغة أو كتابة «غير متوفر في عقاري».</p><div class="aqfKpi"><label class="aqfField"><span>نوع العقار</span><select id="eType"><option>بيت</option><option>شقة</option><option>أرض</option><option>فيلا</option><option>مشتمل</option></select></label><label class="aqfField"><span>الموقع</span><input id="eLoc" placeholder="المنطقة / الحي"></label></div><div class="aqfKpi"><label class="aqfField"><span>المساحة م²</span><input id="eArea" type="number" placeholder="غير متوفر"></label><label class="aqfField"><span>السعر التقريبي</span><input id="ePrice" type="number" placeholder="غير متوفر"></label></div>${[['غرف النوم','eBeds'],['غرف المعيشة','eLiving'],['الحمامات','eBath'],['المطابخ','eKitchen'],['الطوابق','eFloors'],['الساحات / المناور','eCourts']].map(a=>`<label class="aqfField"><span>${a[0]}</span><input id="${a[1]}" type="number" placeholder="غير متوفر"></label>`).join('')}<div class="aqfCard">${['كراج','حديقة','سطح','مفروش'].map((x,i)=>`<label style="display:block;padding:9px"><input type="checkbox" id="eX${i}"> ${x}</label>`).join('')}</div><label class="aqfField"><span>المميزات والإضافات</span><textarea id="eExtra" placeholder="مثال: مولدة، تدفئة، تكييف... أو غير متوفر في عقاري"></textarea></label><label class="aqfField"><span>معلومات أخرى وشروط المبادلة</span><textarea id="eNote" placeholder="ما العقار المطلوب بالمقابل؟ هل تقبل فرق سعر؟"></textarea></label><button type="button" class="aqfAction" id="eSave">🤝 حفظ طلب المبادلة</button><div id="eOut"></div>`;

    if(id==='investment') body+=`<p>أدخل سعر الشراء والإيجار والمصاريف لتحصل على العائد السنوي التقريبي وفترة استرداد رأس المال.</p><label class="aqfField"><span>سعر الشراء</span><input id="iBuy" type="number" inputmode="numeric" placeholder="مثال: 200000000"></label><label class="aqfField"><span>الإيجار الشهري المتوقع</span><input id="iRent" type="number" inputmode="numeric" placeholder="مثال: 1000000"></label><label class="aqfField"><span>المصاريف السنوية</span><input id="iCost" type="number" inputmode="numeric" placeholder="مثال: 2000000"></label><button type="button" class="aqfAction" id="iRun">📈 احسب الجدوى الاستثمارية</button><div id="iOut"></div>`;

    if(id==='daily'){
      let idx=0; try{const d=new Date().toISOString().slice(0,10);if(localStorage.getItem('aqDailyDate')!==d){idx=p.length?Math.floor(Math.random()*p.length):0;localStorage.setItem('aqDailyIndex',String(idx));localStorage.setItem('aqDailyDate',d)}else idx=Number(localStorage.getItem('aqDailyIndex')||0)}catch{}
      const x=p[idx%Math.max(p.length,1)];
      body+=x?`<p>فرصة مختارة تلقائياً لهذا اليوم من العقارات المتاحة.</p><div class="aqfCard"><b style="font-size:20px">${esc(x.t)}</b><small>📍 ${esc(x.city||'كركوك')} • ${esc(x.d||'')} • 📐 ${x.a||0} م² • 🛏️ ${x.r||0} غرف</small><div class="aqfPrice">${money(x.p)}</div></div>`:`<div class="aqfEmpty">لا توجد عقارات متاحة حالياً.</div>`;
    }

    body+='</div>'; r.innerHTML=body; document.body.appendChild(r);

    if(id==='purchase') r.querySelector('#pRun').onclick=()=>{const t=r.querySelector('#pType').value,b=Number(r.querySelector('#pBudget').value)||0;const out=p.filter(x=>(t==='all'||String(x.c||'')===t)&&(!b||Number(x.p)<=b));r.querySelector('#pOut').innerHTML=out.length?out.map(x=>`<div class="aqfCard"><b>${esc(x.t)}</b><small>📍 ${esc(x.city||'كركوك')} • ${esc(x.d||'')} • 📐 ${x.a||0} م²</small><span class="aqfPrice">${money(x.p)}</span></div>`).join(''):'<div class="aqfEmpty">لا توجد نتائج مطابقة. جرّب ميزانية أعلى أو نوعاً آخر.</div>'};
    if(id==='build') r.querySelector('#bRun').onclick=()=>{const budget=Number(r.querySelector('#bBudget').value)||0,rate=Number(r.querySelector('#bRate').value)||0;const area=rate?Math.floor(budget/rate):0;r.querySelector('#bOut').innerHTML=area>0?`<div class="aqfOk">يمكنك بناء مساحة تقريبية قدرها <b>${area.toLocaleString('ar-IQ')} م²</b> ضمن ميزانية ${money(budget)} وبسعر متر ${money(rate)}.</div>`:'<div class="aqfEmpty">أدخل الميزانية وسعر المتر أولاً.</div>'};
    if(id==='handover') r.querySelector('#hSave').onclick=()=>{const checks=[...r.querySelectorAll('[data-h]')].filter(x=>x.checked).length;try{localStorage.setItem('aqHandover',JSON.stringify({property:r.querySelector('#hProp')?.value||'',checks,note:r.querySelector('#hNote')?.value||'',date:new Date().toISOString()}))}catch{}r.querySelector('#hOut').innerHTML=`<div class="aqfOk">تم حفظ محضر التسليم على هذا الجهاز. البنود المكتملة: ${checks}/7.</div>`};
    if(id==='exchange') r.querySelector('#eSave').onclick=()=>{const data={type:r.querySelector('#eType').value,location:r.querySelector('#eLoc').value,area:r.querySelector('#eArea').value,price:r.querySelector('#ePrice').value,beds:r.querySelector('#eBeds').value,living:r.querySelector('#eLiving').value,bath:r.querySelector('#eBath').value,kitchen:r.querySelector('#eKitchen').value,floors:r.querySelector('#eFloors').value,courts:r.querySelector('#eCourts').value,extras:r.querySelector('#eExtra').value,note:r.querySelector('#eNote').value,garage:r.querySelector('#eX0').checked,garden:r.querySelector('#eX1').checked,roof:r.querySelector('#eX2').checked,furnished:r.querySelector('#eX3').checked};try{localStorage.setItem('aqExchange',JSON.stringify(data))}catch{}r.querySelector('#eOut').innerHTML='<div class="aqfOk">تم حفظ طلب المبادلة على هذا الجهاز بنجاح.</div>'};
    if(id==='investment') r.querySelector('#iRun').onclick=()=>{const buy=Number(r.querySelector('#iBuy').value)||0,rent=Number(r.querySelector('#iRent').value)||0,cost=Number(r.querySelector('#iCost').value)||0;const annual=Math.max(0,rent*12-cost),yieldPct=buy?(annual/buy)*100:0,payback=annual?buy/annual:0;r.querySelector('#iOut').innerHTML=buy&&rent?`<div class="aqfKpi"><div><small>العائد السنوي</small><strong>${money(annual)}</strong></div><div><small>نسبة العائد</small><strong>${yieldPct.toFixed(2)}%</strong></div></div><div class="aqfCard"><b>فترة الاسترداد التقريبية</b><small>${payback.toFixed(1)} سنة</small></div>`:'<div class="aqfEmpty">أدخل سعر الشراء والإيجار الشهري لحساب الجدوى.</div>'};
  }

  // Capture-phase handler: يمنع أي modal قديم من اعتراض ضغطة مميزات عقاري، ثم يفتح الأداة مباشرة.
  document.addEventListener('click', e => {
    const target=e.target?.closest?.('[data-aq-feature]');
    if(target){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();screen(target.getAttribute('data-aq-feature'));return;}
    const closeBtn=e.target?.closest?.('[data-aq-close]'); if(closeBtn){e.preventDefault();e.stopPropagation();close();return;}
    const back=e.target?.closest?.('[data-aq-back]'); if(back){e.preventDefault();e.stopPropagation();menu();return;}
  }, true);

  // Fallback for the React cards: recognise the visible feature title even if React did not add data attributes.
  document.addEventListener('click', e => {
    if(document.querySelector('.aqfMenu,.aqfScreen')) return;
    let el=e.target?.closest?.('button,[role="button"],a,div');
    if(!el) return;
    const text=(el.innerText||el.textContent||'').trim();
    const match=Object.entries(FEATURES).find(([id,f])=>id!=='dark' && text.includes(f[1]));
    if(match){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();screen(match[0]);}
  }, true);

  // Open the smart-features menu when the main app asks for it through the existing global hook.
  window.AqariSmartFeatures={open:menu,openFeature:screen,toggleNight:()=>setNight(!night())};
  window.dispatchEvent(new CustomEvent('aqari-features-ready'));

  // Also make a dedicated menu launcher available to any existing "مميزات عقاري الذكية" button.
  document.addEventListener('click', e => {
    if(document.querySelector('.aqfMenu,.aqfScreen')) return;
    const el=e.target?.closest?.('button,[role="button"],a'); if(!el) return;
    const text=(el.innerText||el.textContent||'').trim();
    if(text.includes('مميزات عقاري الذكية')){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();menu();}
  }, true);
})();
