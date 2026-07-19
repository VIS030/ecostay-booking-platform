import React from 'react';

function parseMarkdown(text) {
  if (!text) return '';
  
  const lines = text.split('\n');
  const elements = [];
  let inList = false;
  let listItems = [];

  const flushList = (key) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${key}`} className="list-disc pl-5 mb-3 space-y-1">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  const parseInline = (str) => {
    const regex = /(\*\*.*?\*\*|`.*?`)/g;
    const splitParts = str.split(regex);

    return splitParts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-[#222222] dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-slate-800 text-rose-500 font-mono text-xs">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('####')) {
      flushList(index);
      elements.push(
        <h4 key={index} className="text-sm font-bold text-[#222222] dark:text-white mt-3 mb-1.5">
          {parseInline(trimmed.slice(4).trim())}
        </h4>
      );
    } else if (trimmed.startsWith('###')) {
      flushList(index);
      elements.push(
        <h3 key={index} className="text-base font-bold text-[#222222] dark:text-white mt-4 mb-2">
          {parseInline(trimmed.slice(3).trim())}
        </h3>
      );
    } else if (trimmed.startsWith('##')) {
      flushList(index);
      elements.push(
        <h2 key={index} className="text-lg font-bold text-[#222222] dark:text-white mt-5 mb-2.5">
          {parseInline(trimmed.slice(2).trim())}
        </h2>
      );
    } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      inList = true;
      listItems.push(
        <li key={index} className="text-sm text-[#484848] dark:text-slate-350">
          {parseInline(trimmed.slice(2))}
        </li>
      );
    } else {
      if (inList) {
        flushList(index);
        inList = false;
      }
      if (trimmed === '') {
        elements.push(<div key={index} className="h-2"></div>);
      } else {
        elements.push(
          <p key={index} className="text-sm leading-relaxed text-[#484848] dark:text-slate-350 mb-2">
            {parseInline(trimmed)}
          </p>
        );
      }
    }
  });

  flushList('final');
  return elements;
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full gap-3 ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="h-8 w-8 rounded-lg bg-[#2068a2]/10 dark:bg-sky-500/10 border border-[#2068a2]/20 dark:border-sky-500/20 flex items-center justify-center text-sm shrink-0 shadow-sm">
          🤖
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-[#2068a2] text-white rounded-tr-none'
            : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[#484848] dark:text-slate-300 rounded-tl-none'
        }`}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <div className="space-y-1">{parseMarkdown(message.content)}</div>
        )}
      </div>
      {isUser && (
        <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-slate-800 border border-gray-300 dark:border-slate-700 flex items-center justify-center text-sm shrink-0 shadow-sm select-none">
          👤
        </div>
      )}
    </div>
  );
}
