import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AI SaaS Genius',
    short_name: 'Genius',
    description: 'The Progressive Web App that provides you with AI capabilities to generate chat, code, image, music, and video easily',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/images/LOGO192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/LOGO512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}