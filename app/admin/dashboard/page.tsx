"use client";

import { useEffect, useState } from "react";
import { DynamicIcon } from "@/components/DynamicIcon";
import { isSvgCode } from "@/lib/utils";
import type { Service } from "@/types";

function Field({
  label,
  value,
  onChange,
  type = "text",
  dir = "auto",
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  dir?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        dir={dir}
        className="w-full px-3 py-2.5 rounded-xl border border-outline-variant/30 bg-surface-container text-on-surface focus:border-primary focus:outline-none text-sm"
      />
    </div>
  );
}

function ServiceModal({
  initial,
  onSave,
  onClose,
  lang,
}: {
  initial: Partial<Service>;
  onSave: (d: Partial<Service>) => void;
  onClose: () => void;
  lang: "ar" | "en";
}) {
  const isRTL = lang === "ar";
  const [f, setF] = useState<Partial<Service>>({
    title_ar: "",
    title_en: "",
    desc_ar: "",
    desc_en: "",
    price: 0,
    currency_ar: "ج.م",
    currency_en: "EGP",
    price_suffix_ar: "",
    price_suffix_en: "",
    icon_source: "",
    order_index: 0,
    ...initial,
  });
  const s = (k: string, v: string | number) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className="relative bg-white rounded-[2rem] max-w-2xl w-full shadow-2xl z-10 flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/20 flex-shrink-0">
          <h2 className="font-bold text-on-surface text-xl">
            {isRTL
              ? initial.id
                ? "تعديل الخدمة"
                : "إضافة خدمة"
              : initial.id
                ? "Edit Service"
                : "Add Service"}
          </h2>
          <button onClick={onClose}>
            <span className="material-symbols-outlined text-on-surface-variant">
              close
            </span>
          </button>
        </div>
        <div className="overflow-y-auto p-8 space-y-5 chat-scroll">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label={isRTL ? "الاسم (عربي)" : "Title (AR)"}
              value={f.title_ar ?? ""}
              onChange={(v) => s("title_ar", v)}
              dir="rtl"
            />
            <Field
              label="Name (EN)"
              value={f.title_en ?? ""}
              onChange={(v) => s("title_en", v)}
              dir="ltr"
            />
            <Field
              label={isRTL ? "الوصف (عربي)" : "Desc (AR)"}
              value={f.desc_ar ?? ""}
              onChange={(v) => s("desc_ar", v)}
              dir="rtl"
            />
            <Field
              label="Description (EN)"
              value={f.desc_en ?? ""}
              onChange={(v) => s("desc_en", v)}
              dir="ltr"
            />
            <Field
              label={isRTL ? "السعر" : "Price"}
              value={String(f.price ?? 0)}
              onChange={(v) => s("price", Number(v))}
              type="number"
            />
            <Field
              label={isRTL ? "العملة (ع)" : "Currency AR"}
              value={f.currency_ar ?? "ج.م"}
              onChange={(v) => s("currency_ar", v)}
            />
            <Field
              label="Currency EN"
              value={f.currency_en ?? "EGP"}
              onChange={(v) => s("currency_en", v)}
              dir="ltr"
            />
            <Field
              label={isRTL ? "اللاحقة (ع) مثال: / شهر" : "Suffix AR e.g. / شهر"}
              value={f.price_suffix_ar ?? ""}
              onChange={(v) => s("price_suffix_ar", v)}
            />
            <Field
              label="Suffix EN e.g. / mo"
              value={f.price_suffix_en ?? ""}
              onChange={(v) => s("price_suffix_en", v)}
              dir="ltr"
            />
            <Field
              label={isRTL ? "الترتيب" : "Order"}
              value={String(f.order_index ?? 0)}
              onChange={(v) => s("order_index", Number(v))}
              type="number"
            />
          </div>
          {/* Icon */}
          <div>
            <label className="block text-xs font-label font-black uppercase tracking-widest text-on-surface-variant mb-2">
              {isRTL ? "الأيقونة (SVG Code أو URL)" : "Icon (SVG Code or URL)"}
            </label>
            <div className="flex gap-3">
              <textarea
                value={f.icon_source ?? ""}
                onChange={(e) => s("icon_source", e.target.value)}
                rows={3}
                placeholder="<svg>...</svg> or https://..."
                className="flex-1 px-3 py-2 rounded-xl border border-outline-variant/30 bg-surface-container text-sm focus:border-primary focus:outline-none resize-none"
              />
              <div className="w-14 h-14 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center text-primary flex-shrink-0">
                <DynamicIcon
                  src={f.icon_source ?? ""}
                  size={28}
                  className="text-primary"
                />
              </div>
            </div>
            {f.icon_source && isSvgCode(f.icon_source ?? "") && (
              <p className="text-[10px] text-green-600 font-bold mt-1 flex items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 12 }}
                >
                  check_circle
                </span>
                SVG — inherits brand color
              </p>
            )}
          </div>
        </div>
        <div className="px-8 py-5 border-t border-outline-variant/20 flex gap-3 flex-shrink-0">
          <button
            onClick={() => onSave(f)}
            className="bg-gradient-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:brightness-110"
          >
            {isRTL
              ? initial.id
                ? "حفظ"
                : "إضافة"
              : initial.id
                ? "Save"
                : "Add"}
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-sm font-bold"
          >
            {isRTL ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<Service> | null>(null);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const isRTL = lang === "ar";

  useEffect(() => {
    const saved = localStorage.getItem("joo-admin-lang") as "ar" | "en" | null;
    if (saved) setLang(saved);
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
    setLoading(false);
  };

  const save = async (data: Partial<Service>) => {
    await fetch("/api/services", {
      method: data.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setModal(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm(isRTL ? "حذف هذه الخدمة؟" : "Delete this service?")) return;
    await fetch("/api/services", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-on-surface mb-2">
            {isRTL ? "الخدمات المقدمة" : "Services Offered"}
          </h2>
          <p className="text-on-surface-variant">
            {isRTL
              ? "إدارة قائمة الخدمات المعروضة للعملاء."
              : "Manage the list of services shown to clients."}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block px-6 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant/15">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-1">
              {isRTL ? "إجمالي الخدمات" : "Total"}
            </p>
            <p className="text-2xl font-bold text-primary">{services.length}</p>
          </div>
          <button
            onClick={() => setModal({})}
            className="flex items-center gap-2 bg-gradient-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:brightness-110"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              add
            </span>
            {isRTL ? "خدمة جديدة" : "New Service"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="group relative bg-surface-container-lowest rounded-xl p-6 transition-all hover:shadow-xl hover:shadow-cyan-900/5"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <DynamicIcon
                    src={svc.icon_source}
                    size={24}
                    className="text-on-secondary-container"
                  />
                </div>
                {svc.price > 0 && (
                  <span className="text-primary font-extrabold text-sm">
                    {svc.price.toLocaleString()}{" "}
                    {isRTL ? svc.currency_ar : svc.currency_en}
                    {isRTL ? svc.price_suffix_ar : svc.price_suffix_en}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {isRTL ? svc.title_ar : svc.title_en}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                {isRTL ? svc.desc_ar : svc.desc_en}
              </p>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <button
                  onClick={() => setModal(svc)}
                  className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    edit
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {isRTL ? "تعديل" : "Edit"}
                  </span>
                </button>
                <button
                  onClick={() => del(svc.id)}
                  className="flex items-center gap-2 text-error/60 hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    {isRTL ? "حذف" : "Delete"}
                  </span>
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="col-span-full text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl mb-3 block opacity-30">
                category
              </span>
              {isRTL ? "لا توجد خدمات بعد." : "No services yet."}
            </div>
          )}
        </div>
      )}
      {modal !== null && (
        <ServiceModal
          initial={modal}
          onSave={save}
          onClose={() => setModal(null)}
          lang={lang}
        />
      )}
    </div>
  );
}
