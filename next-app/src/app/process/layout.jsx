const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Process - How We Build',
  description: 'See the GarudaNest delivery process from discovery and architecture planning to implementation, testing, launch, and ongoing scale support.',
  alternates: {
    canonical: '/process'
  },
  openGraph: {
    title: 'GarudaNest Process - How Elite Systems Are Built',
    description: 'Understand our systemized process for building fast, resilient, production-grade software with clear milestones and accountability.',
    url: '/process',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Process'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Process - How Elite Systems Are Built',
    description: 'Understand our systemized process for building fast, resilient, production-grade software with clear milestones and accountability.',
    images: [socialImage]
  }
};

export default function ProcessLayout({ children }) {
  return children;
}
