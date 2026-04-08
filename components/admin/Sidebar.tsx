'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV = [
  { href:'/admin/dashboard',           icon:'category',      ar:'الخدمات المقدمة',   en:'Services'  },
  { href:'/admin/dashboard/plans',     icon:'payments',      ar:'الخطط التسويقية',   en:'Plans'     },
  { href:'/admin/dashboard/portfolio', icon:'photo_library', ar:'أعمالنا',           en:'Portfolio' },
  { href:'/admin/dashboard/ai',        icon:'smart_toy',     ar:'الذكاء الاصطناعي', en:'AI Center' },
  { href:'/admin/dashboard/settings',  icon:'settings',      ar:'الإعدادات',         en:'Settings'  },
];

export function Sidebar({ collapsed, onToggle, lang }: { collapsed:boolean; onToggle:()=>void; lang:'ar'|'en' }) {
  const pathname = usePathname();
  const router   = useRouter();
  const isRTL    = lang === 'ar';
  const logout   = () => { sessionStorage.removeItem('jooscale-admin'); router.push('/admin'); };

  return (
    <aside className={`admin-sidebar h-screen fixed top-0 bg-slate-50 flex flex-col py-4 z-50 sidebar-transition ${collapsed ? 'w-16' : 'w-64'}`}>

      {/* Logo area — صورة بس بدون نص */}
      <div className={`flex items-center px-4 py-4 border-b border-slate-100 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/scale logo.png" alt="Jooscale" className="h-9 object-contain"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        )}
        {/* زرار الـ collapse — ظاهر دايماً */}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary flex-shrink-0"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
            {collapsed ? 'menu_open' : 'menu'}
          </span>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-1 mt-4 overflow-y-auto">
        {NAV.map(item => {
          const active = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}
              className={`nav-link-active flex items-center gap-3 px-6 py-3 transition-colors ${
                active ? 'text-cyan-700 font-semibold bg-white/70 backdrop-blur-md' : 'text-slate-500 hover:text-cyan-600'
              } ${collapsed ? 'justify-center rounded-full' : 'rounded-r-full'}`}
              title={collapsed ? (isRTL ? item.ar : item.en) : undefined}
            >
              <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="text-sm font-medium truncate">{isRTL ? item.ar : item.en}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User card — صورة joo.png بدون إيميل */}
      <div className="mt-auto px-4 py-4">
        {!collapsed ? (
          <div className="p-4 rounded-xl bg-surface-container-low flex items-center gap-3">
            {/* صورة المستخدم */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/joo.png" alt="Youssef" className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const fallback = img.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }} />
            {/* Fallback icon */}
            <div className="w-10 h-10 rounded-full bg-primary-container items-center justify-center text-white flex-shrink-0 hidden">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-bold text-on-surface truncate">Youssef Ahmed</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/joo.png" alt="Youssef" className="w-10 h-10 rounded-full object-cover"
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
              }} />
          </div>
        )}
        <button onClick={logout}
          className={`mt-3 w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-error hover:bg-red-50 transition-colors text-xs font-bold ${collapsed ? 'justify-center' : ''}`}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
          {!collapsed && (isRTL ? 'تسجيل الخروج' : 'Logout')}
        </button>
      </div>
    </aside>
  );
}
