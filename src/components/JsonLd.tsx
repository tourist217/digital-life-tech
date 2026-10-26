import React from 'react';
import { faqData } from '@/data/services';

interface JsonLdProps {
  type?: 'home' | 'article' | 'case';
  articleData?: {
    title: string;
    description: string;
    datePublished: string;
    url: string;
  };
}

export default function JsonLd({ type = 'home', articleData }: JsonLdProps) {
  const domain = 'https://digital-life.tech';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${domain}/#organization`,
    name: 'DigitalLife Tech',
    url: domain,
    logo: `${domain}/favicon.ico`,
    description: 'Лаборатория вайбкодинга и AI-разработки. Создание MVP, интерактивных квизов, игр-кликеров и веб-сервисов за считанные дни с помощью нейросетей.',
    founder: {
      '@type': 'Person',
      name: 'Игорь Определёнов',
      jobTitle: 'Вайбкодер & AI Инженер',
      sameAs: [
        'https://t.me/digital_life_tech'
      ]
    },
    areaServed: 'Worldwide',
    priceRange: '₽₽',
    serviceType: [
      'Вайбкодинг',
      'Разработка MVP за 5 дней',
      'Интерактивные промо-сайты и квизы',
      'Telegram Mini Apps',
      'AI-автоматизация'
    ],
    sameAs: [
      'https://t.me/digital_life_tech'
    ]
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const articleSchema = articleData
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: articleData.title,
        description: articleData.description,
        datePublished: articleData.datePublished,
        url: articleData.url,
        author: {
          '@type': 'Person',
          name: 'Игорь Определёнов',
          jobTitle: 'Вайбкодер & AI Инженер'
        },
        publisher: {
          '@type': 'Organization',
          name: 'DigitalLife Tech',
          url: domain
        }
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {type === 'home' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {articleSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      )}
    </>
  );
}
