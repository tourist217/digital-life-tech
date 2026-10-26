import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Zap, Code2, ShieldCheck, Flame, Send } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-radial-gradient">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs sm:text-sm text-cyan-300 shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span className="font-medium">Новая эра разработки цифровых продуктов</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-slate-400 hidden sm:inline">digital-life.tech</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Собираю сайты, игры и MVP <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent glow-cyan">
              вайбкодингом на ИИ
            </span>{' '}
            за считанные дни
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Полноценный кастомный код на Next.js без раздутых смет агентств и ограничений конструкторов. От вирусных промо-кликеров и квизов для мероприятий до работающих стартап-MVP.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="https://t.me/digital_life_tech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Send className="w-5 h-5" />
              <span>Обсудить проект в Telegram</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-medium text-base border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Рассчитать срок и бюджет</span>
            </Link>
          </div>

          {/* Creator Voice Banner */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs sm:text-sm text-slate-400">
              <span className="text-slate-300 font-medium">Автор и вайбкодер:</span>
              <span className="text-cyan-400">Игорь Определёнов</span>
              <span className="text-slate-600">•</span>
              <span>«Несложные проекты можно без проблем собирать с помощью ИИ»</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">5–7 дней</span>
            </div>
            <p className="text-xs text-slate-400">
              Средний срок сборки и релиза готового MVP с базой данных и оплатой
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">в 5–10 раз</span>
            </div>
            <p className="text-xs text-slate-400">
              Экономия бюджета по сравнению со сметами традиционных веб-агентств
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Next.js 16</span>
            </div>
            <p className="text-xs text-slate-400">
              Чистый чип-код React 19 без рамок Tilda или Webflow. Полный контроль.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-800/80 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">SEO & GEO</span>
            </div>
            <p className="text-xs text-slate-400">
              Оптимизировано для поисковиков и ответов нейросетей (ChatGPT, Perplexity)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
