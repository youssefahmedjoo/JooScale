'use client';
import { useEffect, useState } from 'react';
import { getYouTubeId } from '@/lib/utils';
import type { Portfolio, PortfolioMedia, MediaType } from '@/types';

function MediaRow({ media, onChange }: { media: PortfolioMedia[]; onChange: (m: PortfolioMedia[]) => void }) {
  const add = (type: MediaType) => onChange([...media, { id: `new-${Date.now()}`, portfolio_id: '', media_type: type, media_url: '', order_index: media.length }]);
  const update = (i: number, url: string) => { const m=[...media]; m[i]={...m[i],media_url:url}; onChange(m); };
  const remove = (i: number) => onChange(media.filter((_,x)=>x!==i));

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        <button type="button" onClick={()=>add('image')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{fontSize:14}}>add_photo_alternate</span> إضافة صورة
        </button>
        <button type="button" onClick={()=>add('youtube')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:border-red-500 hover:text-red-500 transition-colors">
          <span className="material-symbols-outlined" style={{fontSize:14}}>smart_display</span> إضافة يوتيوب
        </button>
      </div>
      {media.map((m, i) => (
        <div key={m.id} className="flex gap-2 items-center bg-surface-container rounded-xl p-3">
          <span className={`material-symbols-outlined flex-shrink-0 ${m.media_type==='youtube'?'text-red-500':'text-primary'}`} style={{fontSize:20}}>
            {m.media_type==='youtube'?'smart_display':'image'}
          </span>
          <input value={m.media_url} onChange={e=>update(i,e.target.value)} dir="ltr"
            placeholder={m.media_type==='youtube'?'https://youtu.be/...':'https://example.com/image.jpg'}
            className="flex-1 px-3 py-2 rounded-lg border border-outline-variant/20 bg-white text-xs focus:outline-none focus:border-primary" />
          {/* Preview */}
          {m.media_url && m.media_type==='youtube' && getYouTubeId(m.media_url) && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://img.youtube.com/vi/${getYouTubeId(m.media_url)}/mqdefault.jpg`} className="w-16 h-10 object-cover rounded-lg flex-shrink-0" alt="" />
          )}
          {m.media_url && m.media_type==='image' && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={m.media_url} className="w-16 h-10 object-cover rounded-lg flex-shrink-0" alt=""
              onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
          )}
          <button onClick={()=>remove(i)} className="flex-shrink-0 text-error/50 hover:text-error">
            <span className="material-symbols-outlined" style={{fontSize:16}}>delete</span>
          </button>
        </div>
      ))}
      {media.length===0 && <p className="text-xs text-on-surface-variant opacity-50 text-center py-2">أضف صور أو فيديوهات للعمل</p>}
    </div>
  );
}

