export const AQARI_STORAGE='aqari_v1';
export const emptyDb={users:[],properties:[],favorites:[],messages:[],recent:[],reports:[]};
export function loadDb(){if(typeof window==='undefined')return emptyDb;try{return {...emptyDb,...JSON.parse(localStorage.getItem(AQARI_STORAGE)||'{}')}}catch{return emptyDb}}
export function saveDb(db){if(typeof window!=='undefined')localStorage.setItem(AQARI_STORAGE,JSON.stringify(db))}
