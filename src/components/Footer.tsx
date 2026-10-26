import React from 'react';
import Link from 'next/link';
import { Sparkles, Send, Bot, ShieldCheck, GitBranch } from 'lucide-react';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-bold text-lg text-white">
                DigitalLife<span className="text-cyan-400">.tech</span>
              </span>
            </Link>

            <p className="text-slate-400 max-w-md text-sm leading-relaxed">
              Лаборатория вайбкодинга и ИИ-разработки. Создаем высоконагруженные MVP, вирусные промо-игры, квизы и автоматизации в 5–10 раз быстрее агентств с помощью генеративных нейросетей.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Vercel Edge Global Hosting
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Bot className="w-4 h-4" />
                GEO & LLM-Optimized (llms.txt)
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              Навигация
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="hover:text-cyan-400 transition-colors">
                  Услуги и разработка
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-cyan-400 transition-colors">
                  Кейсы (кликеры, квизы, MVP)
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Блог, новости и статьи
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-cyan-400 transition-colors">
                  Калькулятор проекта
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-cyan-400 transition-colors">
                  Вопросы и ответы
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & AI Feeds */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase">
              Связь & ИИ
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://t.me/digital_life_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-cyan-400" />
                  <span>Telegram: @digital_life_tech</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
                >
                  <GitBranch className="w-4 h-4 text-slate-400" />
                  <span>GitHub Репозиторий</span>
                </a>
              </li>
              <li>
                <Link
                  href="/llms.txt"
                  className="flex items-center gap-2 text-cyan-400/90 hover:text-cyan-300 font-mono text-xs"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>/llms.txt (для AI поисковиков)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap.xml"
                  className="text-xs text-slate-500 hover:text-slate-400"
                >
                  Sitemap XML
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} digital-life.tech. Все права защищены. Разработка и вайбкодинг на Next.js & React 19.</p>
          <p className="text-slate-400">
            Оптимизировано под Google SEO, Яндекс Нейро и Generative Engine Optimization (GEO).
          </p>
        </div>
      </div>
    </footer>
  );
}
