'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    await new Promise(r=>setTimeout(r,500));
    if (username==='Youssef Ahmed' && password==='Youssef#010') {
      sessionStorage.setItem('jooscale-admin','1');
      router.push('/admin/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background:'linear-gradient(135deg,#001e2d,#003a57,#004c6b)' }} dir="rtl" lang="ar">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          {/* scale logo.png */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/scale logo.png" alt="Jooscale" className="h-16 mx-auto object-contain mb-4"
            onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
          <p className="text-white/40 text-sm font-label">Admin Control Panel</p>
        </div>
        <div className="bg-white rounded-[2rem] p-10 shadow-2xl">
          <h2 className="font-headline font-black text-on-surface text-2xl mb-8 text-center">تسجيل الدخول</h2>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-2">اسم المستخدم</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant" style={{fontSize:20}}>person</span>
                <input type="text" value={username} onChange={e=>setUsername(e.target.value)} required placeholder="اسم المستخدم"
                  className="w-full pr-10 pl-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container focus:border-primary focus:outline-none text-on-surface text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-2">كلمة المرور</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant" style={{fontSize:20}}>lock</span>
                <input type={showPass?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full pr-10 pl-10 py-3 rounded-xl border border-outline-variant/30 bg-surface-container focus:border-primary focus:outline-none text-on-surface text-sm" />
                <button type="button" onClick={()=>setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface">
                  <span className="material-symbols-outlined" style={{fontSize:20}}>{showPass?'visibility_off':'visibility'}</span>
                </button>
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-error-container text-error text-sm font-bold">
                <span className="material-symbols-outlined" style={{fontSize:18}}>error</span>{error}
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-primary text-white py-3.5 rounded-xl font-black text-sm shadow-lg hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>جاري التحقق...</>
                : <><span className="material-symbols-outlined" style={{fontSize:18}}>login</span>دخول</>
              }
            </button>
          </form>
        </div>
        <p className="text-center text-white/20 text-xs mt-6">Jooscale Admin © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
