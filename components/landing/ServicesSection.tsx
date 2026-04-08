'use client';
import { useLang } from '@/components/LangProvider';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { Service } from '@/types';

export function ServicesSection({ services }: { services: Service[] }) {
  const { lang, t } = useLang();
  if (!services.length) return null;

  return (
    <section className="px-6 py-24 bg-on-surface text-white overflow-hidden relative" id="services">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-sm font-label font-bold text-primary-container uppercase tracking-[0.2em] mb-4">
            {t('ما نقدمه','What We Offer')}
          </h2>
          <p className="text-4xl font-headline font-extrabold">
            {t('خدمات مقدمة','Services Offered')}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(svc => (
            <div key={svc.id} className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                <div className="text-primary-container" style={{ width: 40, height: 40 }}>
                  <DynamicIcon src={svc.icon_source} size={40} className="text-primary-container" />
                </div>
                {svc.price > 0 && (
                  <span className="text-primary-container font-black text-sm">
                    {svc.price.toLocaleString()} {lang === 'ar' ? svc.currency_ar : svc.currency_en}
                    {lang === 'ar' ? svc.price_suffix_ar : svc.price_suffix_en}
                  </span>
                )}
              </div>
              <h4 className="text-lg font-bold mb-2">{lang === 'ar' ? svc.title_ar : svc.title_en}</h4>
              <p className="text-white/60 text-xs leading-relaxed">{lang === 'ar' ? svc.desc_ar : svc.desc_en}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