function PortfolioModal({ initial, onSave, onClose, lang }:
  { initial: Partial<Portfolio>; onSave:(d:Partial<Portfolio>)=>void; onClose:()=>void; lang:'ar'|'en' }) {
  const isRTL = lang==='ar';
  const [f, setF] = useState<Partial<Portfolio>>({
    title_ar:'', title_en:'', desc_ar:'', desc_en:'', visit_link:'', order_index:0, media:[],
    ...initial,
    media: initial.media ? [...initial.media] : [],
  });
  const s = (k:string, v:string|number) => setF(p=>({...p,[k]:v}));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl z-10 flex flex-col" style={{maxHeight:'90vh'}}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 flex-shrink-0">
          <h2 className="font-bold text-on-surface text-xl">{isRTL?(initial.id?'تعديل العمل':'إضافة عمل'):(initial.id?'Edit Item':'Add Item')}</h2>
          <button onClick={onClose}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
        </div>
        <div className="overflow-y-auto p-8 space-y-5 chat-scroll">
          {/* Media */}
          <div>
            <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-3">
              {isRTL?'الصور والفيديوهات (يمكن إضافة أكثر من واحد)':'Media (you can add multiple)'}
            </label>
            <MediaRow media={f.media??[]} onChange={m=>setF(p=>({...p,media:m}))} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label:isRTL?'العنوان (عربي)':'Title (AR)', k:'title_ar', dir:'rtl' },
              { label:'Title (EN)', k:'title_en', dir:'ltr' },
              { label:isRTL?'الوصف (عربي)':'Desc (AR)', k:'desc_ar', dir:'rtl' },
              { label:'Description (EN)', k:'desc_en', dir:'ltr' },
              { label:isRTL?'رابط الزيارة (اختياري)':'Visit Link (optional)', k:'visit_link', dir:'ltr' },
              { label:isRTL?'الترتيب':'Order', k:'order_index', dir:'ltr', type:'number' },
            ].map(field=>(
              <div key={field.k}>
                <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{field.label}</label>
                <input type={field.type??'text'} dir={field.dir}
                  value={String(f[field.k as keyof typeof f]??'')}
                  onChange={e=>s(field.k, field.type==='number'?Number(e.target.value):e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
              </div>
            ))}
          </div>
        </div>
        <div className="px-8 py-5 border-t border-outline-variant/20 flex gap-3 flex-shrink-0">
          <button onClick={()=>onSave(f)} className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110">
            {isRTL?(initial.id?'حفظ':'إضافة'):(initial.id?'Save':'Add')}
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold">
            {isRTL?'إلغاء':'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioAdminPage() {
  const [items, setItems]   = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal]   = useState<Partial<Portfolio>|null>(null);
  const [lang, setLang]     = useState<'ar'|'en'>('ar');
  const isRTL = lang==='ar';

  useEffect(()=>{
    const saved = localStorage.getItem('joo-admin-lang') as 'ar'|'en'|null;
    if (saved) setLang(saved);
  },[]);

  useEffect(()=>{
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const load = async () => {
    setLoading(true);
    const res = await fetch('/api/portfolio');
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  const save = async (data: Partial<Portfolio>) => {
    await fetch('/api/portfolio',{ method:data.id?'PUT':'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) });
    setModal(null); load();
  };

  const del = async (id:string) => {
    if (!confirm(isRTL?'حذف هذا العمل؟':'Delete this item?')) return;
    await fetch('/api/portfolio',{ method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) });
    load();
  };

  const getThumb = (item: Portfolio) => {
    const first = item.media?.[0];
    if (!first) return null;
    if (first.media_type==='youtube') { const id=getYouTubeId(first.media_url); return id?`https://img.youtube.com/vi/${id}/mqdefault.jpg`:null; }
    return first.media_url;
  };

  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-2">{isRTL?'أعمالنا':'Portfolio'}</h2>
          <p className="text-on-surface-variant">{isRTL?'إدارة محفظة الأعمال مع صور وفيديوهات متعددة.':'Manage portfolio with multiple images & videos.'}</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="hidden lg:block px-6 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">{isRTL?'إجمالي الأعمال':'Total'}</p>
            <p className="text-2xl font-bold text-primary">{items.length}</p>
          </div>
          <button onClick={()=>setModal({})} className="flex items-center gap-2 bg-gradient-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-110">
            <span className="material-symbols-outlined" style={{fontSize:18}}>add</span>
            {isRTL?'عمل جديد':'New Item'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"/></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item=>(
            <div key={item.id} className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 hover:shadow-lg transition-all">
              <div className="relative bg-surface-dim" style={{aspectRatio:'16/9'}}>
                {getThumb(item)
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={getThumb(item)!} alt="" className="w-full h-full object-cover" onError={e=>{(e.target as HTMLImageElement).style.display='none'}} />
                  : <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl opacity-20">photo_library</span></div>
                }
                <div className="absolute top-2 end-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.media?.length??0} {isRTL?'وسائط':'media'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-on-surface text-sm mb-1">{isRTL?item.title_ar:item.title_en}</h3>
                <p className="text-xs text-on-surface-variant mb-3 line-clamp-2">{isRTL?item.desc_ar:item.desc_en}</p>
                <div className="flex gap-2">
                  <button onClick={()=>setModal(item)}
                    className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize:14}}>edit</span>{isRTL?'تعديل':'Edit'}
                  </button>
                  <button onClick={()=>del(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-outline-variant/30 text-xs font-bold text-on-surface-variant hover:border-error hover:text-error transition-colors">
                    <span className="material-symbols-outlined" style={{fontSize:14}}>delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {items.length===0 && (
            <div className="col-span-full text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">photo_library</span>
              {isRTL?'لا توجد أعمال بعد.':'No portfolio items yet.'}
            </div>
          )}
        </div>
      )}
      {modal!==null && <PortfolioModal initial={modal} onSave={save} onClose={()=>setModal(null)} lang={lang} />}
    </div>
  );
}
