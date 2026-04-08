'use client';
import { useEffect, useState } from 'react';
import type { Settings } from '@/types';

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [form, setForm]         = useState({ messenger_link: '', site_email: '' });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [saved, setSaved]       = useState(false);
  const [lang, setLang]         = useState<'ar' | 'en'>('ar');
  const isRTL = lang === 'ar';

  // جلب اللغة من localStorage
  useEffect(() => {
    const s = localStorage.getItem('joo-admin-lang') as 'ar' | 'en' | null;
    if (s) setLang(s);
  }, []);

  // جلب البيانات من DB مرة واحدة فقط
  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setForm({
          messenger_link: data.messenger_link ?? 'https://m.me/jooscale',
          site_email:     data.site_email     ?? 'hello@jooscale.com',
        });
        setLoading(false);
      });
  }, []); // [] مهم — مرة واحدة بس

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: settings.id, ...form }),
    });
    if (res.ok) {
      const updated = await res.json();
      setSettings(updated);
    }
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return (
    <div className="flex justify-center py-16">
      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  const fields = [
    {
      key: 'messenger_link',
      icon: 'chat', iconBg: '#0084FF',
      label_ar: 'رابط Messenger', label_en: 'Messenger Link',
      desc_ar: 'يُستخدم في زر التواصل الرئيسي في الموقع.',
      desc_en: 'Used in the main contact button on the site.',
      placeholder: 'https://m.me/jooscale', type: 'url',
    },
    {
      key: 'site_email',
      icon: 'alternate_email', iconBg: 'linear-gradient(135deg,#00658d,#00aeef)',
      label_ar: 'البريد الإلكتروني', label_en: 'Site Email',
      desc_ar: 'يظهر في الفوتر.', desc_en: 'Shown in the footer.',
      placeholder: 'hello@jooscale.com', type: 'email',
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-2">
          {isRTL ? 'الإعدادات' : 'Settings'}
        </h2>
        <p className="text-on-surface-variant">
          {isRTL ? 'إعدادات التواصل الظاهرة للعملاء.' : 'Contact settings shown to clients.'}
        </p>
      </div>

      <div className="max-w-2xl space-y-5">
        {fields.map(field => (
          <div key={field.key} className="bg-white rounded-2xl border border-outline-variant/20 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: field.iconBg }}>
                <span className="material-symbols-outlined text-white" style={{ fontSize: 20 }}>{field.icon}</span>
              </div>
              <div>
                <h3 className="font-black text-on-surface font-label text-sm">
                  {isRTL ? field.label_ar : field.label_en}
                </h3>
                <p className="text-xs text-on-surface-variant">
                  {isRTL ? field.desc_ar : field.desc_en}
                </p>
              </div>
            </div>
            <input
              type={field.type}
              value={form[field.key as keyof typeof form]}
              onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              dir="ltr"
              className="w-full px-4 py-3 rounded-xl border border-outline-variant/30 bg-surface-container text-sm text-on-surface focus:border-primary focus:outline-none"
            />
            {field.key === 'messenger_link' && form.messenger_link && (
              <a href={form.messenger_link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary font-bold mt-2 hover:underline">
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                {isRTL ? 'اختبر الرابط' : 'Test link'}
              </a>
            )}
          </div>
        ))}

        <div className="flex items-center gap-4 pt-2">
          <button onClick={save} disabled={saving}
            className="inline-flex items-center gap-2 bg-gradient-primary text-white px-8 py-3 rounded-xl font-black shadow-lg hover:brightness-110 disabled:opacity-60 transition-all">
            {saving
              ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{isRTL ? 'جاري الحفظ...' : 'Saving...'}</>
              : <><span className="material-symbols-outlined" style={{ fontSize: 18 }}>save</span>{isRTL ? 'حفظ الإعدادات' : 'Save Settings'}</>
            }
          </button>
          {saved && (
            <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
              {isRTL ? 'تم الحفظ!' : 'Saved!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
