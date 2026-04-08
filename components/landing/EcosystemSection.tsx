'use client';
import { useLang } from '@/components/LangProvider';
const CODE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGoi0i6tdqkhUMro0KrIGy_W_XghAyF2MMjslTkxqMa2cUFPS8UiOFCYygfVw0WcoG7UGikqIu20z_waYUxXkKIDvkqXwljSFefKaui_5q-FNUUjjYf4CHXAw4hbjWUKLtMscLvxkENv_LFLJVIwmkcuHCyzfRVPaobEEj9YTaUzEA_xofLsN8USUMD7EBSqtgBVAVSHjvNNAhPQNfpL1EOVWNrTOka3Fht-P1evFZTsjW1DM5BqvJ20o5ULOeoZ7_od0B0MNFv_c';
export function EcosystemSection() {
  const { t } = useLang();
  return (
    <section className="px-6 py-24 bg-surface-container-low" id="ecosystem">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-label font-bold text-primary uppercase tracking-[0.2em] mb-4">
            {t('المنظومة الأساسية', 'Core Ecosystem')}
          </h2>
          <p className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface max-w-2xl">
            {t('هندسة موحدة للهيمنة على السوق', 'A Unified Architecture for Market Dominance')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Marketing — md:col-span-2 */}
          <div className="md:col-span-2 lg:col-span-2 bg-white p-8 rounded-[2rem] flex flex-col justify-between hover:shadow-xl transition-shadow border border-white">
            <div>
              <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: 40 }}>campaign</span>
              <h3 className="text-2xl font-headline font-bold mb-4">{t('التسويق الاستراتيجي', 'Strategic Marketing')}</h3>
              <p className="text-on-surface-variant leading-relaxed">
                {t('تسويق أداء متعدد القنوات مدفوع بعلم النفس السلوكي وتحسين العروض في الوقت الفعلي.','Multi-channel performance marketing driven by behavioral psychology and real-time bid optimization.')}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {['SEO','Performance','Content'].map(tag=>(
                <span key={tag} className="px-4 py-1.5 bg-surface-container rounded-full text-xs font-bold text-on-surface-variant uppercase tracking-wider">{tag}</span>
              ))}
            </div>
          </div>
          {/* Tech */}
          <div className="bg-white p-8 rounded-[2rem] flex flex-col hover:shadow-xl transition-shadow border border-white">
            <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: 40 }}>terminal</span>
            <h3 className="text-2xl font-headline font-bold mb-4">{t('التقنيات','Tech Stack')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              {t('بنى برمجية مؤسسية مصممة للتوسع اللانهائي والأمان.','Custom-built enterprise software architectures designed for infinite scalability and security.')}
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={CODE_IMG} alt="Code interface" className="rounded-xl mt-auto object-cover h-32" />
          </div>
          {/* Data */}
          <div className="bg-white p-8 rounded-[2rem] flex flex-col hover:shadow-xl transition-shadow border border-white">
            <span className="material-symbols-outlined text-primary mb-6 block" style={{ fontSize: 40 }}>query_stats</span>
            <h3 className="text-2xl font-headline font-bold mb-4">{t('عمليات البيانات','Data Ops')}</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t('حوّل البيانات المتفرقة إلى ذكاء قابل للتنفيذ عبر خطوط BI الحصرية لدينا.','Turn fragmented data into actionable intelligence with our proprietary BI pipelines.')}
            </p>
          </div>
          {/* Protocol — full width */}
          <div className="md:col-span-3 lg:col-span-4 bg-gradient-primary p-12 rounded-[2rem] text-white flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            <div className="relative z-10 lg:w-1/2">
              <h3 className="text-3xl lg:text-4xl font-headline font-bold mb-6">{t('بروتوكول النمو','The Growth Protocol')}</h3>
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                {t('منهجية خاصة تدمج التقنية والبيانات والتسويق في حلقة ذاتية التحسين. نسميها "البروتوكول" — المخطط لتوسع المؤسسات الحديثة.','A proprietary methodology that integrates tech, data, and marketing into a self-optimizing loop. We call it "The Protocol"—the blueprint for modern enterprise scaling.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
