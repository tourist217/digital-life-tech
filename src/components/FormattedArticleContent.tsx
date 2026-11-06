'use client';

import React from 'react';
import GlossaryTerm from './GlossaryTerm';

interface Props {
  content: string;
}

export default function FormattedArticleContent({ content }: Props) {
  // Helper to parse [[slug|text]] or [[slug]]
  const parseInlineTerms = (text: string) => {
    const regex = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      // Push text before match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const slug = match[1];
      const customText = match[2];

      parts.push(
        <GlossaryTerm key={`${slug}-${match.index}`} slug={slug}>
          {customText || undefined}
        </GlossaryTerm>
      );

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const paragraphs = content.split('\n\n');

  return (
    <div className="prose prose-invert prose-cyan max-w-none text-slate-200 text-base leading-relaxed space-y-6">
      {paragraphs.map((paragraph, idx) => {
        const trimmed = paragraph.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('## ')) {
          return (
            <h2
              key={idx}
              className="text-2xl sm:text-3xl font-bold text-white pt-6 pb-2 border-b border-slate-800"
            >
              {parseInlineTerms(trimmed.replace('## ', ''))}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl font-bold text-cyan-300 pt-4 pb-1">
              {parseInlineTerms(trimmed.replace('### ', ''))}
            </h3>
          );
        }

        if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
          const lines = trimmed.split('\n');
          return (
            <ol key={idx} className="space-y-2 list-decimal pl-5 text-slate-300">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{parseInlineTerms(line.replace(/^\d+\.\s*/, ''))}</li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith('- ')) {
          const lines = trimmed.split('\n- ').map((l) => l.replace(/^- /, ''));
          return (
            <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-300">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{parseInlineTerms(line)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {parseInlineTerms(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
