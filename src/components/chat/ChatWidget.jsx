import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiService } from '../../services/aiService';

const SUGGESTIONS = [
  'Suggest a peaceful homestay in Shimla',
  'Plan a 3-day trip to Manali under ₹8000',
  'Best homestays for families in Mussoorie',
  'Weekend getaway near Rishikesh',
];

const WELCOME = {
  role: 'assistant',
  text: "Hi! I'm your EcoStay AI travel assistant powered by Groq. Tell me what kind of trip you're planning — destination, budget, dates — and I'll help you find the perfect eco-friendly stay across India!",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([WELCOME]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setLoading(true);

    try {
      // Build history from past messages (excluding the static welcome message)
      const history = messages
        .filter((m) => m !== WELCOME)
        .map((m) => ({ role: m.role, content: m.text }));

      const res = await aiService.askTravelAssistant(trimmed, history);

      if (res.success) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: res.response },
        ]);
      } else {
        throw new Error(res.detail || 'Failed to get AI response');
      }
    } catch (err) {
      console.error('ChatWidget AI error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '⚠️ Sorry, I couldn\'t reach the AI service right now. Please make sure the backend server is running.',
          action: { label: 'Browse stays instead', path: '/listings' },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-[#2068a2] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold">EcoStay Assistant</p>
                <p className="text-xs text-white/80">AI-powered travel planner</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/20 cursor-pointer"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex max-h-[340px] min-h-[280px] flex-1 flex-col overflow-y-auto bg-[#f7f7f7] dark:bg-slate-950 p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-[#2068a2] text-white'
                      : 'rounded-bl-md border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-800 text-[#222222] dark:text-slate-100'
                  }`}
                >
                  <span className="whitespace-pre-wrap">{msg.text}</span>
                  {msg.action && (
                    <button
                      onClick={() => navigate(msg.action.path)}
                      className="mt-2 block text-left text-sm font-semibold text-[#2068a2] dark:text-blue-400 underline cursor-pointer"
                    >
                      {msg.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-3 flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-800 px-4 py-3 flex items-center gap-1.5">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms', animationDuration: '1s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms', animationDuration: '1s' }}></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#dddddd] dark:border-slate-800 bg-white dark:bg-slate-900 p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  disabled={loading}
                  className="shrink-0 rounded-full border border-[#dddddd] dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-xs text-[#717171] dark:text-slate-300 hover:border-[#2068a2] dark:hover:border-blue-400 hover:text-[#2068a2] dark:hover:text-blue-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Ask about destinations, budget, dates..."
                className="flex-1 rounded-full border border-[#dddddd] dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-[#222222] dark:text-white placeholder:text-[#717171] dark:placeholder:text-slate-500 focus:border-[#2068a2] dark:focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-[#2068a2] dark:focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2068a2] text-white hover:bg-[#174d78] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full shadow-lg transition-all sm:right-6 cursor-pointer ${
          open
            ? 'bg-[#222222] dark:bg-slate-800 px-4 py-3 text-white'
            : 'bg-[#16A34A] px-5 py-3.5 text-white hover:bg-[#14532D] hover:shadow-xl'
        }`}
        aria-label={open ? 'Close assistant' : 'Open travel assistant'}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-semibold">Ask AI</span>
          </>
        )}
      </button>
    </>
  );
}
