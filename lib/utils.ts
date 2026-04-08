export const getDirectDriveLink = (link: string) => {
  if (!link) return '';
  const m = link.match(/(?:\/d\/|id=)([\w-]+)/);
  return m?.[1] ? `https://drive.google.com/uc?export=view&id=${m[1]}` : link;
};
export const getYouTubeId = (url: string) => {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m?.[1] ?? null;
};
export const isSvgCode = (s: string) => s.trim().startsWith('<svg') || s.trim().startsWith('<SVG');
export const buildWhatsAppLink = (num: string, msg = '') => {
  const n = num.replace(/\D/g,'');
  return `https://wa.me/${n}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
};
