'use client';
import { useState } from 'react';
import TileArt from './TileArt';
import { EVENT_LABELS, type EventType, type PortfolioItem } from '@/lib/types';

const FILTERS: (EventType | 'all')[] = ['all', 'wedding', 'debut', 'corporate', 'school'];

export default function PortfolioGrid({ items, limit }: { items: PortfolioItem[]; limit?: number }) {
  const [f, setF] = useState<EventType | 'all'>('all');
  const shown = items.filter((i) => f === 'all' || i.event_type === f).slice(0, limit ?? items.length);
  return (
    <>
      <div className="filters" role="group" aria-label="I-filter ayon sa event">
        {FILTERS.map((k) => (
          <button key={k} className="chip" aria-pressed={f === k} onClick={() => setF(k)}>
            {k === 'all' ? 'Lahat' : EVENT_LABELS[k]}
          </button>
        ))}
      </div>
      {shown.length === 0 ? (
        <p className="muted">Wala pang naka-upload para sa event type na ito.</p>
      ) : (
        <div className="grid-portfolio">
          {shown.map((it, i) => (
            <figure key={it.id} className="tile" style={{ margin: 0 }}>
              {it.media_url ? (
                <video className="art" src={it.media_url} muted loop playsInline autoPlay style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
              ) : (
                <TileArt type={it.event_type} seed={i + 1} />
              )}
              <figcaption className="cap">
                <strong>{it.title}</strong>
                <span>{EVENT_LABELS[it.event_type]} sa {it.venue}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </>
  );
}
