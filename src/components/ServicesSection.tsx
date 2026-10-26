import React from 'react';
import Link from 'next/link';
import { servicesData, processSteps } from '@/data/services';
import { Rocket, Gamepad2, Send, Cpu, Check, ArrowRight, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Rocket: <Rocket className="w-6 h-6 text-cyan-400" />,
  Gamepad2: <Gamepad2 className="w-6 h-6 text-purple-400" />,
  Send: <Send className="w-6 h-6 text-sky-400" />,
  Cpu: <Cpu className="w-6 h-6 text-emerald-400" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Услуги и разработка</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Что можно создать с помощью вайбкодинга
          </h2>
          <p className="text-slate-400 mt-4 text-base sm:text-lg">
            Вайбкодинг на базе передовых моделей (Claude 3.7 Sonnet, OpenAI, DeepSeek) стирает границы между мыслью и готовым продуктом.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="glass-panel p-8 rounded-3xl border border-slate-800/80 glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/60 flex items-center justify-center">
                    {iconMap[service.iconName] || <Cpu className="w-6 h-6 text-cyan-400" />}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/70">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">Стоимость:</span>
                  <span className="text-lg font-bold text-white font-mono">{service.priceFrom}</span>
                  <span className="text-xs text-slate-400 ml-2">({service.timeline})</span>
                </div>

                <a
                  href={`https://t.me/digital_life_tech?text=${encodeURIComponent(
                    `Привет! Интересует услуга "${service.title}". Давай обсудим!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-cyan-600 hover:text-white text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-all"
                >
                  <span>Заказать</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="mt-16 pt-16 border-t border-slate-800/60">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Как устроен процесс: от вашей идеи до релиза
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Без бюрократии, длинных созвонов и лишних звеньев
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 relative space-y-3"
              >
                <span className="text-3xl font-black text-cyan-500/30 font-mono block">
                  {step.step}
                </span>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
