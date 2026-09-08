(()=>{
 const DATA=window.__AQARI_PROPS__||[];
 const money=n=>new Intl.NumberFormat('en-US').format(n)+' د.ع';
 let filter='الكل', query='';
 const cats=['الكل','للبيع','للإيجار','منازل','شقق','قطع أراضي','محلات'];
 const esc=s=>String(s).replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
 function root(){let x=document.getElementById('directHome');if(!x){x=document.createElement('section');x.id='directHome';document.body.appendChild(x)}return x}
 function visible(){const app=document.querySelector('.app');if(!app)return false;return !app.querySelector('.top') && !app.querySelector('.gallery') && !app.querySelector('.chat')}
 function apply(){const r=root();if(!visible()){r.classList.remove('show');return}r.classList.add('show');render(r)}
 function render(r){
   const items=DATA.filter(p=>{
     const hay=`${p.t} ${p.city} ${p.d} ${p.c}`.toLowerCase();
     const qOk=!query||hay.includes(query.toLowerCase());
     const fOk=filter==='الكل'||filter==='للبيع'||p.c===filter;
     return qOk&&fOk;
   });
   r.innerHTML=`<div class="direct-shell">
    <header class="direct-header"><div><span class="eyebrow">سوق العقارات العراقي</span><h1>عقاري</h1><p>اعثر على عقارك المناسب بسرعة ووضوح</p></div><button class="profile-btn" data-route="account">◉</button></header>
    <div class="switcher"><button class="selected">العقارات</button><button data-route="home-services">الخدمات والعمال</button></div>
    <div class="direct-search"><span>⌕</span><input value="${esc(query)}" placeholder="ابحث حسب المنطقة أو نوع العقار..."/><button>🎙</button></div>
    <div class="direct-filters">${cats.map(c=>`<button class="${filter===c?'on':''}" data-filter="${c}">${c}</button>`).join('')}</div>
    <div class="direct-heading"><div><span>اكتشف الآن</span><h2>عقارات متاحة</h2></div><b>${items.length} إعلان</b></div>
    <div class="direct-list">${items.map((p,i)=>card(p,i)).join('')}${!items.length?'<div class="direct-empty">لا توجد نتائج مطابقة<br><small>جرّب منطقة أو نوع عقار مختلف</small></div>':''}</div>
   </div>`;
   bind(r,items);
 }
 function card(p,i){return `<article class="direct-card" data-index="${i}" data-id="${p.id}">
   <div class="direct-photo"><img src="${esc(p.img)}" loading="lazy"><span class="deal">للبيع</span><span class="photo-count">▧ ${p.imgs?.length||1}</span><button class="fav" data-fav="${p.id}">♡</button></div>
   <div class="direct-body"><div class="direct-price">${money(p.p)}</div><div class="direct-meta"><span>${esc(p.c)}</span><span>📍 ${esc(p.city)} • ${esc(p.d)}</span></div><h3>${esc(p.t)}</h3>
   <div class="specs"><span>📐 <b>${p.a}</b> م²</span><span>🛏 <b>${p.r||0}</b> غرف</span><span>🛁 <b>${p.b||0}</b> حمام</span></div>
   <div class="direct-actions"><a href="tel:${esc(p.phone)}" class="call">☎ اتصال</a><a href="https://wa.me/964${String(p.phone).replace(/^0/,'')}" class="wa">◉ واتساب</a><button class="more">التفاصيل ←</button></div></div>
  </article>`}
 function bind(r,items){
   r.querySelector('input').addEventListener('input',e=>{query=e.target.value;render(r)});
   r.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;render(r)}));
   r.querySelectorAll('[data-route]').forEach(b=>b.addEventListener('click',()=>{const txt=b.textContent.trim();if(txt==='الخدمات والعمال'){alert('قسم الخدمات والعمال قيد الربط ضمن النسخة القادمة');return}clickExisting(txt==='◉'?'حسابي':'الرئيسية')}));
   r.querySelectorAll('.direct-card').forEach((c,i)=>c.addEventListener('click',e=>{if(e.target.closest('a,button'))return;clickProperty(items[i])}));
   r.querySelectorAll('.more').forEach((b,i)=>b.addEventListener('click',e=>{e.stopPropagation();clickProperty(items[i])}));
   r.querySelectorAll('[data-fav]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();const id=b.dataset.fav;const store=JSON.parse(localStorage.getItem('aqariFav')||'[]');const next=store.includes(id)?store.filter(x=>x!==id):[...store,id];localStorage.setItem('aqariFav',JSON.stringify(next));b.textContent=next.includes(id)?'♥':'♡'}));
 }
 function clickProperty(p){const cards=[...document.querySelectorAll('.app article')];const card=cards.find(a=>a.querySelector('img')?.src===p.img||a.textContent.includes(p.t));card?.querySelector('.cardImg')?.click()||card?.click()}
 function clickExisting(label){const btn=[...document.querySelectorAll('.app nav button')].find(b=>b.textContent.includes(label));btn?.click()}
 const mo=new MutationObserver(()=>{clearTimeout(window.__aqariTimer);window.__aqariTimer=setTimeout(apply,40)});mo.observe(document.body,{childList:true,subtree:true});
 apply();
})();