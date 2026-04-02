const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Hire GarudaNest',
  description: 'Start your project with GarudaNest through a structured discovery process, clear engineering recommendations, and senior execution across web, backend, AI, and mobile systems.',
  alternates: {
    canonical: '/hire'
  },
  openGraph: {
    title: 'Hire GarudaNest - Strategy Sync',
    description: 'Submit your brief and schedule a discovery call to get architecture direction, delivery planning, and a practical build roadmap from GarudaNest.',
    url: '/hire',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'Hire GarudaNest'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hire GarudaNest - Strategy Sync',
    description: 'Submit your brief and schedule a discovery call to get architecture direction, delivery planning, and a practical build roadmap from GarudaNest.',
    images: [socialImage]
  }
};

export default function HireLayout({ children }) {
  return children;
}
