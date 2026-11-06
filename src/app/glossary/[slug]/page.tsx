import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { glossaryData } from '@/data/glossary';
import {
  ArrowLeft,
  Sparkles,
  Send,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  Layers,
  ArrowRight,
  BookOpen,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import FormattedArticleContent, { renderRichInline } from '@/components/FormattedArticleContent';

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

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back link */}
        <div>
          <Link
            href={`/glossary#${term.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Назад в глоссарий терминов</span>
          </Link>
        </div>

        {/* Header Block */}
        <header className="space-y-4 pb-8 border-b border-slate-800">
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

          <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/30">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              Коротко:
            </span>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
              {term.shortDefinition}
            </p>
          </div>
        </header>

        {/* 1. Analogy Block (Суть технологии на простой аналогии) */}
        {term.analogy && (
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {term.analogy.title}
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-300 italic">
              {term.analogy.lead}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Without Tech */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/50 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs sm:text-sm">
                  <XCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Без {term.term}:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {term.analogy.storyWithout}
                </p>
              </div>

              {/* With Tech */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>С {term.term} на борту:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {term.analogy.storyWith}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-white">Главный вывод: </strong>
                {term.analogy.takeaway}
              </p>
            </div>
          </section>
        )}

        {/* 2. Pipeline Architecture (Как устроен процесс) */}
        {term.pipeline && (
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-2.5 text-cyan-400">
              <Workflow className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {term.pipeline.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {term.pipeline.steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-3 relative group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-3xl font-black text-cyan-500/30 font-mono block">
                      {st.number}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {st.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                  {st.techBadge && (
                    <div className="pt-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 inline-block">
                        {st.techBadge}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Product Comparison Table (В каких продуктах это применяется) */}
        {term.comparisons && term.comparisons.length > 0 && (
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 overflow-hidden">
            <div className="flex items-center gap-2.5">
              <Layers className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                В каких продуктах это применяется
              </h2>
            </div>

            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                    <th className="py-3 px-3">Сценарий</th>
                    <th className="py-3 px-3 text-rose-400">Без {term.term}</th>
                    <th className="py-3 px-3 text-emerald-400">С {term.term} на борту</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {term.comparisons.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3.5 px-3 font-semibold text-white align-top">
                        {row.scenario}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 align-top">
                        {row.withoutTech}
                      </td>
                      <td className="py-3.5 px-3 text-emerald-300/90 align-top bg-emerald-950/10">
                        {row.withTech}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. Common Mistakes (Частые ошибки при внедрении) */}
        {term.mistakes && term.mistakes.length > 0 && (
          <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center gap-2.5 text-amber-400">
              <AlertTriangle className="w-6 h-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Частые ошибки при внедрении
              </h2>
            </div>

            <div className="space-y-3">
              {term.mistakes.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1.5"
                >
                  <h3 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{m.title}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-4">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Full Definition Body */}
        {term.fullDefinition && (
          <section className="pt-4 space-y-4">
            <FormattedArticleContent content={term.fullDefinition} />
          </section>
        )}

        {/* 6. Key Benefits */}
        {term.keyBenefits && term.keyBenefits.length > 0 && (
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800">
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

        {/* 7. Related Projects and Posts (Примеры на сайте) */}
        {((term.relatedCases && term.relatedCases.length > 0) ||
          (term.relatedPosts && term.relatedPosts.length > 0) ||
          (term.relatedTerms && term.relatedTerms.length > 0)) && (
          <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Примеры и ссылки на сайте digital-life.tech:
            </h3>

            {term.relatedCases && term.relatedCases.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-medium block">Реальный кейс:</span>
                <div className="flex flex-wrap gap-2">
                  {term.relatedCases.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/cases/${c.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-colors"
                    >
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{c.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <span className="text-xs text-slate-500 font-medium block">Связанные термины:</span>
                <div className="flex flex-wrap gap-2">
                  {term.relatedTerms.map((rt) => (
                    <Link
                      key={rt.slug}
                      href={`/glossary/${rt.slug}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-950 text-slate-300 hover:text-cyan-400 hover:bg-slate-900 border border-slate-800 text-xs font-medium transition-colors"
                    >
                      #{rt.term}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {term.relatedPosts && term.relatedPosts.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-800/60">
                <span className="text-xs text-slate-500 font-medium block">Статьи в блоге:</span>
                <div className="flex flex-wrap gap-2">
                  {term.relatedPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-xs font-semibold text-purple-300 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                      <span>{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 8. Other terms from category */}
        {otherCategoryTerms.length > 0 && (
          <div className="pt-6 border-t border-slate-800 space-y-3">
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Другие термины из категории «{term.categoryLabel}»:
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

        {/* 9. Direct Telegram CTA */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Хотите внедрить {term.term} в свой бизнес?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Соберем ассистента или веб-сервис с поиском по вашим документам и регламентам за 3–5 дней.
          </p>
          <a
            href={`https://t.me/tourist217?text=${encodeURIComponent(
              `Привет! Прочитал разбор "${term.term}" на digital-life.tech. Хочу обсудить внедрение в наш проект!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Обсудить задачу в Telegram @tourist217</span>
          </a>
        </div>
      </article>
    </div>
  );
}
