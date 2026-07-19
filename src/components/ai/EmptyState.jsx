import React from 'react';

const SUGGESTIONS = [
  {
    title: 'Short Escape',
    text: 'I want a 3-day trip to Manali under ₹8000.',
    icon: '🌄'
  },
  {
    title: 'Peaceful Stay',
    text: 'Suggest a peaceful homestay near Mussoorie.',
    icon: '🏡'
  },
  {
    title: 'Family Vacation',
    text: 'Plan a family vacation for 5 people to Shimla.',
    icon: '👨‍👩‍👧‍👦'
  },
  {
    title: 'Adventure Run',
    text: 'Recommend trekking adventures in Kasol.',
    icon: '🎒'
  }
];

export default function EmptyState({ onSelectSuggestion }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-4 py-12 max-w-2xl mx-auto h-full">
      <div className="h-16 w-16 bg-[#2068a2]/10 dark:bg-sky-500/10 flex items-center justify-center rounded-2xl text-4xl mb-6 shadow-sm border border-[#2068a2]/20 dark:border-sky-500/20 animate-pulse">
        🤖
      </div>
      <h2 className="text-2xl font-bold text-[#222222] dark:text-white mb-2">
        Meet your EcoStay AI Assistant
      </h2>
      <p className="text-sm text-[#717171] dark:text-slate-400 mb-8 max-w-md">
        Ask me anything about destination suggestions, customized trip planning, budget calculations, or homestays across India!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {SUGGESTIONS.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelectSuggestion(s.text)}
            className="flex flex-col text-left p-4 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-[#2068a2] dark:hover:border-sky-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#2068a2]/50 group"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{s.icon}</span>
              <span className="font-semibold text-sm text-[#222222] dark:text-slate-200 group-hover:text-[#2068a2] dark:group-hover:text-sky-400">
                {s.title}
              </span>
            </div>
            <span className="text-xs text-[#717171] dark:text-slate-400 line-clamp-2">
              "{s.text}"
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
