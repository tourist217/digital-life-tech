export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'games' | 'quizzes' | 'services' | 'mvp';
  categoryLabel: string;
  clientOrEvent: string;
  timeline: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  vibePromptHighlights: string[];
  demoType: 'clicker' | 'quiz' | 'external' | 'interactive';
  demoUrl?: string;
  featured: boolean;
  coverGradient: string;
}

export const casesData: CaseStudy[] = [
  {
    id: 'case-1',
    slug: 'crypto-clicker-game',
    title: 'VibeClicker: Web3-геймификация и вирусный кликер',
    shortDescription: 'Мини-игра кликер с механикой прокачки пассивного дохода, комбо-множителями и локальным сохранением прогресса, собранная за 1 день.',
    fullDescription: 'Интерактивная браузерная игра, созданная в качестве демонстрации вирусной геймификации для мероприятий и крипто-комьюнити. Включает динамическую анимацию кликов, дерево улучшений "Vibe Multipliers", локальное сохранение прогресса и адаптивный мобильный интерфейс.',
    category: 'games',
    categoryLabel: 'Игры & Кликеры',
    clientOrEvent: 'Шоукейс DigitalLife Tech',
    timeline: '1 день (вайбкодинг)',
    techStack: ['React 19', 'Tailwind CSS', 'Canvas Confetti', 'Web Audio API'],
    metrics: [
      { label: 'Время создания', value: '8 часов' },
      { label: 'Вовлечённость (avg)', value: '4.2 мин' },
      { label: 'FPS на мобильных', value: '60 fps' },
    ],
    vibePromptHighlights: [
      'Архитектурный промпт для расчета кривой прогрессии улучшений (Cost = Base * 1.15^level)',
      'UI/UX промпт для эффекта вылетающих цифр и тактильной отдачи',
      'Система сохранения в localStorage с защитой от рассинхронизации таймеров'
    ],
    demoType: 'clicker',
    featured: true,
    coverGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
  },
  {
    id: 'case-2',
    slug: 'event-interactive-quiz',
    title: 'TechEvent Quiz: Интерактивная викторина для конференции',
    shortDescription: 'Высоконагруженный интерактивный квиз для участников офлайн-конференции с мгновенным подсчетом баллов и персонализированными бейджами.',
    fullDescription: 'Квиз разработан для IT-митапа с аудиторией 450+ человек. Участники сканировали QR-код на экране сцены, отвечали на 10 профильных вопросов о вайбкодинге и нейросетях за ограниченное время и получали персональный стикерпак и сертификат с рангом.',
    category: 'quizzes',
    categoryLabel: 'Квизы & Промо',
    clientOrEvent: 'AI & Dev Meetup 2026',
    timeline: '2 дня',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Dynamic OG Images'],
    metrics: [
      { label: 'Конверсия прохождения', value: '92%' },
      { label: 'Собрано лидов', value: '410+' },
      { label: 'Время сборки MVP', value: '14 часов' },
    ],
    vibePromptHighlights: [
      'Генерация 50 вариантов вопросов разной сложности через LLM-пайплайн',
      'Промпт для таймера с прогрессивной анимацией и плавной сменой вопросов',
      'Мгновенная генерация персонализированного изображения результата для соцсетей'
    ],
    demoType: 'quiz',
    featured: true,
    coverGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
  },
  {
    id: 'case-3',
    slug: 'ai-lead-qualifier',
    title: 'SmartLead AI: Автоматический квалификатор заявок',
    shortDescription: 'Микро-сервис, анализирующий входящие запросы клиентов через GPT-4o, определяющий бюджет и приоритет и отправляющий структурированную карточку в Telegram.',
    fullDescription: 'Сервис автоматизирует первичный скоринг клиентов для B2B-услуг. Пользователь заполняет короткую форму своими словами в свободной манере, а ИИ-модель структурирует запрос, выделяет технические требования, оценивает сроки и подбирает релевантные кейсы из базы.',
    category: 'services',
    categoryLabel: 'AI-сервисы & Боты',
    clientOrEvent: 'B2B Консалтинг Агентство',
    timeline: '3 дня',
    techStack: ['Next.js App Router', 'OpenAI API', 'Telegram Bot API', 'Zod'],
    metrics: [
      { label: 'Скорость ответа клиенту', value: '15 сек' },
      { label: 'Точность классификации', value: '96%' },
      { label: 'Экономия времени менеджера', value: '18 ч/нед' },
    ],
    vibePromptHighlights: [
      'Системный промпт с few-shot примерами для классификации лидов без галлюцинаций',
      'Zod-валидация структурированного JSON-вывода нейросети',
      'Шаблонизатор красивых Telegram-уведомлений с кнопками действий'
    ],
    demoType: 'interactive',
    featured: true,
    coverGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
  },
  {
    id: 'case-4',
    slug: 'saas-mvp-validator',
    title: 'PromptMatrix: SaaS-платформа для тестирования промптов',
    shortDescription: 'Полноценный рабочий SaaS с авторизацией, базой данных и гибким сравнением ответов разных языковых моделей side-by-side.',
    fullDescription: 'MVP веб-сервиса для промпт-инженеров и контент-команд. Позволяет запустить один и тот же системный промпт сразу в 4 разные модели, сравнить токены, стоимость и качество ответов, а также выгрузить отчет.',
    category: 'mvp',
    categoryLabel: 'MVP для бизнеса',
    clientOrEvent: 'AI Инкубатор',
    timeline: '5 дней',
    techStack: ['Next.js 16', 'PostgreSQL', 'Tailwind CSS', 'Vercel AI SDK'],
    metrics: [
      { label: 'Затраты на разработку', value: 'в 7 раз ниже рынка' },
      { label: 'Первые 100 юзеров', value: 'за 72 часа' },
      { label: 'Lighthouse Performance', value: '99/100' },
    ],
    vibePromptHighlights: [
      'Генерация архитектуры базы данных и миграций через Claude 3.7 Sonnet',
      'Асинхронный стриминг ответов нескольких LLM в едином UI',
      'Полная SEO-оптимизация и генерация динамических OG-карт'
    ],
    demoType: 'external',
    featured: true,
    coverGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
  },
];
