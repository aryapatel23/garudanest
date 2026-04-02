const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'About GarudaNest',
  description: 'Learn how GarudaNest works as a senior engineering collective focused on full-stack product development, backend architecture, AI integrations, mobile delivery, and long-term scale support for modern businesses.',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: 'About GarudaNest',
    description: 'Meet the team, approach, and delivery philosophy behind GarudaNest for building reliable digital products that scale.',
    url: '/about',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About GarudaNest',
    description: 'Meet the team, approach, and delivery philosophy behind GarudaNest for building reliable digital products that scale.',
    images: [socialImage]
  }
};

export default function AboutLayout({ children }) {
  return children;
}
