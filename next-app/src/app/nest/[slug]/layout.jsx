const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Engineer Profile',
  description: 'Explore detailed engineer profiles, technical strengths, portfolio links, and delivery capabilities within the GarudaNest talent collective.',
  alternates: {
    canonical: '/nest'
  },
  openGraph: {
    title: 'GarudaNest Engineer Profile',
    description: 'Explore detailed engineer profiles, technical strengths, portfolio links, and delivery capabilities within the GarudaNest talent collective.',
    url: '/nest',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Engineer Profile'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Engineer Profile',
    description: 'Explore detailed engineer profiles, technical strengths, portfolio links, and delivery capabilities within the GarudaNest talent collective.',
    images: [socialImage]
  }
};

export default function NestMemberLayout({ children }) {
  return children;
}
