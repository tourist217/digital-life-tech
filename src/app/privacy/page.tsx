import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, FileText, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности и использования cookie | DigitalLife Tech',
  description:
    'Политика конфиденциальности сайта digital-life.tech: порядок обработки файлов cookie, аналитики Яндекс Метрика и соблюдение требований 152-ФЗ.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>На главную страницу</span>
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-12 pb-8 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-xs font-semibold text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Соответствие 152-ФЗ РФ</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Политика конфиденциальности и использования cookie
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Редакция действует с 26 октября 2026 г. • digital-life.tech
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-invert prose-cyan max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span>1. Общие положения и отсутствие сбора персональных данных</span>
            </h2>
            <p>
              Настоящая Политика определяет порядок взаимодействия сайта{' '}
              <strong className="text-white">digital-life.tech</strong> (далее — «Сайт») с пользователями и разъясняет статус обработки технической информации в соответствии с Федеральным законом РФ № 152-ФЗ «О персональных данных».
            </p>
            <p className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
              <strong className="text-emerald-400 block mb-1">Главный принцип:</strong>
              Сайт не содержит форм регистрации, полей ввода персональных данных (ФИО, телефонов, паспортных данных, адресов проживания). Сайт не осуществляет сбор, хранение, систематизацию или передачу личных персональных данных пользователей на собственных серверах и не является оператором персональных данных в понимании ст. 3 Федерального закона № 152-ФЗ.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>2. Использование файлов cookie и системы веб-аналитики</span>
            </h2>
            <p>
              Для обеспечения корректной работы интерфейса и оценки качества материалов на Сайте используются файлы cookie (куки) и сервис веб-аналитики{' '}
              <strong className="text-white">Яндекс Метрика</strong> (счётчик № 114104123).
            </p>
            <p>
              Сервис Яндекс Метрика в автоматическом обезличенном режиме собирает следующие технические сведения:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
              <li>IP-адрес пользователя (в обезличенном виде);</li>
              <li>Тип браузера, операционной системы и разрешение экрана;</li>
              <li>Источник перехода на Сайт (поисковые системы, прямые переходы, ссылки);</li>
              <li>Просмотренные страницы, глубина просмотра и время пребывания на Сайте.</li>
            </ul>
            <p>
              Указанные сведения обрабатываются исключительно в обобщенном статистическом виде с целью улучшения удобства использования Сайта и скорости загрузки страниц.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              3. Управление файлами cookie и их отключение
            </h2>
            <p>
              Пользователь вправе в любой момент заблокировать или удалить файлы cookie через настройки своего интернет-браузера (Google Chrome, Яндекс Браузер, Safari, Firefox и др.), а также использовать расширения для блокировки веб-аналитики.
            </p>
            <p>
              Отключение файлов cookie не препятствует чтению статей, просмотру кейсов и использованию интерактивных элементов Сайта.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              4. Коммуникация и прямая связь
            </h2>
            <p>
              Вся коммуникация, обсуждение проектов, технического задания и стоимости разработки происходит исключительно по инициативе пользователя в стороннем защищенном мессенджере{' '}
              <strong className="text-white">Telegram</strong> при переходе по ссылке{' '}
              <a
                href="https://t.me/tourist217"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline"
              >
                @tourist217
              </a>
              . Обработка данных внутри Telegram регулируется правилами и политикой безопасности сервиса Telegram.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">
              5. Контактная информация
            </h2>
            <p>
              По всем вопросам касательно настоящей Политики и работы Сайта вы можете обратиться напрямую к автору проекта:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm space-y-1">
              <div><strong className="text-white">Автор и владелец ресурса:</strong> Игорь Определёнов</div>
              <div><strong className="text-white">Сайт:</strong> https://digital-life.tech</div>
              <div><strong className="text-white">Telegram:</strong> <a href="https://t.me/tourist217" className="text-cyan-400">@tourist217</a></div>
            </div>
          </section>
        </div>

        {/* CTA Back to work */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Вернуться к просмотру сайта</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
