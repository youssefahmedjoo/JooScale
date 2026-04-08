'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';

interface MobileNavProps {
  hasServices: boolean;
  hasPlans: boolean;
  hasPortfolio: boolean;
}

export function MobileNav({ hasServices, hasPlans, hasPortfolio }: MobileNavProps) {
  const { t } = useLang();
  const [active, setActive] = useState('home');

  const allItems = [
    { href:'#',          icon:'home',         ar:'الرئيسية', en:'Home',      id:'home',      show:true         },
    { href:'#services',  icon:'category',      ar:'الخدمات',  en:'Services',  id:'services',  show:hasServices  },
    { href:'#plans',     icon:'payments',      ar:'الباقات',  en:'Plans',     id:'plans',     show:hasPlans     },
    { href:'#portfolio', icon:'photo_library', ar:'أعمالنا',  en:'Portfolio', id:'portfolio', show:hasPortfolio },
    { href:'#contact',   icon:'shopping_cart', ar:'اشترِ',    en:'Buy',       id:'contact',   show:true         },
  ];
  const items = allItems.filter(i => i.show);

  useEffect(() => {
    const ids = ['services','plans','portfolio','contact'];
    const obs: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.3 });
      o.observe(el); obs.push(o);
    });
    const onScroll = () => { if (window.scrollY < 200) setActive('home'); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { obs.forEach(o => o.disconnect()); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-2 bg-white/80 backdrop-blur-2xl border-t border-slate-100/10 shadow-[0px_-12px_32px_rgba(23,28,32,0.06)] rounded-t-[24px]">
      {items.map(item => (
        <a key={item.id} href={item.href}
          className={`flex flex-col items-center justify-center rounded-xl px-2 py-1 transition-colors ${active === item.id ? 'bg-cyan-50 text-[#00AEEF]' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-[8px] uppercase tracking-widest font-bold">{t(item.ar, item.en)}</span>
        </a>
      ))}
    </nav>
  );
}
