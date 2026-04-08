'use client';
import { useEffect, useRef, useState } from 'react';
import type { AIConfig } from '@/types';

export default function AIAdminPage() {
  const [config, setConfig]   = useState<AIConfig | null>(null);
  const [form, setForm]       = useState({ system_prompt: '', knowledge_base: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [lang, setLang]       = useState<'ar' | 'en'>('ar');
  // نحفظ آخر بيانات من الـ DB عشان نشيل الرجوع للافتراضي
  const dbDataRef = useRef<{ system_prompt: string; knowledge_base: string } | null>(null);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const saved = localStorage.getItem('joo-admin-lang') as 'ar' | 'en' | null;
    if (saved) setLang(saved);
  }, []);

  // اجلب البيانات من DB مرة واحدة فقط عند التحميل
  useEffect(() => {
    fetch('/api/ai-config')
      .then(r => r.json())
      .then(data => {
        const sp = data.system_prompt ?? '';
        const kb = data.knowledge_base ?? '';
        setConfig(data);
        setForm({ system_prompt: sp, knowledge_base: kb });
        dbDataRef.current = { system_prompt: sp, knowledge_base: kb };
        setLoading(false);
      });
  }, []); // [] عشان يشتغل مرة واحدة بس

  // لما اللغة تتغير، منغيرش الـ form — بس نغير الـ lang state
  const handleLangChange = (newLang: 'ar' | 'en') => {
    setLang(newLang);
    localStorage.setItem('joo-admin-lang', newLang);
  };

  const save = async () => {
    if (!config) return;
    setSaving(true);
    const res = await fetch('/api/ai-config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: config.id, ...form }),
    });
    if (res.ok) {
      const updated = await res.json();
      setConfig(updated);
      dbDataRef.current = { system_prompt: form.system_prompt, knowledge_base: form.knowledge_base };
    }
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const EXAMPLE_PROMPT = `أنت مساعد ذكي ودود لشركة [اسم الشركة] للتسويق الرقمي.

شخصيتك:
- ودود ومحترف
- موجز ومفيد
- تتحدث بلغة المستخدم (عربي أو إنجليزي)

قواعد:
- أجب فقط على الأسئلة المتعلقة بالشركة وخدماتها
- إذا سأل المستخدم عن التواصل، أعطه رابط Messenger
- لا تخترع معلومات غير موجودة في قاعدة المعرفة`;

  const EXAMPLE_KB = `=== معلومات الشركة ===
الاسم: Jooscale
التخصص: التسويق الرقمي والنمو

=== الخدمات الرئيسية ===
1. إدارة السوشيال ميديا (فيسبوك، إنستجرام، تيك توك)
2. تصميم الجرافيك والهوية البصرية
3. إنتاج المحتوى (صور، فيديوهات، ريلز)
4. إدارة الإعلانات المدفوعة (Meta Ads, Google Ads)
5. تصميم وبرمجة المواقع والصفحات

=== الأسعار ===
- باقة Starter: 1,500 ج.م/شهر
- باقة Growth: 3,500 ج.م/شهر
- باقة Pro: 7,000 ج.م/شهر

=== أوقات العمل ===
السبت - الخميس: 9 صباحاً - 11 مساءً`;

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-2">
          {isRTL ? 'الذكاء الاصطناعي' : 'AI Control Center'}
        </h2>
        <p className="text-on-surface-variant">
          {isRTL
            ? 'تحكم في شخصية المساعد الذكي وقاعدة معرفته.'
            : 'Control the AI assistant personality and knowledge base.'}
        </p>
      </div>

      {/* Info */}
      <div className="bg-secondary-container/30 border border-secondary-container rounded-2xl p-4 mb-8 flex gap-3">
        <span className="material-symbols-outlined text-secondary flex-shrink-0 mt-0.5" style={{ fontSize: 20 }}>info</span>
        <p className="text-sm text-on-secondary-container">
          {isRTL
            ? 'يتم إرسال البروميت وقاعدة المعرفة مع كل رسالة للعميل إلى Groq AI. النموذج يستخدم هذه المعلومات فقط للإجابة.'
            : 'The prompt and knowledge base are sent with every client message to Groq AI.'}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* System Prompt */}
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>psychology</span>
            </div>
            <div>
              <h3 className="font-black text-on-surface font-label">{isRTL ? 'بروميت النظام' : 'System Prompt'}</h3>
              <p className="text-xs text-on-surface-variant">{isRTL ? 'شخصية المساعد وقواعد سلوكه' : 'Assistant personality & rules'}</p>
            </div>
          </div>
          <textarea
            value={form.system_prompt}
            onChange={e => setForm(p => ({ ...p, system_prompt: e.target.value }))}
            rows={14} dir="auto"
            placeholder={EXAMPLE_PROMPT}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container text-sm text-on-surface focus:border-primary focus:outline-none resize-none font-mono leading-relaxed chat-scroll"
          />
          <button
            onClick={() => setForm(p => ({ ...p, system_prompt: EXAMPLE_PROMPT }))}
            className="text-xs text-primary hover:underline font-bold flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_fix_high</span>
            {isRTL ? 'استخدم مثالاً جاهزاً' : 'Load example'}
          </button>
        </div>

        {/* Knowledge Base */}
        <div className="bg-white rounded-2xl border border-outline-variant/20 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#059669,#0891b2)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>book</span>
            </div>
            <div>
              <h3 className="font-black text-on-surface font-label">{isRTL ? 'قاعدة المعرفة' : 'Knowledge Base'}</h3>
              <p className="text-xs text-on-surface-variant">{isRTL ? 'معلومات الشركة والخدمات والأسعار' : 'Company info, services & pricing'}</p>
            </div>
          </div>
          <textarea
            value={form.knowledge_base}
            onChange={e => setForm(p => ({ ...p, knowledge_base: e.target.value }))}
            rows={14} dir="auto"
            placeholder={EXAMPLE_KB}
            className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container text-sm text-on-surface focus:border-primary focus:outline-none resize-none font-mono leading-relaxed chat-scroll"
          />
          <button
            onClick={() => setForm(p => ({ ...p, knowledge_base: EXAMPLE_KB }))}
            className="text-xs text-primary hover:underline font-bold flex items-center gap-1">
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>auto_fix_high</span>
            {isRTL ? 'استخدم مثالاً جاهزاً' : 'Load example'}
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-4 mb-10">
        <button onClick={save} disabled={saving}
          className="inline-flex items-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-xl font-black shadow-lg hover:brightness-110 transition-all disabled:opacity-60">
          {saving
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isRTL ? 'جاري الحفظ...' : 'Saving...'}</>
            : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>{isRTL ? 'حفظ الإعدادات' : 'Save Settings'}</>
          }
        </button>
        {saved && (
          <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
            {isRTL ? 'تم الحفظ بنجاح!' : 'Saved successfully!'}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant/20">
        <h4 className="font-black text-on-surface font-label mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary" style={{ fontSize: 20 }}>tips_and_updates</span>
          {isRTL ? 'نصائح لقاعدة معرفة قوية' : 'Tips for a powerful knowledge base'}
        </h4>
        <ul className="space-y-2 text-sm text-on-surface-variant">
          {(isRTL ? [
            'اكتب جميع خدماتك بالتفصيل مع الأسعار — كلما كانت المعلومات أدق، كانت إجابات الـ AI أدق',
            'أضف أوقات العمل وطرق التواصل',
            'اكتب بالعربية والإنجليزي لأن النموذج يرد بلغة العميل',
            'استخدم عناوين واضحة مثل: === الخدمات === لتنظيم المعلومات',
          ] : [
            'Write all your services with details and prices — the more specific, the better AI answers',
            'Include working hours and contact methods',
            'Write in both Arabic and English so the AI replies in the client\'s language',
            'Use clear headings like === Services === to organize information',
          ]).map((tip, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5" style={{ fontSize: 16 }}>check</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
