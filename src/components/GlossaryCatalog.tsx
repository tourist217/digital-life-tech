'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { glossaryData, glossaryCategories, GlossaryCategory } from '@/data/glossary';
import {
  Search,
  Sparkles,
  ArrowRight,
  Zap,
  BookOpen,
  Layers,
  LayoutGrid,
  List,
  Check,
  Share2,
} from 'lucide-react';

export default function GlossaryCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [selectedLetter, setSelectedLetter] = useState<string | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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
        const timer = setTimeout(() => setHighlightedSlug(null), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Compute available letters from data
  const availableLetters = useMemo(() => {
    const lettersSet = new Set<string>();
    glossaryData.forEach((item) => {
      const firstChar = item.term.charAt(0).toUpperCase();
      lettersSet.add(firstChar);
    });
    return Array.from(lettersSet).sort((a, b) => a.localeCompare(b, 'ru'));
  }, []);

  // Filtered terms
  const filteredTerms = glossaryData.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesLetter =
      selectedLetter === 'all' || item.term.charAt(0).toUpperCase() === selectedLetter;

    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory && matchesLetter;

    const matchesQuery =
      item.term.toLowerCase().includes(q) ||
      (item.originalTerm && item.originalTerm.toLowerCase().includes(q)) ||
      item.shortDefinition.toLowerCase().includes(q) ||
      item.practicalContext.toLowerCase().includes(q);

    return matchesCategory && matchesLetter && matchesQuery;
  });

  const copyAnchor = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/glossary#${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Search, Categories, Alphabet and View Switcher */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        {/* Top row: Search input + View mode toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) {
                  setSelectedLetter('all');
                }
              }}
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

          {/* View mode buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-2xl border border-slate-800 self-end sm:self-auto flex-shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'grid'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Режим карточек"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Сетка</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Компактный список"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Список</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-800/60 pt-4">
          {glossaryCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
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

        {/* Alphabet Rubricator Bar (Алфавитный рубрикатор) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-t border-slate-800/60 pt-4 scrollbar-none">
          <span className="text-slate-500 font-mono text-[11px] mr-1 flex-shrink-0">Алфавит:</span>
          <button
            type="button"
            onClick={() => setSelectedLetter('all')}
            className={`px-2.5 py-1 rounded-lg font-mono text-xs transition-all flex-shrink-0 ${
              selectedLetter === 'all'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            Все
          </button>
          {availableLetters.map((letter) => {
            const isSelected = selectedLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 rounded-lg font-mono text-xs flex items-center justify-center transition-all flex-shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-900 border border-transparent hover:border-slate-800'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Current filter badge */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Найдено терминов: <strong className="text-white">{filteredTerms.length}</strong> из{' '}
          {glossaryData.length}
        </span>
        <div className="flex items-center gap-2">
          {selectedLetter !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Буква: {selectedLetter}
            </span>
          )}
          {searchQuery && (
            <span>
              Поиск: «<strong className="text-cyan-400">{searchQuery}</strong>»
            </span>
          )}
        </div>
      </div>

      {/* No results state */}
      {filteredTerms.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">Ничего не найдено</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Попробуйте изменить поисковый запрос, сбросить буквенный фильтр или выбрать другую категорию.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW (Сетка с подробным описанием) */
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
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2 group">
                      <Link
                        href={`/glossary/${term.slug}`}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {term.term}
                      </Link>
                    </h3>
                    <button
                      type="button"
                      onClick={(e) => copyAnchor(term.slug, e)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
                      title="Скопировать ссылку на термин"
                    >
                      {copiedSlug === term.slug ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Short definition */}
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {term.shortDefinition}
                  </p>

                  {/* Analogy preview if available */}
                  {term.analogy && (
                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>На простой аналогии:</span>
                      </div>
                      <p className="text-slate-300 italic line-clamp-2">
                        «{term.analogy.storyWith}»
                      </p>
                    </div>
                  )}

                  {/* Practical Context Box */}
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block mb-0.5">В реальных проектах:</span>
                      <span className="text-slate-400 line-clamp-2">{term.practicalContext}</span>
                    </div>
                  </div>

                  {/* Related Links */}
                  {((term.relatedCases && term.relatedCases.length > 0) ||
                    (term.relatedPosts && term.relatedPosts.length > 0)) && (
                    <div className="pt-2 text-xs space-y-1.5">
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
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom link to full deep-dive */}
                <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono text-[11px]">
                    #{term.slug}
                  </span>
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 transition-all cursor-pointer"
                  >
                    <span>Читать полный разбор</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW (Компактный список / Таблица) */
        <div className="glass-panel rounded-3xl border border-slate-800 divide-y divide-slate-800/70 overflow-hidden">
          {filteredTerms.map((term) => (
            <div
              key={term.slug}
              id={term.slug}
              className="p-4 sm:p-5 hover:bg-slate-900/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="font-bold text-white text-base hover:text-cyan-400 transition-colors"
                  >
                    {term.term}
                  </Link>
                  {term.originalTerm && (
                    <span className="text-[11px] text-slate-400 font-mono bg-slate-900 px-2 py-0.2 rounded border border-slate-800">
                      {term.originalTerm}
                    </span>
                  )}
                  <span className="text-[10px] px-2 py-0.2 rounded-full bg-slate-900 text-cyan-300 border border-cyan-800/50">
                    {term.categoryLabel}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 max-w-2xl leading-relaxed">
                  {term.shortDefinition}
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
                <button
                  type="button"
                  onClick={(e) => copyAnchor(term.slug, e)}
                  className="p-2 rounded-lg text-slate-500 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
                  title="Скопировать ссылку"
                >
                  {copiedSlug === term.slug ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <Link
                  href={`/glossary/${term.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 border border-cyan-500/30 text-xs font-semibold transition-all"
                >
                  <span>Разбор</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
