'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, Send, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                  DigitalLife
                </span>
                <span className="text-[11px] px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                  .tech
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Вайбкодинг & AI-разработка
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-300">
            <Link href="/#services" className="hover:text-cyan-400 transition-colors">
              Услуги
            </Link>
            <Link href="/cases" className="hover:text-cyan-400 transition-colors">
              Кейсы
            </Link>
            <Link href="/blog" className="hover:text-cyan-400 transition-colors">
              Блог
            </Link>
            <Link href="/glossary" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>Глоссарий</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </Link>
            <Link href="/#calculator" className="hover:text-cyan-400 transition-colors">
              Калькулятор
            </Link>
            <Link href="/#faq" className="hover:text-cyan-400 transition-colors">
              FAQ
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Status Pill on wide screens */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/50 text-[12px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Принимаю заказы на MVP</span>
            </div>

            <a
              href="https://t.me/tourist217"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-95 transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Написать в TG</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href="https://t.me/tourist217"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 text-xs sm:hidden flex items-center"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Меню навигации"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800 bg-slate-950/95 space-y-2">
            <div className="flex items-center gap-2 px-3 py-1 text-xs text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Принимаю заказы на MVP</span>
            </div>
            <Link
              href="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Услуги и цены
            </Link>
            <Link
              href="/cases"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Кейсы и шоукейс (игры, квизы)
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Блог, новости и статьи
            </Link>
            <Link
              href="/glossary"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Глоссарий терминов по ИИ
            </Link>
            <Link
              href="/#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Калькулятор стоимости
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-900 hover:text-cyan-400"
            >
              Частые вопросы (FAQ)
            </Link>
            <div className="pt-2 px-3">
              <a
                href="https://t.me/tourist217"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Написать в Telegram @tourist217</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
