import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL('https://digital-life.tech'),
  title: {
    default: 'DigitalLife Tech — Вайбкодинг & AI-разработка сайтов и MVP',
    template: '%s | DigitalLife Tech',
  },
  description:
    'Сборка коммерческих сайтов, интерактивных квизов, игр-кликеров и стартап-MVP с помощью вайбкодинга и ИИ за считанные дни. Авторский подход Игоря Определёнова.',
  keywords: [
    'вайбкодинг',
    'vibe coding',
    'разработка сайтов на ИИ',
    'создать MVP за 5 дней',
    'интерактивный квиз для мероприятия',
    'мини игра кликер для сайта',
    'Telegram Mini App разработка',
    'GEO оптимизация сайтов',
    'digital-life.tech',
    'Игорь Определёнов',
  ],
  authors: [{ name: 'Игорь Определёнов', url: 'https://digital-life.tech' }],
  creator: 'Игорь Определёнов',
  publisher: 'DigitalLife Tech',
  alternates: {
    canonical: 'https://digital-life.tech',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://digital-life.tech',
    title: 'DigitalLife Tech — Вайбкодинг & AI-разработка сайтов и MVP',
    description:
      'Создание цифровых продуктов, интерактивных промо и стартап-MVP в 5–10 раз быстрее традиционных веб-студий с помощью вайбкодинга и ИИ.',
    siteName: 'DigitalLife Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitalLife Tech — Вайбкодинг & AI-разработка',
    description:
      'Создание цифровых продуктов, интерактивных промо и стартап-MVP с помощью вайбкодинга и ИИ.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <JsonLd type="home" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
