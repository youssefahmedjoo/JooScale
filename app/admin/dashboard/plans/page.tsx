'use client';
import { useEffect, useState } from 'react';
import type { Plan, PlanFeature, DurationType } from '@/types';

function PlanModal({ plan, onSave, onClose, lang }:
  { plan:Partial<Plan>; onSave:(p:Partial<Plan>)=>void; onClose:()=>void; lang:'ar'|'en' }) {
  const isRTL = lang==='ar';
  const [f, setF] = useState<Partial<Plan>>({
    title_ar:'', title_en:'', price:0, original_price:undefined,
    currency_ar:'ج.م', currency_en:'EGP',
    duration_type:'month', duration_days:undefined,
    is_recommended:false, features:[], order_index:0,
    ...plan,
  });
  const set = (k:string, v:unknown) => setF(p=>({...p,[k]:v}));

  const addFeat = () => setF(p=>({...p, features:[...(p.features??[]), {id:`n${Date.now()}`,plan_id:f.id??'',text_ar:'',text_en:'',included:true,order_index:p.features?.length??0} as PlanFeature]}));
  const updFeat = (i:number,k:string,v:string|boolean) => { const fs=[...(f.features??[])]; fs[i]={...fs[i],[k]:v}; setF(p=>({...p,features:fs})); };
  const delFeat = (i:number) => setF(p=>({...p,features:(p.features??[]).filter((_,x)=>x!==i)}));

  const durationOptions: {value:DurationType; ar:string; en:string}[] = [
    { value:'month', ar:'شهر', en:'Monthly' },
    { value:'days',  ar:'عدد أيام', en:'Fixed Days' },
    { value:'none',  ar:'لا يوجد مدة', en:'No Duration' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl z-10 flex flex-col" style={{maxHeight:'90vh'}}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 flex-shrink-0">
          <h2 className="font-bold text-on-surface text-xl">{isRTL?(plan.id?'تعديل الخطة':'إضافة خطة'):(plan.id?'Edit Plan':'Add Plan')}</h2>
          <button onClick={onClose}><span className="material-symbols-outlined text-on-surface-variant">close</span></button>
        </div>
        <div className="overflow-y-auto p-8 space-y-5 chat-scroll">
          <div className="grid sm:grid-cols-2 gap-4">
            {[{k:'title_ar',l:isRTL?'الاسم (عربي)':'Title (AR)',dir:'rtl'},{k:'title_en',l:'Name (EN)',dir:'ltr'}].map(({k,l,dir})=>(
              <div key={k}>
                <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{l}</label>
                <input value={String(f[k as keyof typeof f]??'')} onChange={e=>set(k,e.target.value)} dir={dir}
                  className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{isRTL?'السعر':'Price'}</label>
              <input type="number" value={f.price??0} onChange={e=>set('price',Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{isRTL?'السعر الأصلي (للشطب)':'Original Price (crossed)'}</label>
              <input type="number" value={f.original_price??''} onChange={e=>set('original_price',e.target.value?Number(e.target.value):undefined)}
                className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-3">{isRTL?'المدة الزمنية':'Duration'}</label>
            <div className="flex gap-2 flex-wrap">
              {durationOptions.map(opt=>(
                <button key={opt.value} type="button" onClick={()=>set('duration_type',opt.value)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${f.duration_type===opt.value?'bg-gradient-primary text-white border-transparent shadow-md':'border-outline-variant/30 text-on-surface-variant hover:border-primary'}`}>
                  {isRTL?opt.ar:opt.en}
                </button>
              ))}
            </div>
            {f.duration_type==='days' && (
              <div className="mt-3">
                <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{isRTL?'عدد الأيام':'Number of Days'}</label>
                <input type="number" min={1} value={f.duration_days??''} onChange={e=>set('duration_days',e.target.value?Number(e.target.value):undefined)}
                  placeholder={isRTL?'مثال: 30':'e.g. 30'}
                  className="w-40 px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
              </div>
            )}
            {f.duration_type==='none' && (
              <p className="mt-2 text-xs text-on-surface-variant opacity-70">
                {isRTL?'سيُعرض السعر فقط بدون مدة زمنية بجانبه.':'Price will be shown without any duration label.'}
              </p>
            )}
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-label font-black uppercase tracking-widest text-on-surface-variant">{isRTL?'المميزات':'Features'}</label>
              <button onClick={addFeat} className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined" style={{fontSize:14}}>add</span>{isRTL?'إضافة ميزة':'Add'}
              </button>
            </div>
            <div className="space-y-2">
              {(f.features??[]).map((feat,i)=>(
                <div key={i} className="flex gap-2 items-center bg-surface-container rounded-xl p-2">
                  <button onClick={()=>updFeat(i,'included',!feat.included)}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${feat.included?'bg-green-100 text-green-600':'bg-slate-100 text-slate-400'}`}>
                    <span className="material-symbols-outlined" style={{fontSize:14}}>{feat.included?'check':'close'}</span>
                  </button>
                  <input value={feat.text_ar} onChange={e=>updFeat(i,'text_ar',e.target.value)} placeholder="النص بالعربي" dir="rtl"
                    className="flex-1 px-2 py-1.5 rounded-lg border border-outline-variant/20 bg-white text-xs focus:outline-none focus:border-primary" />
                  <input value={feat.text_en} onChange={e=>updFeat(i,'text_en',e.target.value)} placeholder="English text" dir="ltr"
                    className="flex-1 px-2 py-1.5 rounded-lg border border-outline-variant/20 bg-white text-xs focus:outline-none focus:border-primary" />
                  <button onClick={()=>delFeat(i)} className="flex-shrink-0 text-error/50 hover:text-error">
                    <span className="material-symbols-outlined" style={{fontSize:16}}>delete</span>
                  </button>
                </div>
              ))}
              {(f.features??[]).length===0 && <p className="text-xs text-on-surface-variant text-center py-3 opacity-50">{isRTL?'لا توجد مميزات.':'No features.'}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">{isRTL?'الترتيب':'Order'}</label>
            <input type="number" value={f.order_index??0} onChange={e=>set('order_index',Number(e.target.value))}
              className="w-32 px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none" />
          </div>
        </div>
        <div className="px-8 py-5 border-t border-outline-variant/20 flex gap-3 flex-shrink-0">
          <button onClick={()=>onSave(f)} className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110">
            {isRTL?(plan.id?'حفظ التعديلات':'إضافة الخطة'):(plan.id?'Save Changes':'Add Plan')}
          </button>
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold">
            {isRTL?'إلغاء':'Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlansAdminPage() {
  const [plans,setPlans]     = useState<Plan[]>([]);
  const [loading,setLoading] = useState(true);
  const [modal,setModal]     = useState<Partial<Plan>|null>(null);
  const [lang,setLang]       = useState<'ar'|'en'>('ar');
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
    const res = await fetch('/api/plans-admin');
    if (res.ok) setPlans(await res.json());
    setLoading(false);
  };

  const save = async (plan:Partial<Plan>) => {
    await fetch('/api/plans-admin',{method:plan.id?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(plan)});
    setModal(null); load();
  };

  const setRec = async (planId:string) => {
    for (const p of plans) {
      await fetch('/api/plans-admin',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...p,is_recommended:p.id===planId})});
    }
    load();
  };

  const del = async (id:string) => {
    if (!confirm(isRTL?'حذف هذه الخطة؟':'Delete this plan?')) return;
    await fetch('/api/plans-admin',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})});
    load();
  };

  const durLabel = (p:Plan) => {
    if (p.duration_type==='none') return '';
    if (p.duration_type==='days') return isRTL?`/${p.duration_days} يوم`:`/${p.duration_days}d`;
    return isRTL?'/شهر':'/mo';
  };

  return (
    <div>
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-2">{isRTL?'الخطط التسويقية':'Marketing Plans'}</h2>
          <p className="text-on-surface-variant">{isRTL?'إدارة خطط الأسعار المعروضة للعملاء.':'Manage pricing plans shown to clients.'}</p>
        </div>
        <button onClick={()=>setModal({})} className="flex items-center gap-2 bg-gradient-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-110">
          <span className="material-symbols-outlined" style={{fontSize:18}}>add</span>
          {isRTL?'خطة جديدة':'New Plan'}
        </button>
      </div>

      <p className="mb-6 text-xs text-on-surface-variant flex items-center gap-1">
        <span className="material-symbols-outlined text-base text-primary">info</span>
        {isRTL?'يمكنك تعيين الخطة الموصى بها — ستظهر مميزة للعملاء.':'Set the recommended plan — it will be highlighted for clients.'}
      </p>

      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"/></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map(plan=>(
            <div key={plan.id} className={`plan-card bg-surface-container-lowest rounded-xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all ${plan.is_recommended?'recommended':''}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
                  <span className="material-symbols-outlined">workspace_premium</span>
                </div>
                {plan.is_recommended && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider" style={{background:'linear-gradient(90deg,#00658d,#00aeef)'}}>
                    {isRTL?'موصى بها ✦':'Recommended ✦'}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-on-surface">{isRTL?plan.title_ar:plan.title_en}</h3>
              <div className="text-3xl font-extrabold text-primary">
                {plan.price?.toLocaleString()}
                <span className="text-base font-semibold text-on-surface-variant ms-1">
                  {isRTL?plan.currency_ar:plan.currency_en}{durLabel(plan)}
                </span>
              </div>
              <ul className="space-y-3 flex-1">
                {(plan.features??[]).map(f=>(
                  <li key={f.id} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className={`material-symbols-outlined text-base ${f.included?'text-green-500':'text-slate-300'}`}>{f.included?'check_circle':'cancel'}</span>
                    <span className={f.included?'':'line-through opacity-50'}>{isRTL?f.text_ar:f.text_en}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-4 flex-wrap">
                <button onClick={()=>setModal(plan)} className="flex-1 py-2.5 rounded-lg border border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors">
                  {isRTL?'تعديل':'Edit'}
                </button>
                <button onClick={()=>!plan.is_recommended&&setRec(plan.id)}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${plan.is_recommended?'bg-primary text-white opacity-80 cursor-not-allowed':'bg-slate-100 text-slate-400 hover:bg-primary hover:text-white cursor-pointer'}`}>
                  {isRTL?(plan.is_recommended?'موصى بها ✓':'موصى بها'):(plan.is_recommended?'Recommended ✓':'Set Recommended')}
                </button>
                <button onClick={()=>del(plan.id)} className="px-3 py-2.5 rounded-lg border border-error/30 text-error/60 hover:text-error hover:border-error text-xs transition-colors">
                  <span className="material-symbols-outlined" style={{fontSize:16}}>delete</span>
                </button>
              </div>
            </div>
          ))}
          {plans.length===0 && (
            <div className="col-span-full text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">payments</span>
              {isRTL?'لا توجد خطط بعد.':'No plans yet.'}
            </div>
          )}
        </div>
      )}
      {modal!==null && <PlanModal plan={modal} onSave={save} onClose={()=>setModal(null)} lang={lang} />}
    </div>
  );
}
