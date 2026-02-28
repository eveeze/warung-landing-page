import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Warung Mbah Manto — Grosir & Eceran Sembako Terpercaya';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#000',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            fontSize: '80px',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-3px',
            textAlign: 'center',
            lineHeight: 1,
          }}
        >
          Warung Mbah Manto™
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#888',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          Grosir & Eceran Sembako Terpercaya — Sejak 2014
        </div>
        <div
          style={{
            marginTop: '32px',
            display: 'flex',
            gap: '40px',
            fontSize: '18px',
            color: '#555',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontWeight: 700,
          }}
        >
          <span>Harga Jujur</span>
          <span>•</span>
          <span>Stok Lengkap</span>
          <span>•</span>
          <span>Buka Setiap Hari</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontSize: '16px',
          color: '#444',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        warungmanto.store
      </div>
    </div>,
    { ...size },
  );
}
