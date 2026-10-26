import React from 'react';
import Link from 'next/link';
import { casesData } from '@/data/cases';
import { Sparkles, ArrowRight, ExternalLink, Zap, Terminal } from 'lucide-react';

export default function CasesSection() {
  const featuredCases = casesData.slice(0, 4);

  return (
    <section id="cases" className="py-24 bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800 text-xs font-semibold text-purple-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Шоукейс проектов</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Всё, что навайбкодил: от кликеров до SaaS
            </h2>
            <p className="text-slate-400 mt-3 text-base max-w-xl">
              Реальные примеры проектов с разбором промптов, архитектуры и таймлайна разработки.
            </p>
          </div>

          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm group"
          >
            <span>Смотреть все кейсы ({casesData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredCases.map((c) => (
            <div
              key={c.id}
              className={`glass-panel rounded-3xl border border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 bg-gradient-to-br ${c.coverGradient}`}
            >
              <div>
                {/* Meta row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-800/60 font-medium">
                    {c.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Zap className="w-3 h-3 text-amber-400" />
                    {c.timeline}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  <Link href={`/cases/${c.slug}`}>{c.title}</Link>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {c.shortDescription}
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

                {/* Tech stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
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

              {/* Bottom action buttons */}
              <div className="pt-4 flex items-center justify-between">
                <Link
                  href={`/cases/${c.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Разбор промптов и кейса</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {c.demoType === 'clicker' && (
                  <span className="text-[11px] bg-cyan-950 text-cyan-300 border border-cyan-700/60 px-2 py-0.5 rounded-full animate-pulse">
                    🎮 Интерактив на главной
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
