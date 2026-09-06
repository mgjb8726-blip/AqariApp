'use client';
import { usePathname } from 'next/navigation';

export default function BackButton(){
  const pathname=usePathname();
  if(pathname==='/') return null;
  const goBack=()=>{
    if(window.history.length>1) window.history.back();
    else window.location.href='/';
  };
  return <button onClick={goBack} aria-label="رجوع" style={{position:'fixed',top:18,right:18,zIndex:1000,width:46,height:46,borderRadius:14,border:'1px solid rgba(212,175,55,.45)',background:'rgba(0,15,30,.94)',color:'#fff',fontSize:24,boxShadow:'0 10px 30px rgba(0,0,0,.18)',cursor:'pointer'}}>‹</button>;
}
