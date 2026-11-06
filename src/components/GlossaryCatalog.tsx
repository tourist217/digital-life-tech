'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { glossaryData, glossaryCategories, GlossaryCategory } from '@/data/glossary';
import { Search, Sparkles, ArrowRight, Zap, ExternalLink, BookOpen, Layers } from 'lucide-react';

export default function GlossaryCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);

  // Handle URL hash anchor on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setHighlightedSlug(hash);
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Remove highlight after 2.5s
        const timer = setTimeout(() => setHighlightedSlug(null), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Filtered terms
  const filteredTerms = glossaryData.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesQuery =
      item.term.toLowerCase().includes(q) ||
      (item.originalTerm && item.originalTerm.toLowerCase().includes(q)) ||
      item.shortDefinition.toLowerCase().includes(q) ||
      item.practicalContext.toLowerCase().includes(q);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-10">
      {/* Search and Filter Controls */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Instant Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по терминам, аббревиатурам (RAG, TMA, Вайбкодинг)..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Сбросить
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {glossaryCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Найдено терминов: <strong className="text-white">{filteredTerms.length}</strong> из{' '}
          {glossaryData.length}
        </span>
        {searchQuery && (
          <span>
            По запросу: «<span className="text-cyan-400">{searchQuery}</span>»
          </span>
        )}
      </div>

      {/* Terms Grid */}
      {filteredTerms.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Ничего не найдено</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Попробуйте изменить поисковый запрос или выбрать категорию «Все термины».
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((term) => {
            const isHighlighted = highlightedSlug === term.slug;
            return (
              <div
                key={term.slug}
                id={term.slug}
                className={`glass-panel p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                  isHighlighted
                    ? 'border-cyan-400 shadow-2xl shadow-cyan-500/40 scale-[1.01]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-4">
                  {/* Category and Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-cyan-300 border border-cyan-800/50 font-medium">
                      {term.categoryLabel}
                    </span>
                    {term.originalTerm && (
                      <span className="text-xs text-slate-400 font-mono bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                        {term.originalTerm}
                      </span>
                    )}
                  </div>

                  {/* Title & Anchor link */}
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 group">
                      <Link
                        href={`/glossary/${term.slug}`}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {term.term}
                      </Link>
                      <a
                        href={`#${term.slug}`}
                        className="text-slate-600 hover:text-cyan-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity font-mono"
                        title="Ссылка на термин"
                      >
                        #
                      </a>
                    </h3>
                  </div>

                  {/* Short definition */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {term.shortDefinition}
                  </p>

                  {/* Practical Context Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block mb-0.5">В реальных проектах:</span>
                      <span className="text-slate-400">{term.practicalContext}</span>
                    </div>
                  </div>

                  {/* Related Links */}
                  {((term.relatedCases && term.relatedCases.length > 0) ||
                    (term.relatedPosts && term.relatedPosts.length > 0)) && (
                    <div className="pt-2 text-xs space-y-1.5">
                      <span className="text-slate-500 font-medium block">Использовано в материалах:</span>
                      <div className="flex flex-wrap gap-2">
                        {term.relatedCases?.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/cases/${c.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-cyan-400 hover:bg-slate-800 border border-cyan-900/40 transition-colors"
                          >
                            <Layers className="w-3 h-3 text-cyan-400" />
                            <span>{c.title}</span>
                          </Link>
                        ))}
                        {term.relatedPosts?.map((p) => (
                          <Link
                            key={p.slug}
                            href={`/blog/${p.slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-purple-300 hover:bg-slate-800 border border-purple-900/40 transition-colors"
                          >
                            <BookOpen className="w-3 h-3 text-purple-400" />
                            <span>{p.title}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom link to full definition page */}
                <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Пермалинк: <code className="text-slate-400 font-mono text-[11px]">#{term.slug}</code>
                  </span>
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>Развернутый разбор</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
