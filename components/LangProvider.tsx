'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '@/types';

interface Ctx {
  lang: Lang; setLang: (l: Lang) => void;
  t: <T extends ReactNode>(ar: T, en: T) => T;
  dir: 'rtl' | 'ltr';
}
const LangCtx = createContext<Ctx>({
  lang: 'ar', setLang: () => {},
  t: <T extends ReactNode>(ar: T) => ar,
  dir: 'rtl',
});

const TITLES: Record<Lang, string> = {
  ar: 'Jooscale | هندسة دقيقة لنمو جذري',
  en: 'Jooscale | Precision Engineering for Radical Growth',
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');

  const setLang = (l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr';
    document.title = TITLES[l];
    localStorage.setItem('joo-lang', l);
  };

  useEffect(() => {
    const saved = (localStorage.getItem('joo-lang') as Lang) ?? 'ar';
    setLangState(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir  = saved === 'ar' ? 'rtl' : 'ltr';
    document.title = TITLES[saved];
  }, []);

  const t   = <T extends ReactNode>(ar: T, en: T): T => (lang === 'ar' ? ar : en);
  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  return <LangCtx.Provider value={{ lang, setLang, t, dir }}>{children}</LangCtx.Provider>;
}
export const useLang = () => useContext(LangCtx);
