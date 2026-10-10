'use client';
import { useState } from 'react';
import type { EventVideo } from '@/lib/types';

// Bawat share ay may TWIRL branding sa text (libreng marketing).
export default function VideoCard({ video, eventTitle, galleryUrl }: { video: EventVideo; eventTitle: string; galleryUrl: string }) {
  const [note, setNote] = useState('');
  const shareText = `My 360 video from ${eventTitle}! 🎥 360 booth by TWIRL Project, Most Outstanding 360 Video Booth Provider.`;
  const demo = !video.url;

  async function share() {
    try {
      if (!demo && navigator.canShare) {
        const blob = await (await fetch(video.url)).blob();
        const file = new File([blob], `TWIRL-${video.title.replace(/\W+/g, '-')}.mp4`, { type: blob.type || 'video/mp4' });
        if (navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], text: shareText }); return; }
      }
      if (navigator.share) { await navigator.share({ title: 'TWIRL Project', text: shareText, url: galleryUrl }); return; }
      await navigator.clipboard.writeText(`${shareText} ${galleryUrl}`);
      setNote('Link copied. Paste it in a post or chat.');
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setNote("Couldn't share. Download the video and upload it instead.");
    }
  }

  return (
    <article className="vcard">
      <div className="thumb">
        {demo ? (
          <svg viewBox="0 0 90 160" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="90" height="160" fill="#0D0B08" />
            <ellipse cx="45" cy="80" rx="34" ry="10" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
            <circle cx="45" cy="80" r="4" fill="#F2D272" />
            <text x="45" y="148" textAnchor="middle" fontSize="6" fill="#D4AF37" fontFamily="sans-serif">TWIRL PROJECT</text>
          </svg>
        ) : (
          <video src={video.url} poster={video.thumb ?? undefined} controls playsInline preload="metadata" />
        )}
      </div>
      <div className="meta">
        <strong>{video.title}</strong>
        <div className="btns">
          {demo
            ? <button className="btn btn-sm" disabled title="Sample only in the preview">Download</button>
            : <a className="btn btn-sm" href={video.url} download>Download</a>}
          <button className="btn btn-sm btn-primary" onClick={share}>Share</button>
        </div>
        {note && <p className="small muted" role="status">{note}</p>}
      </div>
    </article>
  );
}
