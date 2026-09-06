'use client';
import Complete from './page';

export default function Redesign(){
  return <>
    <Complete/>
    <style>{`
      :root{--aq-navy:#0b1f33;--aq-navy2:#123553;--aq-gold:#c79a3b;--aq-gold2:#e0b85f;--aq-teal:#159a9c;--aq-bg:#f6f8fb;--aq-line:#e4e9ef;--aq-text:#172536;--aq-muted:#718096;--aq-white:#fff}
      *{box-sizing:border-box}
      body{margin:0;background:var(--aq-bg)}
      button,input,select,textarea{font-family:inherit}
      button{transition:transform .16s ease,box-shadow .16s ease,background .16s ease,border-color .16s ease}
      button:active{transform:translateY(1px)}
      button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #159a9c35;outline-offset:2px}

      .app{background:linear-gradient(180deg,#f8fafc 0,#f4f7fa 100%)!important;color:var(--aq-text)!important;padding-bottom:92px!important}
      .header{height:74px!important;padding:0 max(16px,4vw)!important;background:#ffffffef!important;backdrop-filter:blur(18px)!important;border-bottom:1px solid var(--aq-line)!important;box-shadow:0 4px 20px #0b1f3308!important}
      .header .logo{font-size:0!important;display:flex!important;align-items:center!important;gap:9px!important;line-height:1!important;color:var(--aq-navy)!important}
      .header .logo:first-letter{font-size:25px}
      .header .logo b{font-size:24px!important;letter-spacing:-.5px;color:var(--aq-navy)!important}
      .header .logo small{font-size:9px!important;color:var(--aq-gold)!important;font-weight:700!important;display:block!important;margin-top:2px!important}
      .head-actions{gap:7px!important;align-items:center!important}
      .head-actions button{background:#fff!important;border:1px solid #dfe6ed!important;color:var(--aq-navy)!important;border-radius:12px!important;padding:10px 12px!important;font-size:12px!important;font-weight:700!important;box-shadow:0 2px 7px #0b1f3308!important}
      .head-actions button:hover{border-color:#c7d4df!important;box-shadow:0 5px 14px #0b1f3312!important}
      .head-actions .gold{background:linear-gradient(135deg,var(--aq-gold2),var(--aq-gold))!important;border:0!important;color:#fff!important;border-radius:12px!important;box-shadow:0 7px 18px #c79a3b30!important}

      .hero{background:radial-gradient(circle at 82% 10%,#245a7e 0,#0f304b 43%,#081c2d 100%)!important;color:#fff!important;padding:42px 12px 28px!important;text-align:center!important;position:relative!important;overflow:hidden!important}
      .hero:after{content:"";position:absolute;inset:auto -80px -120px auto;width:260px;height:260px;border:1px solid #ffffff16;border-radius:50%;box-shadow:0 0 0 35px #ffffff08,0 0 0 70px #ffffff05;pointer-events:none}
      .hero .eyebrow{color:#e5bf69!important;font-size:12px!important;font-weight:800!important;letter-spacing:.2px}
      .hero h1{font-size:34px!important;line-height:1.25!important;margin:10px auto 7px!important;max-width:780px!important;letter-spacing:-.7px!important}
      .hero p{font-size:14px!important;opacity:.82!important;margin:0 auto 20px!important}
      .hero .search{max-width:790px!important;height:58px!important;margin:0 auto 10px!important;background:#fff!important;border:1px solid #ffffff22!important;border-radius:17px!important;padding:5px!important;box-shadow:0 16px 38px #00000035!important;position:relative!important;z-index:1!important}
      .hero .search input{font-size:14px!important;color:var(--aq-text)!important;padding:0 14px!important;background:transparent!important}
      .hero .search button{min-width:86px!important;height:48px!important;border-radius:13px!important;background:linear-gradient(135deg,var(--aq-gold2),var(--aq-gold))!important;color:#fff!important;font-weight:800!important;box-shadow:0 6px 14px #c79a3b35!important}
      .province-box{max-width:790px!important;margin:10px auto 0!important;display:flex!important;gap:8px!important;position:relative!important;z-index:1!important}
      .province-box select{flex:1!important;background:#fff!important;border:1px solid #dfe7ee!important;color:var(--aq-text)!important;padding:13px 14px!important;border-radius:13px!important}
      .province-box .gold{border:0!important;border-radius:13px!important;background:var(--aq-teal)!important;color:#fff!important;font-weight:800!important;padding:0 18px!important;box-shadow:0 6px 15px #159a9c35!important}

      .content{max-width:1160px!important;margin:auto!important;padding:26px max(12px,4vw) 110px!important}
      .content>.ai{display:block!important;background:linear-gradient(135deg,#fffdf7,#f8f3e8)!important;border:1px solid #ead9ad!important;border-radius:18px!important;padding:15px 17px!important;margin:0 0 19px!important;box-shadow:0 5px 18px #c79a3b0d!important;color:#3b4652!important}
      .ai strong{color:#9b7527!important;font-size:13px!important}
      .section-title{margin:8px 0 10px!important}
      .section-title h1,.section-title h2{color:var(--aq-navy)!important;font-size:20px!important;letter-spacing:-.2px!important}
      .section-title small{color:var(--aq-gold)!important;font-weight:800!important}
      .section-title button{background:transparent!important;color:var(--aq-teal)!important;font-weight:800!important}

      .quick,.cats{gap:8px!important;overflow-x:auto!important;scrollbar-width:none!important;padding-bottom:4px!important}
      .quick::-webkit-scrollbar,.cats::-webkit-scrollbar{display:none}
      .quick button,.cats button{white-space:nowrap!important;background:#fff!important;border:1px solid #dfe6ed!important;color:#344456!important;border-radius:999px!important;padding:10px 14px!important;font-size:12px!important;font-weight:750!important;box-shadow:0 2px 7px #0b1f3308!important}
      .quick button:hover,.cats button:hover{border-color:#c8d5df!important;box-shadow:0 5px 13px #0b1f3310!important}
      .cats{padding:6px 0 16px!important}
      .cats .active{background:var(--aq-navy)!important;border-color:var(--aq-navy)!important;color:#fff!important;box-shadow:0 6px 14px #0b1f3325!important}

      .grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:15px!important}
      .card{background:#fff!important;border:1px solid #e7ecf1!important;border-radius:18px!important;overflow:hidden!important;box-shadow:0 7px 24px #0b1f330c!important;min-width:0!important;transition:transform .18s ease,box-shadow .18s ease!important}
      .card:hover{transform:translateY(-2px)!important;box-shadow:0 12px 30px #0b1f3316!important}
      .card .photo{height:215px!important;position:relative!important;background:#e9eef3!important}
      .card .photo img{width:100%!important;height:100%!important;object-fit:cover!important}
      .card .photo span{top:11px!important;right:11px!important;background:#ffffffef!important;color:#8b681e!important;border:1px solid #ead9ad!important;padding:6px 9px!important;border-radius:9px!important;font-size:10px!important;font-weight:800!important;backdrop-filter:blur(8px)!important}
      .card .photo button{top:11px!important;left:11px!important;width:40px!important;height:40px!important;border-radius:50%!important;background:#ffffffed!important;color:#b64c5e!important;border:1px solid #e6ebef!important;font-size:20px!important;padding:0!important;box-shadow:0 4px 12px #0b1f3315!important;z-index:2!important}
      .card .body{padding:14px!important;direction:rtl!important}
      .card .body small{color:#778594!important;font-size:11px!important}
      .card .body h3{font-size:15px!important;line-height:1.45!important;color:var(--aq-navy)!important;margin:6px 0 5px!important;min-height:42px!important}
      .card .body strong{display:block!important;color:#a27824!important;font-size:17px!important;margin-bottom:7px!important}
      .card .meta{display:flex!important;flex-wrap:wrap!important;gap:5px!important;margin:7px 0 11px!important;color:#6e7d8b!important;font-size:10px!important}
      .card .meta span{background:#f5f7f9!important;border:1px solid #e8edf1!important;border-radius:8px!important;padding:5px 6px!important}
      .card .actions{display:grid!important;grid-template-columns:1fr 1fr 1.15fr!important;gap:6px!important;border-top:1px solid #edf0f3!important;padding-top:10px!important}
      .card .actions button{display:flex!important;align-items:center!important;justify-content:center!important;min-width:0!important;height:34px!important;padding:6px 4px!important;border-radius:9px!important;background:#f5f7f9!important;color:#344456!important;border:1px solid #e3e9ee!important;font-size:10px!important;font-weight:800!important}
      .card .actions button:hover{background:#edf3f7!important}
      .card .actions button:last-child{background:var(--aq-navy)!important;color:#fff!important;border-color:var(--aq-navy)!important;box-shadow:0 5px 12px #0b1f3320!important}

      .stories{gap:10px!important;padding:3px 0 20px!important;overflow-x:auto!important;scrollbar-width:none!important}.stories::-webkit-scrollbar{display:none}
      .story{min-width:96px!important;height:128px!important;border-radius:17px!important;box-shadow:0 6px 18px #0b1f3312!important}
      .story b{font-size:11px!important}

      .nav{height:80px!important;background:#ffffffef!important;backdrop-filter:blur(18px)!important;border-top:1px solid #dfe6ed!important;box-shadow:0 -7px 25px #0b1f330d!important;padding:0 7px!important}
      .nav button{background:transparent!important;color:#778594!important;font-size:19px!important;padding:7px 10px!important;border-radius:12px!important}
      .nav button:hover{background:#f2f6f8!important;color:var(--aq-navy)!important}
      .nav small{display:block!important;font-size:9px!important;font-weight:700!important;margin-top:3px!important}
      .nav .gold{width:58px!important;height:58px!important;border-radius:17px!important;background:linear-gradient(145deg,var(--aq-gold2),var(--aq-gold))!important;color:#fff!important;margin-top:-27px!important;border:5px solid #f6f8fb!important;box-shadow:0 8px 20px #c79a3b38!important;padding:0!important}

      .overlay{background:#061321b8!important;backdrop-filter:blur(5px)!important;padding:14px!important}
      .detail,.auth{background:#fff!important;border:1px solid #e6ebef!important;border-radius:22px!important;box-shadow:0 22px 60px #0004!important}
      .detail{padding:14px!important}
      .detail>img{height:300px!important;border-radius:15px!important}
      .detail .x,.auth .x{background:#fff!important;border:1px solid #e1e7ec!important;color:var(--aq-navy)!important;width:38px!important;height:38px!important}
      .facts b{background:#f6f8fa!important;border:1px solid #e6ebef!important;color:#415162!important;border-radius:11px!important}
      .contact button{background:var(--aq-navy)!important;border-radius:11px!important;font-weight:800!important}
      .contact button:first-child{background:#159a9c!important}
      .auth{padding:22px!important}
      .auth input,.form input,.form textarea,.form select{border:1px solid #dbe3e9!important;border-radius:11px!important;background:#fbfcfd!important}
      .auth .gold,.form .gold{background:linear-gradient(135deg,var(--aq-gold2),var(--aq-gold))!important;color:#fff!important;border-radius:11px!important;font-weight:800!important}
      .roles button{background:#f7f9fb!important;border:1px solid #dfe6ed!important;border-radius:13px!important;font-weight:800!important}
      .roles button:hover{border-color:var(--aq-gold)!important;background:#fffaf0!important}
      .form{border:1px solid #e5ebef!important;box-shadow:0 8px 26px #0b1f330b!important;border-radius:18px!important}
      .menu{gap:8px!important}.menu a{border:1px solid #e5ebef!important;box-shadow:0 3px 10px #0b1f3308!important;border-radius:13px!important}.menu a:hover{border-color:#cbd8e2!important}
      .toast{background:var(--aq-navy)!important;border:1px solid #ffffff18!important;border-radius:12px!important;box-shadow:0 10px 28px #0005!important}
      .empty{border:1px solid #e5ebef!important;box-shadow:0 6px 20px #0b1f3309!important}

      @media(max-width:760px){
        .header{height:68px!important;padding:0 10px!important}.header .logo b{font-size:20px!important}.header .logo small{font-size:8px!important}
        .head-actions{gap:5px!important}.head-actions button{padding:9px 8px!important;font-size:10px!important;border-radius:10px!important}.head-actions button:first-child{font-size:0!important;width:38px!important}.head-actions button:first-child:after{content:'👤';font-size:16px!important}
        .head-actions button:nth-child(2){font-size:0!important;width:38px!important}.head-actions button:nth-child(2):after{content:'♡';font-size:20px!important}.head-actions .gold{font-size:10px!important;padding:9px 10px!important}
        .hero{padding:28px 10px 18px!important}.hero h1{font-size:27px!important}.hero p{font-size:12px!important}.hero .search{height:54px!important}.hero .search button{min-width:72px!important;height:44px!important;font-size:11px!important}.hero .search input{font-size:12px!important}.province-box{display:grid!important;grid-template-columns:1fr 1fr!important}.province-box .gold{padding:0 8px!important;font-size:11px!important}
        .content{padding:18px 10px 100px!important}.content>.ai{font-size:11px!important;padding:13px!important}.section-title h2{font-size:18px!important}
        .grid{grid-template-columns:1fr!important;gap:11px!important}.card{display:flex!important;flex-direction:row!important;height:185px!important;border-radius:17px!important}.card .photo{width:48%!important;height:185px!important;min-height:185px!important;order:0!important}.card .body{width:52%!important;padding:10px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.card .body h3{font-size:13px!important;min-height:36px!important;margin:4px 0!important}.card .body strong{font-size:14px!important}.card .body small{font-size:9px!important}.card .meta{font-size:8px!important;gap:3px!important;margin:4px 0!important}.card .meta span{padding:4px 4px!important}.card .actions{grid-template-columns:1fr 1fr!important;gap:4px!important;padding-top:7px!important}.card .actions button{height:30px!important;font-size:9px!important}.card .actions button:last-child{grid-column:1/-1!important}.card .photo button{width:36px!important;height:36px!important;font-size:18px!important;top:8px!important;left:8px!important}.card .photo span{top:8px!important;right:8px!important;font-size:8px!important;padding:5px 7px!important}
        .nav{height:74px!important}.nav button{font-size:18px!important;padding:5px 6px!important}.nav small{font-size:8px!important}.nav .gold{width:55px!important;height:55px!important;border-radius:16px!important}
        .detail>img{height:230px!important}.facts{grid-template-columns:1fr 1fr!important}.contact{grid-template-columns:1fr!important}
      }
      @media(min-width:761px){.grid .card{display:flex!important;flex-direction:row!important;min-height:205px!important}.grid .card .photo{width:44%!important;height:205px!important}.grid .card .body{width:56%!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}.grid .card .actions{margin-top:auto!important}}
    `}</style>
  </>;
}
