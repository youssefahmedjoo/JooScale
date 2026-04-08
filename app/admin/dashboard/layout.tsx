'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/Sidebar';

const TITLES: Record<string, { ar: string; en: string }> = {
  '/admin/dashboard':           { ar: 'الخدمات المقدمة',      en: 'Services'         },
  '/admin/dashboard/plans':     { ar: 'الخطط التسويقية',      en: 'Marketing Plans'  },
  '/admin/dashboard/portfolio': { ar: 'أعمالنا',              en: 'Portfolio'        },
  '/admin/dashboard/ai':        { ar: 'الذكاء الاصطناعي',    en: 'AI Center'        },
  '/admin/dashboard/settings':  { ar: 'الإعدادات',            en: 'Settings'         },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang]             = useState<'ar' | 'en'>('ar');
  const [ready, setReady]           = useState(false);
  const router   = useRouter();
  const pathname = usePathname();

  const applyLang = (l: 'ar' | 'en') => {
    document.documentElement.lang = l;
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    if (!sessionStorage.getItem('jooscale-admin')) { router.replace('/admin'); return; }
    const saved = (localStorage.getItem('joo-admin-lang') as 'ar' | 'en') ?? 'ar';
    setLang(saved); applyLang(saved); setReady(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleLang = (l: 'ar' | 'en') => {
    setLang(l); applyLang(l); localStorage.setItem('joo-admin-lang', l);
  };

  if (!ready) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const isRTL = lang === 'ar';
  const title = TITLES[pathname] ?? { ar: 'لوحة التحكم', en: 'Dashboard' };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} lang={lang} />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
          <div className="fixed top-0 z-50 h-screen md:hidden" style={{ [isRTL ? 'right' : 'left']: 0 }}>
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} lang={lang} />
          </div>
        </>
      )}

      {/* Header */}
      <header
        className={`admin-header${collapsed ? ' collapsed' : ''} fixed top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex justify-between items-center px-4 md:px-8 h-16 md:h-20 sidebar-transition`}
      >
        <div className="flex items-center gap-3">
          {/* Mobile hamburger — ظاهر على الموبايل بس */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>menu</span>
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-on-surface">{isRTL ? title.ar : title.en}</h1>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Language toggle */}
          <div className="flex items-center gap-1 bg-slate-100 rounded-full p-1">
            <button onClick={() => toggleLang('ar')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'ar' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}>
              عربي
            </button>
            <button onClick={() => toggleLang('en')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-primary text-white' : 'text-slate-500 hover:text-primary'}`}>
              EN
            </button>
          </div>
          <a href="/" target="_blank" title={isRTL ? 'معاينة الموقع' : 'Preview Site'}
            className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>open_in_new</span>
          </a>
        </div>
      </header>

      {/* Main */}
      <main className={`admin-main${collapsed ? ' collapsed' : ''} pt-20 md:pt-24 min-h-screen px-4 md:px-8 pb-16 sidebar-transition`}>
        {children}
      </main>
    </div>
  );
}
