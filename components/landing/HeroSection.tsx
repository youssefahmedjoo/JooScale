'use client';
import { useLang } from '@/components/LangProvider';

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlKs1jz1J_LjzOLv8EAi4VXZgX1AXSy1bSA7Uml9uazHBJZd9tgfnS5Qwa1VXU5UW--oz2T2A4aiJKtYksQMMUQq0y08wsueUWDBiFYQNhGPZi3UWbJ-dNgh3EUp24v7LA0UslKNMpxex-pk5k8lbu-1vWUhL-5J29Jbav1GEc7uOlSrwEMNjDVq3Wij_zemAtc_9kOp0RlQ3xkBw1R_Rgt76KrDgLUi3RMbf8tAbR_Pm2jPOKrNOCWpZmdIvpISPp8pUbZnu-WAA';

export function HeroSection({ messengerLink }: { messengerLink: string }) {
  const { t } = useLang();
  return (
    <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-label mb-6">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>rocket_launch</span>
            {t('الجيل القادم من النمو', 'THE NEXT EVOLUTION OF SCALE')}
          </div>
          <h1 className="text-5xl lg:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] mb-8 text-on-surface">
            {t(
              <> هندسة دقيقة لـ<br /><span className="text-gradient">نمو جذري</span></>,
              <> Precision Engineering for<br /><span className="text-gradient">Radical Growth</span></>
            )}
          </h1>
          <p className="text-lg lg:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
            {t(
              'لا نسوّق المنتجات فحسب؛ نبني محركات نمو عالية الأداء. منظومتنا تجسر الهوة بين الهندسة التقنية والتسويق الإبداعي.',
              "We don't just market products; we build high-performance growth engines. Our ecosystem bridges the gap between technical architecture and creative marketing."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href={messengerLink} target="_blank" rel="noopener noreferrer">
              <button className="bg-gradient-primary text-on-primary px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                {t('ابدأ النمو', 'Launch Growth')}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </a>
          </div>
        </div>
        {/* Right — tilted image exactly like HTML */}
        <div className="relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px]" />
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="Data Analytics Dashboard" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
