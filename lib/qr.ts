// QR code generator para sa /g/[eventCode]
import QRCode from 'qrcode';

export function galleryUrl(code: string) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  return `${base}/g/${code}`;
}

export function qrDataUrl(text: string) {
  return QRCode.toDataURL(text, { margin: 1, width: 640, color: { dark: '#0D0B08', light: '#FFFFFF' } });
}
