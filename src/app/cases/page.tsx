import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { casesData } from '@/data/cases';
import { Sparkles, ArrowRight, Zap, Terminal, Layers } from 'lucide-react';
import InteractiveClicker from '@/components/InteractiveClicker';

export const metadata: Metadata = {
  title: 'Кейсы и шоукейс проектов | DigitalLife Tech',
  description:
    'Портфолио проектов, созданных с помощью вайбкодинга: интерактивные кликеры, квизы для конференций, стартап-MVP и AI-автоматизации.',
};

export default function CasesPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-xs font-semibold text-purple-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Всё что навайбкодил</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Кейсы, игры и цифровые прототипы
          </h1>
          <p className="text-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
            Здесь собраны реальные проекты: от вирусных браузерных кликеров и квизов для ивентов до сложных SaaS-платформ. Каждый проект сопровождается разбором архитектуры и промпт-инжиниринга.
          </p>
        </div>

        {/* Live Clicker Showcase Section */}
        <div className="mb-20">
          <div className="mb-6 flex items-center gap-2 text-sm text-cyan-400 font-semibold">
            <Layers className="w-4 h-4" />
            <span>Живое демо прямо в браузере:</span>
          </div>
          <InteractiveClicker />
        </div>

        {/* All Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {casesData.map((c) => (
            <div
              key={c.id}
              className={`glass-panel rounded-3xl border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 bg-gradient-to-br ${c.coverGradient}`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-800/60 font-medium">
                    {c.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {c.timeline}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  <Link href={`/cases/${c.slug}`}>{c.title}</Link>
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {c.fullDescription}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/80 my-4 bg-slate-950/40 rounded-xl px-3">
                  {c.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xs text-slate-500">{m.label}</div>
                      <div className="text-sm sm:text-base font-bold text-white font-mono">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Prompt highlights */}
                <div className="space-y-1.5 my-4">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Ключевые промпты:
                  </span>
                  {c.vibePromptHighlights.map((ph, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{ph}</span>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-2">
                  {c.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-900/80 text-slate-400 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <Link
                  href={`/cases/${c.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  <span>Подробный разбор кейса</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://t.me/digital_life_tech?text=${encodeURIComponent(
                    `Привет! Понравился кейс "${c.title}". Хочу сделать похожий проект!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Заказать аналогичный →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
