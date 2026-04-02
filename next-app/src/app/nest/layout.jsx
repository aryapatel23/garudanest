const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Nest - Elite Team',
  description: 'Meet GarudaNest engineers and explore proven expertise in full-stack architecture, backend systems, AI workflows, cloud infrastructure, and mobile product development.',
  alternates: {
    canonical: '/nest'
  },
  openGraph: {
    title: 'GarudaNest Nest - Elite Engineering Team',
    description: 'Browse profiles of GarudaNest architects and engineers, including technical strengths, experience areas, and delivery focus.',
    url: '/nest',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Team'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Nest - Elite Engineering Team',
    description: 'Browse profiles of GarudaNest architects and engineers, including technical strengths, experience areas, and delivery focus.',
    images: [socialImage]
  }
};

export default function NestLayout({ children }) {
  return children;
}
