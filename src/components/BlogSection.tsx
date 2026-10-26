import React from 'react';
import Link from 'next/link';
import { postsData } from '@/data/posts';
import { BookOpen, ArrowRight, MessageSquareQuote, Calendar, Clock } from 'lucide-react';

export default function BlogSection() {
  const featuredPosts = postsData.slice(0, 3);

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800 text-xs font-semibold text-cyan-300 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>База знаний, новости & заметки</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Мысли о вайбкодинге, ИИ и GEO
            </h2>
            <p className="text-slate-400 mt-3 text-base max-w-xl">
              Статьи без корпоративной воды. Реальный опыт сборки продуктов на нейросетях, новости AI и личные заметки с комментариями автора.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold text-sm group"
          >
            <span>Все статьи и заметки ({postsData.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="px-2.5 py-1 rounded-full bg-slate-900 text-cyan-300 border border-cyan-800/50 font-medium">
                    {post.categoryLabel}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {post.readingTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white hover:text-cyan-300 transition-colors mb-3 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Author commentary block */}
                {post.authorNote && (
                  <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs text-slate-300 my-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                      <MessageSquareQuote className="w-3.5 h-3.5" />
                      <span>Комментарий автора:</span>
                    </div>
                    <p className="italic text-slate-400 line-clamp-3">«{post.authorNote}»</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-[10px] text-slate-500 font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  <span>Читать</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
