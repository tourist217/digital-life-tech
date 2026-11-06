'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Check } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already accepted cookie
    const accepted = localStorage.getItem('cookie_consent_accepted');
    if (!accepted) {
      // Small delay before showing so it doesn't jump abruptly on load
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent_accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Уведомление об использовании cookie"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom duration-300"
    >
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-700/80 bg-slate-950/95 shadow-2xl text-slate-300 text-xs leading-relaxed space-y-3">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-slate-300">
            Этот сайт использует файлы cookie и веб-аналитику (Яндекс Метрика) для анализа посещаемости. Мы не собираем и не храним ваши личные данные на серверах. Подробнее — в{' '}
            <Link
              href="/privacy"
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 font-medium"
            >
              Политике конфиденциальности
            </Link>
            .
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            type="button"
            onClick={acceptCookies}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-colors shadow-sm cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>Понятно</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
