'use client';
import { useLang } from '@/components/LangProvider';

export function ContactSection({ messengerLink }: { messengerLink: string }) {
  const { t } = useLang();
  return (
    <section className="px-6 py-32 bg-surface-container-low overflow-hidden" id="contact">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold font-label mb-8">
          <span className="material-symbols-outlined" style={{ fontSize:14 }}>forum</span>
          {t('وصول مباشر لمهندسي النمو','DIRECT ACCESS TO GROWTH ARCHITECTS')}
        </div>
        <h2 className="text-4xl lg:text-6xl font-headline font-extrabold text-on-surface mb-8 tracking-tight">
          {t(
            <> هل أنت مستعد لهندسة <span className="text-gradient">نموك؟</span></>,
            <> Ready to Engineer Your <span className="text-gradient">Growth?</span></>
          )}
        </h2>
        <p className="text-lg lg:text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto leading-relaxed">
          {t(
            'تخطَّ النماذج. تواصل مباشرة مع مهندسي الأداء عبر Messenger للحصول على استشارة استراتيجية مخصصة.',
            'Skip the forms. Connect directly with our performance engineers via Messenger for a tailored strategy consultation.'
          )}
        </p>
        <div className="flex flex-col items-center justify-center">
          {/* Exact Messenger button from HTML */}
          <a
            href={messengerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="messenger-btn-pulse flex items-center gap-4 text-white px-12 py-6 rounded-full font-extrabold text-2xl hover:scale-105 active:scale-95 transition-all group"
            style={{ backgroundColor:'#0084FF', boxShadow:'0 20px 50px rgba(0,132,255,0.3)' }}
          >
            <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 3.22 1.47 6.08 3.75 7.93V23l3.22-1.77c.97.27 1.99.41 3.03.41 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm1.21 12.87l-2.54-2.72-4.96 2.72 5.45-5.8 2.59 2.72 4.91-2.72-5.45 5.8z"/>
            </svg>
            <span>Messenger</span>
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
          </a>
          <p className="mt-6 text-sm font-bold text-on-surface-variant/60 uppercase tracking-[0.2em]">
            {t('متاح 24/7 عبر القناة الرسمية','Available 24/7 via Official Channel')}
          </p>
        </div>
      </div>
    </section>
  );
}
