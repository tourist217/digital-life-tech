import React from 'react';
import { Sparkles, Terminal, CheckCircle2, UserCheck, Flame } from 'lucide-react';

export default function ManifestoSection() {
  return (
    <section className="py-20 bg-slate-950/70 border-y border-slate-800/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Манифест DigitalLife Tech</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              «Несложные проекты можно без проблем собирать с помощью вайбкодинга»
            </h2>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Раньше, чтобы запустить простой промо-квиз для ивента, мини-игру кликер или рабочий MVP стартапа, требовалась команда из 5 человек, 2 месяца согласований и бюджет от 300 000 рублей.
              </p>
              <p>
                <strong>В 2026 году этот подход морально устарел.</strong> Благодаря вайбкодингу и глубокому пониманию работы языковых моделей, один опытный инженер-архитектор собирает то же самое за считанные дни. При этом код получается чистым, типизированным (TypeScript + Next.js), полностью кастомным и масштабируемым.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Никаких конструкторов и абонентской платы</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Полная передача исходников в ваш GitHub</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Оптимизация под GEO и ИИ-поисковики</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Молниеносный деплой на Vercel Edge</span>
              </div>
            </div>
          </div>

          {/* Right Card: Founder / Persona */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 relative">
              <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-md">
                Автор проекта
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-cyan-500/20">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <UserCheck className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Игорь Определёнов</h3>
                  <p className="text-xs text-cyan-400 font-mono">
                    Вайбкодер & AI Инженер • digital-life.tech
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                «Моя цель — помочь предпринимателям, организаторам мероприятий и авторам идей перестать закапывать месяцы в разработку и начать запускать гипотезы за пару дней. Если у вас есть задумка — напишите мне в Telegram, и мы разберем, как собрать её на ИИ.»
              </p>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Flame className="w-4 h-4" />
                  Открыт к новым проектам
                </span>
                <a
                  href="https://t.me/digital_life_tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-semibold"
                >
                  Написать лично →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
