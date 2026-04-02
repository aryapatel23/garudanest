const socialImage = 'https://res.cloudinary.com/dczue3n9b/image/upload/v1773997242/1773927705698_e_1775692800_v_beta_t_wnK_isUP_7OGaqksgyBNyb3Z-2mX6HKiY49f_cp67X4_kkmle0.png';

export const metadata = {
  title: 'Manifesto',
  description: 'Read the GarudaNest manifesto on radical transparency, architectural rigor, responsible velocity, and disciplined engineering practices for long-term product success.',
  alternates: {
    canonical: '/manifesto'
  },
  openGraph: {
    title: 'GarudaNest Manifesto',
    description: 'Learn the engineering principles and operating philosophy that shape how GarudaNest designs, builds, and scales software systems.',
    url: '/manifesto',
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: 'GarudaNest Manifesto'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GarudaNest Manifesto',
    description: 'Learn the engineering principles and operating philosophy that shape how GarudaNest designs, builds, and scales software systems.',
    images: [socialImage]
  }
};

export default function ManifestoLayout({ children }) {
  return children;
}
