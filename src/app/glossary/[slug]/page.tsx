import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryData } from '@/data/glossary';
import { ArrowLeft, BookOpen, Sparkles, Send, Zap, CheckCircle2, Layers, Tag } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return glossaryData.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryData.find((item) => item.slug === slug);
  if (!term) return { title: 'Термин не найден' };

  return {
    title: `${term.term} ${term.originalTerm ? `(${term.originalTerm})` : ''} — Что это простыми словами | Глоссарий DigitalLife Tech`,
    description: term.shortDefinition,
    keywords: [
      term.term,
      term.originalTerm || '',
      `что такое ${term.term}`,
      `${term.term} простыми словами`,
      `${term.term} в разработке`,
      'глоссарий ИИ',
    ].filter(Boolean),
    openGraph: {
      title: `${term.term} — Что это простыми словами`,
      description: term.shortDefinition,
      url: `https://digital-life.tech/glossary/${term.slug}`,
    },
  };
}

export default async function GlossaryDetailPage({ params }: Props) {
  const { slug } = await params;
  const term = glossaryData.find((item) => item.slug === slug);

  if (!term) {
    notFound();
  }

  // Schema.org DefinedTerm
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    termCode: term.slug,
    description: term.shortDefinition,
    inDefinedTermSet: 'https://digital-life.tech/glossary',
    url: `https://digital-life.tech/glossary/${term.slug}`,
  };

  const otherCategoryTerms = glossaryData.filter(
    (item) => item.category === term.category && item.slug !== term.slug
  );

  return (
    <div className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/glossary#${term.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад в глоссарий терминов</span>
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10 pb-8 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
              {term.categoryLabel}
            </span>
            {term.originalTerm && (
              <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                Оригинал: {term.originalTerm}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {term.term}
          </h1>

          <p className="text-lg sm:text-xl text-cyan-300 leading-relaxed font-medium">
            {term.shortDefinition}
          </p>
        </header>

        {/* Practical Context Highlight */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 my-8 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>Где и как применяется на практике:</span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            {term.practicalContext}
          </p>
        </div>

        {/* Full Definition Markdown Content */}
        <div className="prose prose-invert prose-cyan max-w-none text-slate-200 text-base leading-relaxed space-y-6 my-10">
          {term.fullDefinition.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('- ')) {
              const items = trimmed.split('\n- ').map((item) => item.replace(/^- /, ''));
              return (
                <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-300">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              );
            }

            if (trimmed.startsWith('1. ')) {
              const items = trimmed.split('\n').filter(Boolean);
              return (
                <ol key={idx} className="space-y-2 list-decimal pl-5 text-slate-300">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Key Benefits */}
        {term.keyBenefits && term.keyBenefits.length > 0 && (
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 my-10">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ключевые преимущества:</span>
            </h3>
            <div className="space-y-2.5">
              {term.keyBenefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Projects and Posts */}
        {((term.relatedCases && term.relatedCases.length > 0) ||
          (term.relatedPosts && term.relatedPosts.length > 0)) && (
          <div className="my-10 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Где посмотреть этот подход на живых примерах:
            </h3>
            <div className="flex flex-wrap gap-3">
              {term.relatedCases?.map((c) => (
                <Link
                  key={c.slug}
                  href={`/cases/${c.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-colors"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Кейс: {c.title}</span>
                </Link>
              ))}
              {term.relatedPosts?.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-purple-300 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Статья: {p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Other terms from this category */}
        {otherCategoryTerms.length > 0 && (
          <div className="pt-8 border-t border-slate-800 my-10 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Смотрите также в категории «{term.categoryLabel}»:
            </h3>
            <div className="flex flex-wrap gap-2">
              {otherCategoryTerms.map((ot) => (
                <Link
                  key={ot.slug}
                  href={`/glossary/${ot.slug}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 border border-slate-800 text-xs font-medium transition-colors"
                >
                  {ot.term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Нужен проект с использованием {term.term}?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Обсудим вашу задачу в Telegram — предложу оптимальную архитектуру и рассчитаю сроки запуска за пару часов.
          </p>
          <a
            href={`https://t.me/tourist217?text=${encodeURIComponent(
              `Привет! Прочитал в глоссарии про "${term.term}". Хочу обсудить применение в проекте.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Написать в Telegram @tourist217</span>
          </a>
        </div>
      </article>
    </div>
  );
}
