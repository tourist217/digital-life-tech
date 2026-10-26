import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { postsData } from '@/data/posts';
import { ArrowLeft, Calendar, Clock, MessageSquareQuote, Send, Sparkles, UserCheck } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return postsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData.find((item) => item.slug === slug);
  if (!post) return { title: 'Статья не найдена' };

  return {
    title: `${post.title} | DigitalLife Tech`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['Игорь Определёнов'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = postsData.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="py-16 sm:py-24">
      <JsonLd
        type="article"
        articleData={{
          title: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          url: `https://digital-life.tech/blog/${post.slug}`,
        }}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Назад в блог и заметки</span>
        </Link>

        {/* Post Header */}
        <header className="space-y-4 mb-10 border-b border-slate-800 pb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-medium">
              {post.categoryLabel}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              {post.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-slate-300 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Игорь Определёнов</div>
              <div className="text-xs text-slate-400 font-mono">digital-life.tech • Вайбкодер & AI Инженер</div>
            </div>
          </div>
        </header>

        {/* Author Note Callout */}
        {post.authorNote && (
          <aside className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 my-8 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Личный комментарий автора:</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed italic">
              «{post.authorNote}»
            </p>
          </aside>
        )}

        {/* Post Content */}
        <div className="prose prose-invert prose-cyan max-w-none text-slate-200 text-base leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={idx} className="text-2xl sm:text-3xl font-bold text-white pt-6 pb-2 border-b border-slate-800">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={idx} className="text-xl font-bold text-cyan-300 pt-4 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Tags */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap gap-2">
          {post.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-400 border border-slate-800 font-mono"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Lead Capture Box in Article */}
        <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-500/30 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            Хотите применить эти технологии в вашем бизнесе?
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Напишите мне в Telegram — обсудим вашу задачу и подберем быстрый путь реализации за считанные дни.
          </p>
          <a
            href={`https://t.me/digital_life_tech?text=${encodeURIComponent(
              `Привет! Прочитал статью "${post.title}". Хочу обсудить совместный проект!`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Написать автору в Telegram</span>
          </a>
        </div>
      </article>
    </div>
  );
}
