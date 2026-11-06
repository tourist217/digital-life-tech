'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { glossaryData, GlossaryTermItem } from '@/data/glossary';
import { Sparkles, ArrowRight, X, BookOpen, Zap } from 'lucide-react';

interface GlossaryTermProps {
  slug: string;
  children?: React.ReactNode;
  fallbackText?: string;
}

export default function GlossaryTerm({ slug, children, fallbackText }: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardPosition, setCardPosition] = useState<{ top: number; left: number; placeAbove: boolean }>({
    top: 0,
    left: 0,
    placeAbove: false,
  });

  const termData: GlossaryTermItem | undefined = glossaryData.find((item) => item.slug === slug);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate card position on desktop to prevent viewport overflow
  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const cardWidth = 320;
    const cardHeight = 220;

    let left = rect.left + rect.width / 2 - cardWidth / 2;
    // Keep in screen bounds horizontally
    if (left < 16) left = 16;
    if (left + cardWidth > window.innerWidth - 16) {
      left = window.innerWidth - cardWidth - 16;
    }

    // Check vertical space (place above if not enough room below)
    const spaceBelow = window.innerHeight - rect.bottom;
    const placeAbove = spaceBelow < cardHeight + 16 && rect.top > cardHeight + 16;
    const top = placeAbove ? rect.top - 8 : rect.bottom + 8;

    setCardPosition({ top, left, placeAbove });
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    hoverTimerRef.current = setTimeout(() => {
      calculatePosition();
      setIsOpen(true);
    }, 160);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsOpen(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isMobile) {
      setIsOpen(true);
    } else {
      calculatePosition();
      setIsOpen(!isOpen);
    }
  };

  // Close on Escape or click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!termData) {
    return <span>{children || fallbackText || slug}</span>;
  }

  const displayText = children || fallbackText || termData.term;

  return (
    <span className="relative inline">
      {/* Trigger element in text */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-baseline text-inherit font-medium border-b border-dashed border-cyan-400/80 hover:border-cyan-300 hover:text-cyan-300 transition-colors cursor-help group text-left align-baseline focus:outline-none focus:ring-1 focus:ring-cyan-400 rounded-sm"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>{displayText}</span>
        <span className="text-[10px] text-cyan-400/80 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          ℹ
        </span>
      </button>

      {/* Desktop Hover Card (fixed portal-like positioning) */}
      {!isMobile && isOpen && (
        <div
          ref={cardRef}
          onMouseEnter={() => {
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
            setIsOpen(true);
          }}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'fixed',
            top: cardPosition.placeAbove ? 'auto' : `${cardPosition.top}px`,
            bottom: cardPosition.placeAbove ? `${window.innerHeight - cardPosition.top}px` : 'auto',
            left: `${cardPosition.left}px`,
          }}
          className="z-50 w-80 p-4 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/80 text-left text-slate-200 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5 font-bold text-white text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>{termData.term}</span>
            </div>
            {termData.originalTerm && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800 font-mono">
                {termData.originalTerm}
              </span>
            )}
          </div>

          {/* Definition */}
          <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
            {termData.shortDefinition}
          </p>

          {/* Practical context */}
          <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 mb-3 flex items-start gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{termData.practicalContext}</span>
          </div>

          {/* Footer link */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono">{termData.categoryLabel}</span>
            <Link
              href={`/glossary/${termData.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>В глоссарий</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet Drawer */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          />

          {/* Sheet */}
          <div
            ref={cardRef}
            className="relative z-10 w-full max-w-lg p-6 rounded-t-3xl bg-slate-950 border-t border-cyan-500/40 shadow-2xl text-left text-slate-200 space-y-4 animate-in slide-in-from-bottom duration-250 max-h-[85vh] overflow-y-auto"
          >
            {/* Grab handle */}
            <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto -mt-2 mb-2" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{termData.term}</h3>
                  {termData.originalTerm && (
                    <span className="text-xs text-cyan-400 font-mono">{termData.originalTerm}</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {termData.shortDefinition}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Практическая польза:</span>
              </div>
              <p>{termData.practicalContext}</p>
            </div>

            <div className="pt-2">
              <Link
                href={`/glossary/${termData.slug}`}
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-md"
              >
                <span>Читать полный разбор термина</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </span>
  );
}
