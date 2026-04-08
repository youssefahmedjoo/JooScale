'use client';
import { useLang } from '@/components/LangProvider';
import type { Plan } from '@/types';

function formatDuration(plan: Plan, lang: 'ar' | 'en'): string {
  if (plan.duration_type === 'none') return '';
  if (plan.duration_type === 'month') return lang === 'ar' ? '/شهر' : '/mo';
  if (plan.duration_type === 'days' && plan.duration_days)
    return lang === 'ar' ? `/${plan.duration_days} يوم` : `/${plan.duration_days} days`;
  return '';
}

export function PlansSection({ plans, messengerLink }: { plans: Plan[]; messengerLink: string }) {
  const { lang, t } = useLang();
  if (!plans.length) return null;

  return (
    <section className="px-6 py-24 bg-surface" id="plans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-label font-bold text-primary uppercase tracking-[0.2em] mb-4">{t('أسعار دقيقة','Precision Pricing')}</h2>
          <p className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface">{t('خطط الأداء','Performance Plans')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map(plan => {
            const rec  = plan.is_recommended;
            const curr = lang === 'ar' ? plan.currency_ar : plan.currency_en;
            const dur  = formatDuration(plan, lang);
            return (
              <div key={plan.id} className={`bg-white rounded-[2rem] flex flex-col relative ${rec
                ? 'p-10 shadow-[0px_30px_60px_rgba(0,101,141,0.12)] border-2 border-primary-container md:-translate-y-4'
                : 'p-8 border border-outline-variant/10 shadow-sm hover:shadow-xl transition-shadow'}`}>
                {rec && (
                  <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary-container text-white text-[10px] uppercase font-black px-4 py-1.5 rounded-full tracking-widest shadow-lg">
                    {t('الأكثر طلباً','Recommended')}
                  </div>
                )}
                <h3 className="text-xl font-bold text-on-surface mb-2">{lang === 'ar' ? plan.title_ar : plan.title_en}</h3>
                {plan.original_price ? (
                  <div className="flex flex-col mb-8">
                    <span className="text-sm text-error font-bold line-through opacity-60 mb-1">{plan.original_price.toLocaleString()} {curr}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold tracking-tighter text-primary">{plan.price.toLocaleString()}</span>
                      <span className="text-on-surface-variant font-bold text-sm uppercase">{curr}{dur}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold tracking-tighter text-primary">{plan.price.toLocaleString()}</span>
                    <span className="text-on-surface-variant font-bold text-sm uppercase">{curr}{dur}</span>
                  </div>
                )}
                <div className="space-y-4 flex-grow mb-10">
                  {(plan.features ?? []).map(f => (
                    <div key={f.id} className={`flex items-center gap-3 text-sm font-medium ${rec ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                      <span className="material-symbols-outlined text-[#00AEEF]"
                        style={{ fontSize: 18, fontVariationSettings: rec ? "'FILL' 1" : "'FILL' 0" }}>check_circle</span>
                      {lang === 'ar' ? f.text_ar : f.text_en}
                    </div>
                  ))}
                </div>
                <a href={messengerLink} target="_blank" rel="noopener noreferrer"
                  className={`w-full py-4 rounded-full font-bold text-center text-sm transition-all block ${rec
                    ? 'bg-gradient-primary text-white shadow-lg hover:brightness-110'
                    : 'border-2 border-primary-container text-primary hover:bg-primary-container/10'}`}>
                  {t('اختر هذه الخطة','Get Started')}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
