const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Work - Projects That Soared',
  description: 'Explore GarudaNest case studies with measurable outcomes across fintech, AI-enabled products, mobile platforms, and modern web systems built for growth.',
  alternates: {
    canonical: '/work'
  },
  openGraph: {
    title: 'GarudaNest Work - Projects That Soared',
    description: 'See real engineering outcomes delivered for high-growth teams, including performance gains, scale readiness, and product acceleration.',
    url: '/work',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Work'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Work - Projects That Soared',
    description: 'See real engineering outcomes delivered for high-growth teams, including performance gains, scale readiness, and product acceleration.',
    images: [socialImage]
  }
};

export default function WorkLayout({ children }) {
  return children;
}
