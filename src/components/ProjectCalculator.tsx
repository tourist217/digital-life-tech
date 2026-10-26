'use client';

import React, { useState } from 'react';
import { Calculator, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface ProjectTypeOption {
  id: string;
  name: string;
  basePrice: number;
  baseDays: number;
  description: string;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'mvp',
    name: 'Полноценный MVP сервиса',
    basePrice: 45000,
    baseDays: 6,
    description: 'Веб-приложение с логикой, БД и личным кабинетом',
  },
  {
    id: 'interactive',
    name: 'Интерактивный квиз / кликер / промо',
    basePrice: 25000,
    baseDays: 3,
    description: 'Геймификация для мероприятий, вирусных акций и сбора лидов',
  },
  {
    id: 'tma',
    name: 'Telegram Mini App (WebApp)',
    basePrice: 35000,
    baseDays: 5,
    description: 'Приложение внутри Telegram с авторизацией и платежами',
  },
  {
    id: 'ai-bot',
    name: 'AI-ассистент / Чат-бот / Парсер',
    basePrice: 30000,
    baseDays: 4,
    description: 'Интеграция LLM (ChatGPT/Claude) в бизнес-процессы',
  },
  {
    id: 'landing',
    name: 'Высококонверсионный сайт на Next.js',
    basePrice: 22000,
    baseDays: 2,
    description: 'Чистый быстрый код с SEO и GEO оптимизацией',
  },
];

interface FeatureOption {
  id: string;
  name: string;
  price: number;
  days: number;
}

const EXTRA_FEATURES: FeatureOption[] = [
  { id: 'auth', name: 'Авторизация и профили пользователей', price: 8000, days: 1 },
  { id: 'payments', name: 'Приём платежей (ЮKassa / Prodamus / Crypto)', price: 10000, days: 1 },
  { id: 'database', name: 'База данных PostgreSQL / Supabase', price: 7000, days: 1 },
  { id: 'tg-bot', name: 'Мгновенные уведомления о заявках в Telegram', price: 4000, days: 0 },
  { id: 'llm', name: 'Интеграция нейросетей (OpenAI / Claude API)', price: 9000, days: 1 },
  { id: 'geo-seo', name: 'Глубокая GEO-разметка (llms.txt + Schema.org)', price: 5000, days: 0 },
];

export default function ProjectCalculator() {
  const [selectedType, setSelectedType] = useState<string>('mvp');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['tg-bot', 'geo-seo']);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const currentType = PROJECT_TYPES.find((t) => t.id === selectedType) || PROJECT_TYPES[0];

  const toggleFeature = (id: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Calculations
  const featuresPrice = selectedFeatures.reduce((sum, fId) => {
    const f = EXTRA_FEATURES.find((item) => item.id === fId);
    return sum + (f ? f.price : 0);
  }, 0);

  const featuresDays = selectedFeatures.reduce((sum, fId) => {
    const f = EXTRA_FEATURES.find((item) => item.id === fId);
    return sum + (f ? f.days : 0);
  }, 0);

  const subtotalPrice = currentType.basePrice + featuresPrice;
  const totalPrice = isUrgent ? Math.round(subtotalPrice * 1.25) : subtotalPrice;

  const totalDays = Math.max(
    1,
    isUrgent ? Math.ceil((currentType.baseDays + featuresDays) * 0.6) : currentType.baseDays + featuresDays
  );

  // Pre-filled Telegram link
  const generateTelegramMessage = () => {
    const selectedFeatureNames = EXTRA_FEATURES.filter((f) =>
      selectedFeatures.includes(f.id)
    )
      .map((f) => f.name)
      .join(', ');

    const text = encodeURIComponent(
      `Привет! Рассчитал проект на digital-life.tech:\n` +
        `• Тип: ${currentType.name}\n` +
        `• Доп. функции: ${selectedFeatureNames || 'Базовые'}\n` +
        `• Срочность: ${isUrgent ? 'Экспресс (нужно срочно!)' : 'Обычная'}\n` +
        `• Примерная стоимость: ~${totalPrice.toLocaleString('ru-RU')} ₽\n` +
        `• Срок: ~${totalDays} дн.\n\n` +
        `Давай обсудим детали!`
    );
    return `https://t.me/digital_life_tech?text=${text}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300 mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>Прозрачное ценообразование</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Калькулятор стоимости и сроков проекта
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base">
            Выберите параметры вашей задачи. Благодаря вайбкодингу разработка обходится без скрытых переплат и задержек.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Options Col (2 cols) */}
          <div className="lg:col-span-2 space-y-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
            {/* 1. Project Type */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
                1. Тип цифрового продукта
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md shadow-cyan-950'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{type.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{type.description}</p>
                      <div className="mt-2 text-xs font-mono text-cyan-300">
                        от {type.basePrice.toLocaleString('ru-RU')} ₽ • {type.baseDays} дн.
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Extra Features */}
            <div>
              <label className="block text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
                2. Дополнительные возможности и интеграции
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {EXTRA_FEATURES.map((feature) => {
                  const isChecked = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-indigo-950/40 border-indigo-500/80 text-white'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                              : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">{feature.name}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        +{feature.price.toLocaleString('ru-RU')} ₽
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Urgent Switch */}
            <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Экспресс-запуск (в приоритетном режиме)
                </span>
                <span className="text-xs text-slate-400">
                  Работа в выходные / ночные смены, ускорение сроков на 40%
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsUrgent(!isUrgent)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isUrgent ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
                aria-label="Toggle express deadline"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isUrgent ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Result Sticky Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 sticky top-24 glow-box-cyan">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Оценка вашего проекта</span>
            </div>

            <div className="py-4 border-b border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Итоговая ориентировочная стоимость:</span>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-mono text-cyan-400">
                ~{totalPrice.toLocaleString('ru-RU')} ₽
              </div>
              <p className="text-[11px] text-slate-500">
                Включает кастомный код, верстку, деплой на Vercel и гарантию 14 дней.
              </p>
            </div>

            <div className="py-4 border-b border-slate-800 flex items-center justify-between text-sm">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Срок готовности:
              </span>
              <span className="font-bold text-white font-mono">~{totalDays} {totalDays === 1 ? 'день' : totalDays < 5 ? 'дня' : 'дней'}</span>
            </div>

            <div className="py-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Исходники передаются на ваш GitHub</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Привязка домена digital-life.tech или вашего</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Оплата 50% / 50% поэтапно</span>
              </div>
            </div>

            <a
              href={generateTelegramMessage()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Отправить расчёт в Telegram</span>
            </a>

            <p className="text-[10px] text-center text-slate-500 mt-2">
              Откроет чат с автором (@digital_life_tech) с уже заполненным текстом заявки.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
