import React from 'react';
import type { Metadata } from 'next';
import GlossaryCatalog from '@/components/GlossaryCatalog';
import { BookOpen, Sparkles, Send } from 'lucide-react';
import Link from 'next/link';
import { glossaryData } from '@/data/glossary';

export const metadata: Metadata = {
  title: 'Интерактивный глоссарий терминов по ИИ и вайбкодингу | DigitalLife Tech',
  description:
    'Полный справочник ключевых понятий современного веба, искусственного интеллекта и вайбкодинга: RAG, TMA, LLM, контекстное окно, системные промпты и GEO простыми словами.',
  keywords: [
    'глоссарий ИИ',
    'вайбкодинг определение',
    'что такое RAG простыми словами',
    'Telegram Mini Apps разработка',
    'контекстное окно нейросети',
    'системный промпт',
    'GEO оптимизация',
    'словарь искусственного интеллекта',
  ],
  openGraph: {
    title: 'Интерактивный глоссарий терминов по ИИ и разработке',
    description:
      'База знаний терминов по вайбкодингу, моделям и архитектуре цифровых продуктов от DigitalLife Tech.',
    url: 'https://digital-life.tech/glossary',
  },
};

export default function GlossaryPage() {
  // DefinedTermSet schema for rich snippets
  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': 'https://digital-life.tech/glossary',
    name: 'Глоссарий ИИ и вайбкодинга DigitalLife Tech',
    description:
      'Интерактивный словарь терминов по искусственному интеллекту, вайбкодингу и современной веб-разработке.',
    hasDefinedTerm: glossaryData.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      termCode: t.slug,
      description: t.shortDefinition,
      url: `https://digital-life.tech/glossary/${t.slug}`,
    })),
  };

  return (
    <div className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300 mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>База знаний & Определения</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Глоссарий терминов по ИИ и разработке
          </h1>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            Понятный и практический справочник без академической духоты. Всё, что нужно знать о современных больших моделях, RAG-архитектуре, Telegram Mini Apps и методологии вайбкодинга.
          </p>
        </div>

        {/* Interactive Catalog with Instant Search & Filters */}
        <GlossaryCatalog />

        {/* Bottom CTA Box */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950/50 via-slate-900 to-indigo-950/50 border border-cyan-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Хотите внедрить эти технологии в свой проект?
          </h2>
          <p className="text-sm text-slate-300 max-w-lg mx-auto">
            Собираю MVP, ботов с RAG и веб-приложения на Next.js в несколько раз быстрее классических агентств с помощью вайбкодинга.
          </p>
          <a
            href="https://t.me/tourist217"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Обсудить задачу с автором в Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
