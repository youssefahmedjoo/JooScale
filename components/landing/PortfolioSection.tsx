'use client';
import { useState } from 'react';
import { useLang } from '@/components/LangProvider';
import { getYouTubeId } from '@/lib/utils';
import type { Portfolio, PortfolioMedia } from '@/types';

function MediaCarousel({ media }: { media: PortfolioMedia[] }) {
  const [idx, setIdx] = useState(0);
  if (!media.length) return null;
  const sorted = [...media].sort((a, b) => a.order_index - b.order_index);
  const current = sorted[idx];

  const renderMedia = (m: PortfolioMedia) => {
    if (m.media_type === 'youtube') {
      const vid = getYouTubeId(m.media_url);
      if (!vid) return null;
      return (
        <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vid}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen />
      );
    }
    // image — direct URL
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={m.media_url} alt="" className="w-full h-full object-cover" />
    );
  };

  return (
    <div className="relative">
      {/* Main display */}
      <div className="relative overflow-hidden bg-surface-dim" style={{ aspectRatio: '16/10' }}>
        {renderMedia(current)}
        {/* Media type badge */}
        <div className="absolute top-3 start-3">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-[10px] font-black ${current.media_type === 'youtube' ? 'bg-red-600' : 'bg-black/50'}`}>
            <span className="material-symbols-outlined" style={{ fontSize: 12 }}>{current.media_type === 'youtube' ? 'smart_display' : 'image'}</span>
            {current.media_type === 'youtube' ? 'YouTube' : 'Image'}
          </span>
        </div>
        {/* Nav arrows */}
        {sorted.length > 1 && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + sorted.length) % sorted.length)}
              className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
            </button>
            <button onClick={() => setIdx(i => (i + 1) % sorted.length)}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_left</span>
            </button>
          </>
        )}
      </div>
      {/* Thumbnail dots */}
      {sorted.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-2">
          {sorted.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-primary w-4' : 'bg-outline-variant'}`} />
          ))}
        </div>
      )}
    </div>
  );
}

export function PortfolioSection({ portfolio }: { portfolio: Portfolio[] }) {
  const { lang, t } = useLang();
  if (!portfolio.length) return null;

  return (
    <section className="px-6 py-24 bg-surface-container-low" id="portfolio">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-sm font-label font-bold text-primary uppercase tracking-[0.2em] mb-4">{t('إنجازاتنا','Our Work')}</h2>
          <p className="text-4xl lg:text-5xl font-headline font-extrabold text-on-surface">{t('أعمالنا','Portfolio')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map(item => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <MediaCarousel media={item.media ?? []} />
              <div className="p-6">
                <h3 className="font-headline font-bold text-on-surface text-lg mb-1">{lang === 'ar' ? item.title_ar : item.title_en}</h3>
                {(lang === 'ar' ? item.desc_ar : item.desc_en) && (
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{lang === 'ar' ? item.desc_ar : item.desc_en}</p>
                )}
                {item.visit_link && (
                  <a href={item.visit_link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>open_in_new</span>
                    {t('زيارة المشروع','Visit Project')}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
