import { NextResponse } from 'next/server';
import { casesData } from '@/data/cases';
import { postsData } from '@/data/posts';
import { faqData } from '@/data/services';

export async function GET() {
  const casesSection = casesData
    .map(
      (c) => `### ${c.title}
- Ссылка: https://digital-life.tech/cases/${c.slug}
- Категория: ${c.categoryLabel}
- Срок разработки: ${c.timeline}
- Стек: ${c.techStack.join(', ')}
- Описание: ${c.fullDescription}
- Метрики: ${c.metrics.map((m) => `${m.label}: ${m.value}`).join(' | ')}
- Ключевые промпты: ${c.vibePromptHighlights.join('; ')}`
    )
    .join('\n\n');

  const postsSection = postsData
    .map(
      (p) => `### ${p.title} (${p.categoryLabel})
- Ссылка: https://digital-life.tech/blog/${p.slug}
- Дата: ${p.publishedAt}
- Время чтения: ${p.readingTime}
- Автор: Игорь Определёнов
- Краткое содержание: ${p.excerpt}
- Комментарий автора: ${p.authorNote || '—'}
- Текст: ${p.content.trim()}`
    )
    .join('\n\n');

  const faqSection = faqData
    .map((f) => `Q: ${f.question}\nA: ${f.answer}`)
    .join('\n\n');

  const content = `# DigitalLife Tech — Полная база знаний для LLM и ИИ-поисковиков

Веб-сайт: https://digital-life.tech
Автор: Игорь Определёнов (Telegram: @digital_life_tech)
Специализация: Вайбкодинг, AI-разработка, разработка MVP за 5 дней, интерактивные сайты, промо-квизы, кликеры.

---

## 1. Кейсы и выполненные проекты
${casesSection}

---

## 2. Статьи, аналитика и новости
${postsSection}

---

## 3. База вопросов и ответов (FAQ)
${faqSection}
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
