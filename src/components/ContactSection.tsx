'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('30-60k');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contact) return;

    // Trigger confetti celebration
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });

    setSubmitted(true);

    // Prepare telegram direct message
    const msg = encodeURIComponent(
      `🔥 Новая заявка с сайта digital-life.tech:\n` +
      `• Имя: ${name}\n` +
      `• Контакт: ${contact}\n` +
      `• Бюджет: ${budget}\n` +
      `• Описание идеи: ${description || 'Не указано'}`
    );

    // Open telegram in new tab
    const tgUrl = `https://t.me/digital_life_tech?text=${msg}`;
    setTimeout(() => {
      window.open(tgUrl, '_blank');
    }, 600);
  };

  return (
    <section id="contacts" className="py-24 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Связь и заявки</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Готовы запустить <br />
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                ваш проект на ИИ?
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Опишите своими словами, что нужно сделать — будь то игра для ивента, викторина, сайт компании или стартап. Отвечаю в течение 1–2 часов.
            </p>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <div className="text-xs uppercase font-semibold tracking-wider text-slate-400">
                Самый быстрый способ связи:
              </div>
              <a
                href="https://t.me/digital_life_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 text-white hover:border-cyan-400 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950">
                    <Send className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">Telegram напрямую</span>
                    <span className="text-xs text-cyan-300">@digital_life_tech</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 glow-box-cyan">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Заявка сформирована!</h3>
                  <p className="text-slate-300 text-sm max-w-md mx-auto">
                    Чат в Telegram открывается. Если окно не открылось автоматически, нажмите кнопку ниже:
                  </p>
                  <a
                    href="https://t.me/digital_life_tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    <span>Перейти в диалог Telegram</span>
                  </a>
                  <div>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-400 underline mt-4"
                    >
                      Отправить ещё одну заявку
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Ваше имя *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Алексей"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                        Telegram или телефон *
                      </label>
                      <input
                        type="text"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="@username или +7..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Ориентировочный бюджет
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="до 30 000 ₽">до 30 000 ₽ (промо-страница / квиз / кликер)</option>
                      <option value="30 000 – 60 000 ₽">30 000 – 60 000 ₽ (быстрый MVP / Telegram App)</option>
                      <option value="60 000 – 120 000 ₽">60 000 – 120 000 ₽ (сложный SaaS с AI и платежами)</option>
                      <option value="Нужно обсудить">Нужна консультация и оценка</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                      Кратко опишите вашу задумку или задачу
                    </label>
                    <textarea
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Например: хочу интерактивный квиз для стенда на выставке с моментальным подсчетом баллов и сбором контактов участников..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200" />
                    <span>Отправить заявку & Обсудить в Telegram</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Нажимая кнопку, вы перейдете в прямой чат с автором. Без спама и навязчивых рассылок.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
