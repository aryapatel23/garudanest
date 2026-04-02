const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Studio',
  description: 'Explore the GarudaNest studio view into engineering quality, product design standards, implementation discipline, and precision in every build cycle.',
  alternates: {
    canonical: '/studio'
  },
  openGraph: {
    title: 'GarudaNest Studio',
    description: 'Take a closer look at GarudaNest engineering and design execution principles that drive consistent product quality.',
    url: '/studio',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Studio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Studio',
    description: 'Take a closer look at GarudaNest engineering and design execution principles that drive consistent product quality.',
    images: [socialImage]
  }
};

export default function StudioLayout({ children }) {
  return children;
}
