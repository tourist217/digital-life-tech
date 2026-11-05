'use client';

import React from 'react';
import { Send, Sparkles, ArrowRight, ShieldCheck, MessageCircle, Clock, Zap } from 'lucide-react';

export default function ContactSection() {
  const telegramUrl = 'https://t.me/tourist217';

  return (
    <section id="contacts" className="py-24 bg-slate-950/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-slate-800 text-center space-y-8 relative overflow-hidden glow-box-cyan">
          {/* Top pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800 text-xs font-semibold text-cyan-300 mx-auto">
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span>Прямая связь без посредников</span>
          </div>

          {/* Heading */}
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Обсудим ваш проект{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                в Telegram
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Напишите мне в личные сообщения: расскажите в свободной форме о вашей идее, ивенте или задаче. Отвечаю лично в течение 1–2 часов.
            </p>
          </div>

          {/* Big Telegram CTA Button */}
          <div className="pt-2">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group"
            >
              <Send className="w-5 h-5 fill-current" />
              <span>Написать в Telegram @tourist217</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs sm:text-sm mb-1">
                <Clock className="w-4 h-4" />
                <span>Быстрый ответ</span>
              </div>
              <p className="text-xs text-slate-400">
                Без очередей и менеджеров. Общаетесь сразу с автором и разработчиком.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs sm:text-sm mb-1">
                <Zap className="w-4 h-4" />
                <span>Оценка за 30 минут</span>
              </div>
              <p className="text-xs text-slate-400">
                Сориентирую по срокам реализации и архитектуре на первом созвоне или в чате.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs sm:text-sm mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Приватность</span>
              </div>
              <p className="text-xs text-slate-400">
                Сайт не собирает и не хранит ваши данные (152-ФЗ). Диалог только в защищенном TG.
              </p>
            </div>
          </div>

          {/* Privacy statement footnote */}
          <div className="pt-4 border-t border-slate-800/60 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              Мы не собираем персональные данные на сайте. Никаких форм ввода, баз клиентов и спам-рассылок.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
