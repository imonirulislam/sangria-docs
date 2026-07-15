import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Wine-gradient tile with a serif "S" — the Sangria mark, as the favicon.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #c23063, #8f1d43)',
          color: '#fff',
          fontSize: 23,
          fontWeight: 700,
          fontFamily: 'Georgia, serif',
          borderRadius: 7,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
