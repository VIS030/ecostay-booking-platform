import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start mb-4">
      <div className="h-8 w-8 rounded-lg bg-[#2068a2]/10 dark:bg-sky-500/10 border border-[#2068a2]/20 dark:border-sky-500/20 flex items-center justify-center text-sm shrink-0 shadow-sm">
        🤖
      </div>
      <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm flex items-center gap-1.5">
        <div 
          className="h-2 w-2 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce" 
          style={{ animationDelay: '0ms', animationDuration: '1s' }}
        ></div>
        <div 
          className="h-2 w-2 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce" 
          style={{ animationDelay: '150ms', animationDuration: '1s' }}
        ></div>
        <div 
          className="h-2 w-2 bg-gray-400 dark:bg-slate-500 rounded-full animate-bounce" 
          style={{ animationDelay: '300ms', animationDuration: '1s' }}
        ></div>
      </div>
    </div>
  );
}
