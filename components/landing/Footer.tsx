'use client';
import { useState } from 'react';
import { useLang } from '@/components/LangProvider';

function Modal({ title, onClose, children }: { title:string; onClose:()=>void; children:React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl z-10 flex flex-col" style={{ maxHeight:'80vh' }}>
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 flex-shrink-0">
          <h2 className="font-headline font-bold text-on-surface text-lg">{title}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>
        <div className="overflow-y-auto p-8 text-on-surface-variant leading-relaxed text-sm space-y-4 chat-scroll">{children}</div>
      </div>
    </div>
  );
}

export function Footer({ messengerLink, email }: { messengerLink:string; email:string }) {
  const { t } = useLang();
  const [modal, setModal] = useState<null|'privacy'|'terms'>(null);

  const navLinks = [
    { ar:'الرئيسية', en:'Home',        href:'#'          },
    { ar:'الخدمات',  en:'Services',    href:'#ecosystem' },
    { ar:'الباقات',  en:'Plans',       href:'#plans'     },
    { ar:'اشترِ',    en:'Buy Service', href:'#contact'   },
  ];

  return (
    <>
      {/* Exact from landing.html: bg-[#12191f] pt-20 pb-10 */}
      <footer className="pt-20 pb-10" style={{ backgroundColor:'#12191f', color:'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand — scale logo.png */}
            <div className="lg:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/scale logo.png" alt="Jooscale" width={160} height={40} className="object-contain h-10"
                onError={e=>{(e.target as HTMLImageElement).style.display='none';}} />
              <p className="mt-6 text-white/60 max-w-sm leading-relaxed">
                {t('نبني محركات نمو عالية الأداء تجمع بين الهندسة التقنية والتسويق الإبداعي لنتائج حقيقية وقابلة للقياس.','We build high-performance growth engines that bridge technical architecture and creative marketing for real, measurable results.')}
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/40">{t('روابط سريعة','Quick Links')}</h4>
              <ul className="space-y-4">
                {navLinks.map(l=>(
                  <li key={l.href}><a href={l.href} className="text-white/60 hover:text-white transition-colors">{t(l.ar,l.en)}</a></li>
                ))}
              </ul>
            </div>
            {/* Connect */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/40">{t('تواصل','Connect')}</h4>
              <ul className="space-y-4">
                <li>
                  <a href={messengerLink} className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">chat</span> Messenger
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">alternate_email</span> {t('راسلنا','Email Us')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-xs">
            <p>© {new Date().getFullYear()} Jooscale Solutions FZ-LLC. {t('جميع الحقوق محفوظة.','All rights reserved.')}</p>
            <div className="flex gap-8">
              <button onClick={()=>setModal('privacy')} className="hover:text-white transition-colors">{t('سياسة الخصوصية','Privacy Policy')}</button>
              <button onClick={()=>setModal('terms')}   className="hover:text-white transition-colors">{t('شروط الخدمة','Terms of Service')}</button>
            </div>
          </div>
        </div>
      </footer>

      {modal==='privacy' && (
        <Modal title={t('سياسة الخصوصية','Privacy Policy')} onClose={()=>setModal(null)}>
          <h3 className="font-bold text-on-surface">{t('جمع البيانات','Data Collection')}</h3>
          <p>{t('نجمع فقط البيانات التي تقدمها طوعاً. لا نبيع بياناتك لأي طرف ثالث.','We only collect data you voluntarily provide. We never sell your data to third parties.')}</p>
          <h3 className="font-bold text-on-surface">{t('استخدام البيانات','Data Use')}</h3>
          <p>{t('تُستخدم بياناتك فقط للتواصل معك والرد على استفساراتك.','Your data is used solely to contact you and respond to your inquiries.')}</p>
          <h3 className="font-bold text-on-surface">{t('التواصل','Contact')}</h3>
          <p>{t('لأي استفسار:','For any inquiry:')} {email}</p>
        </Modal>
      )}
      {modal==='terms' && (
        <Modal title={t('شروط الخدمة','Terms of Service')} onClose={()=>setModal(null)}>
          <h3 className="font-bold text-on-surface">{t('قبول الشروط','Acceptance')}</h3>
          <p>{t('باستخدامك لموقعنا أو خدماتنا فإنك توافق على هذه الشروط.','By using our site or services you agree to these terms.')}</p>
          <h3 className="font-bold text-on-surface">{t('الخدمات','Services')}</h3>
          <p>{t('نقدم خدمات التسويق الرقمي. تفاصيل كل مشروع تُحدد في العقد المنفصل.','We provide digital marketing services. Each project is detailed in a separate contract.')}</p>
          <h3 className="font-bold text-on-surface">{t('الدفع','Payment')}</h3>
          <p>{t('تُدفع الرسوم وفقاً للجدول المتفق عليه.','Fees are paid per the agreed schedule.')}</p>
          <h3 className="font-bold text-on-surface">{t('الملكية الفكرية','Intellectual Property')}</h3>
          <p>{t('تنتقل ملكية المحتوى المنتج إليك بعد اكتمال الدفع الكامل.','Content ownership transfers to you upon full payment.')}</p>
        </Modal>
      )}
    </>
  );
}
