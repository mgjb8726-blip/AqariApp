(()=>{
  const ready=()=>{
    const nav=document.querySelector('nav');
    if(!nav||nav.dataset.redesigned)return;
    nav.dataset.redesigned='1';
    nav.classList.add('aqari-nav-redesign');
    const old=[...nav.querySelectorAll('button')];
    const go=(i)=>old[i]?.click();
    nav.innerHTML='';
    const items=[
      ['⌂','الرئيسية',()=>go(0)],
      ['⌂','العقارات',()=>go(1)],
      ['⚒','الحرفيون',()=>go(4)],
      ['▦','المتجر',()=>toast('المتجر قيد التجهيز وسيظهر هنا قريباً')],
      ['🛒','السلة',()=>go(3)],
      ['♙','حسابي',()=>toast('صفحة الحساب قيد التجهيز')]
    ];
    items.forEach(([icon,label,fn],idx)=>{
      const b=document.createElement('button');
      b.type='button';b.innerHTML=`<span class="nav-icon">${icon}</span><small>${label}</small>`;
      if(idx===0)b.classList.add('active');
      b.addEventListener('click',()=>{nav.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');fn()});
      nav.appendChild(b);
    });
    const sync=()=>{
      const text=document.querySelector('.app .top h2')?.textContent||'';
      if(text)return;
      const path=location.hash;
      if(path)nav.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
    };
    sync();
  };
  const toast=(msg)=>{let t=document.querySelector('.aqari-nav-toast');if(!t){t=document.createElement('div');t.className='aqari-nav-toast';document.body.appendChild(t)}t.textContent=msg;t.classList.add('show');clearTimeout(window.__aqariToast);window.__aqariToast=setTimeout(()=>t.classList.remove('show'),2200)};
  const obs=new MutationObserver(ready);obs.observe(document.body,{childList:true,subtree:true});ready();
})();
