'use client';
import { useEffect, useState } from 'react';
import { useLang } from '@/components/LangProvider';

interface HeaderProps {
  messengerLink: string;
  hasServices: boolean;
  hasPlans: boolean;
  hasPortfolio: boolean;
}

export function Header({ messengerLink, hasServices, hasPlans, hasPortfolio }: HeaderProps) {
  const { lang, setLang, t } = useLang();
  const [active, setActive] = useState('home');

  const allNav = [
    { ar:'الرئيسية', en:'Home',        href:'#',          id:'home',      show:true         },
    { ar:'الخدمات',  en:'Services',    href:'#services',  id:'services',  show:hasServices  },
    { ar:'الباقات',  en:'Plans',       href:'#plans',     id:'plans',     show:hasPlans     },
    { ar:'أعمالنا',  en:'Portfolio',   href:'#portfolio', id:'portfolio', show:hasPortfolio },
    { ar:'اشترِ',    en:'Buy Service', href:'#contact',   id:'contact',   show:true         },
  ];
  const nav = allNav.filter(n => n.show);

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
    <header className="bg-white/80 backdrop-blur-md fixed top-0 z-50 flex justify-between items-center w-full px-6 py-4 border-b border-outline-variant/20">
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/scale logo.png" alt="Jooscale" width={160} height={40} className="object-contain h-10"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
      <nav className="hidden md:flex items-center gap-8 font-label text-xs font-bold uppercase tracking-[0.15em]">
        {nav.map(l => (
          <a key={l.id} href={l.href}
            className={`transition-colors ${active === l.id ? 'text-primary font-extrabold' : 'text-on-surface-variant hover:text-primary'}`}>
            {t(l.ar, l.en)}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
          className="glass-card border border-primary/20 rounded-full px-4 py-2 flex items-center gap-2 hover:bg-white transition-all shadow-sm group">
          <span className="material-symbols-outlined text-primary group-hover:rotate-12 transition-transform" style={{ fontSize: 18 }}>language</span>
          <span className="font-label text-[11px] font-extrabold tracking-widest text-on-surface-variant">{lang === 'ar' ? 'EN' : 'AR'}</span>
        </button>
      </div>
    </header>
  );
}
