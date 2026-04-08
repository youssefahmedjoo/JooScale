'use client';
import { isSvgCode } from '@/lib/utils';
export function DynamicIcon({ src, size = 24, className = '' }: { src: string; size?: number; className?: string }) {
  if (!src) return <span className={`material-symbols-outlined ${className}`} style={{ fontSize: size }}>star</span>;
  if (isSvgCode(src)) return (
    <span className={`icon-svg ${className}`} style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center' }}
      dangerouslySetInnerHTML={{ __html: src }} />
  );
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={size} height={size} className={className} style={{ objectFit: 'contain' }} />;
}
