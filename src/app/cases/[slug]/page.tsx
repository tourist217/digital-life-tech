import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { casesData } from '@/data/cases';
import { ArrowLeft, Clock, Zap, CheckCircle2, Terminal, Send, Sparkles } from 'lucide-react';
import InteractiveClicker from '@/components/InteractiveClicker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return casesData.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = casesData.find((item) => item.slug === slug);
  if (!c) return { title: 'Кейс не найден' };

  return {
    title: `${c.title} — Кейс вайбкодинга`,
    description: c.shortDescription,
    openGraph: {
      title: c.title,
      description: c.shortDescription,
    },
  };
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const c = casesData.find((item) => item.slug === slug);

  if (!c) {
    notFound();
  }

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад ко всем кейсам</span>
        </Link>

        {/* Case Header */}
        <div className="space-y-4 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
              {c.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {c.timeline}
            </span>
            <span className="text-xs text-slate-400">• {c.clientOrEvent}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {c.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed">
            {c.fullDescription}
          </p>
        </div>

        {/* Live Interactive Embed (if clicker) */}
        {c.demoType === 'clicker' && (
          <div className="mb-14">
            <div className="mb-4 flex items-center gap-2 text-sm text-cyan-400 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Попробуйте прямо сейчас:</span>
            </div>
            <InteractiveClicker />
          </div>
        )}

        {/* Metrics Grid */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 my-8">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Ключевые результаты и показатели
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {c.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                <div className="text-2xl font-bold text-white font-mono text-cyan-400">{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vibe Prompt Architecture Section */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 my-10 space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
            <Terminal className="w-5 h-5" />
            <span>Как это было собрано: архитектура промптов</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Вайбкодинг проекта базировался на итеративном уточнении спецификации. Вместо написания рутинного бойлерплейта, фокус был направлен на архитектуру состояний, производительность и UX:
          </p>

          <div className="space-y-4">
            {c.vibePromptHighlights.map((ph, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                <span className="text-cyan-400 font-mono font-bold text-xs mt-0.5">0{idx + 1}.</span>
                <span className="text-sm text-slate-200">{ph}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="py-6 border-y border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Использованный стек:
          </div>
          <div className="flex flex-wrap gap-2">
            {c.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Card */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">
            Хотите реализовать похожий проект?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Соберем кликер, викторину или веб-сервис под ключ за считанные дни с гарантией и чистым кодом.
          </p>
          <a
            href={`https://t.me/digital_life_tech?text=${encodeURIComponent(
              `Привет! Обсуждаем проект по мотивам кейса "${c.title}".`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Обсудить задачу в Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
}
