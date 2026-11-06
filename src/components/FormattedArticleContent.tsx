'use client';

import React from 'react';
import GlossaryTerm from './GlossaryTerm';

interface Props {
  content: string;
}

/**
 * Parses inline tokens:
 * 1. [[slug|custom text]] or [[slug]] -> GlossaryTerm popover
 * 2. **bold** -> <strong>
 * 3. *italic* -> <em>
 * 4. `code` -> <code>
 */
export function renderRichInline(text: string): React.ReactNode {
  // Regex matching all token types
  const tokenRegex = /(\[\[[a-z0-9-]+(?:\|[^\]]+)?\]\]|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    const key = `token-${match.index}`;

    if (token.startsWith('[[') && token.endsWith(']]')) {
      // [[slug|customText]] or [[slug]]
      const inner = token.slice(2, -2);
      const [slug, customText] = inner.split('|');
      // If customText contained bold **text**, strip asterisks inside
      const cleanCustomText = customText ? customText.replace(/\*\*/g, '') : undefined;
      parts.push(
        <GlossaryTerm key={key} slug={slug}>
          {cleanCustomText}
        </GlossaryTerm>
      );
    } else if (token.startsWith('**') && token.endsWith('**')) {
      // **bold**
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={key} className="font-bold text-white">
          {renderRichInline(boldText)}
        </strong>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      // *italic*
      const italicText = token.slice(1, -1);
      parts.push(
        <em key={key} className="italic text-slate-300">
          {italicText}
        </em>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      // `code`
      const codeText = token.slice(1, -1);
      parts.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-mono text-xs"
        >
          {codeText}
        </code>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function FormattedArticleContent({ content }: Props) {
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
              {renderRichInline(trimmed.replace('## ', ''))}
            </h2>
          );
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xl font-bold text-cyan-300 pt-4 pb-1">
              {renderRichInline(trimmed.replace('### ', ''))}
            </h3>
          );
        }

        if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ')) {
          const lines = trimmed.split('\n');
          return (
            <ol key={idx} className="space-y-2 list-decimal pl-5 text-slate-300">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{renderRichInline(line.replace(/^\d+\.\s*/, ''))}</li>
              ))}
            </ol>
          );
        }

        if (trimmed.startsWith('- ')) {
          const lines = trimmed.split('\n- ').map((l) => l.replace(/^- /, ''));
          return (
            <ul key={idx} className="space-y-2 list-disc pl-5 text-slate-300">
              {lines.map((line, lIdx) => (
                <li key={lIdx}>{renderRichInline(line)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {renderRichInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
