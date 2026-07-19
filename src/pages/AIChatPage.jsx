import React, { useState, useEffect, useRef } from 'react';
import { aiService } from '../services/aiService';
import MessageBubble from '../components/ai/MessageBubble';
import TypingIndicator from '../components/ai/TypingIndicator';
import EmptyState from '../components/ai/EmptyState';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

export default function AIChatPage() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem('ecostay-ai-history') || '[]');
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => {
    sessionStorage.setItem('ecostay-ai-history', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend) => {
    const promptText = textToSend || input.trim();
    if (!promptText || sending) return;

    if (!textToSend) {
      setInput('');
    }

    const userMessage = { role: 'user', content: promptText };
    setMessages((prev) => [...prev, userMessage]);
    setSending(true);

    try {
      const res = await aiService.askTravelAssistant(promptText, messages);
      if (res.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: res.response }]);
      } else {
        throw new Error(res.detail || 'Failed to fetch AI response');
      }
    } catch (err) {
      console.error(err);
      showToast({ 
        message: err.message || 'Connection lost. Please make sure your server is online.', 
        type: 'error' 
      });
      setMessages((prev) => [
        ...prev, 
        { 
          role: 'assistant', 
          content: '⚠️ **System Error**: I failed to communicate with the AI model. Please verify that the backend is running and that your `GROQ_API_KEY` is configured in your `.env`.' 
        }
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    sessionStorage.removeItem('ecostay-ai-history');
    showToast({ message: 'Conversation history cleared.', type: 'info' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-[calc(100vh-73px)] py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 h-[calc(100vh-140px)] flex flex-col">
        {/* Header Control Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🤖</span>
            <div>
              <h1 className="font-bold text-base text-[#222222] dark:text-white">
                EcoStay AI Assistant
              </h1>
              <p className="text-xs text-[#717171] dark:text-slate-400">
                AI Travel Planner & Sustainable Homestay Suggestions
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClear}
              className="text-xs border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-950 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              Clear Chat
            </Button>
          )}
        </div>

        {/* Chat Canvas Section */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 overflow-y-auto shadow-sm mb-4">
          {messages.length === 0 ? (
            <EmptyState onSelectSuggestion={handleSend} />
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <MessageBubble key={index} message={msg} />
              ))}
              {sending && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar Form */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
          className="flex gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 rounded-2xl shadow-md shrink-0"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={sending}
            placeholder="Ask me anything... (e.g. suggest a cottage in Shimla)"
            className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-[#222222] dark:text-white placeholder-[#717171] focus:outline-none focus:ring-1 focus:ring-[#2068a2] dark:focus:ring-sky-500 focus:bg-white transition"
          />
          <Button 
            type="submit" 
            disabled={sending || !input.trim()}
            className="px-5 font-semibold text-sm h-[42px] flex items-center justify-center shrink-0 rounded-xl"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}
