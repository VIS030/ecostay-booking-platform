import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SUGGESTIONS = [
  'Find eco beach stays in Bali under $100',
  'Best mountain cabins for 4 guests',
  'Rainforest lodges in Costa Rica',
  'Pet-friendly farm stays in Europe',
];

const WELCOME = {
  role: 'assistant',
  text: "Hi! I'm your EcoStay travel assistant. Tell me what kind of trip you're planning — destination, budget, dates — and I'll help you find the perfect eco-friendly stay. (AI integration coming soon)",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([WELCOME]);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: text.trim() },
      {
        role: 'assistant',
        text: "Thanks! Once AI is connected, I'll search our listings and recommend the best eco-stays for you. For now, browse all stays on our listings page.",
        action: { label: 'View all stays', path: '/listings' },
      },
    ]);
    setInput('');
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-2xl border border-[#dddddd] bg-white shadow-2xl sm:right-6">
          <div className="flex items-center justify-between bg-[#2068a2] px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold">EcoStay Assistant</p>
                <p className="text-xs text-white/80">Find your perfect stay</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 hover:bg-white/20"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex max-h-[340px] min-h-[280px] flex-1 flex-col overflow-y-auto bg-[#f7f7f7] p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-[#2068a2] text-white'
                      : 'rounded-bl-md border border-[#dddddd] bg-white text-[#222222]'
                  }`}
                >
                  {msg.text}
                  {msg.action && (
                    <button
                      onClick={() => navigate(msg.action.path)}
                      className="mt-2 block text-left text-sm font-semibold text-[#2068a2] underline"
                    >
                      {msg.action.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-[#dddddd] bg-white p-3">
            <div className="mb-2 flex gap-2 overflow-x-auto scrollbar-hide">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="shrink-0 rounded-full border border-[#dddddd] bg-white px-3 py-1.5 text-xs text-[#717171] hover:border-[#2068a2] hover:text-[#2068a2]"
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
                placeholder="Ask about destinations, budget, dates..."
                className="flex-1 rounded-full border border-[#dddddd] px-4 py-2.5 text-sm focus:border-[#2068a2] focus:outline-none focus:ring-1 focus:ring-[#2068a2]"
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2068a2] text-white hover:bg-[#174d78]"
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
        className={`fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full shadow-lg transition-all sm:right-6 ${
          open
            ? 'bg-[#222222] px-4 py-3 text-white'
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
