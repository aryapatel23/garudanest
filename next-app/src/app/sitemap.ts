import type { MetadataRoute } from 'next';
import { teamMembers } from '@/lib/constants';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://teamgarudanest.in';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    '/',
    '/about',
    '/work',
    '/process',
    '/nest',
    '/manifesto',
    '/studio',
    '/hire'
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/hire' ? 0.9 : 0.8
  })) as MetadataRoute.Sitemap;

  const memberRoutes = teamMembers.map((member) => ({
    url: `${siteUrl}/nest/${member.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...memberRoutes];
}
