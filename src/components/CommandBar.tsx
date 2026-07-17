import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Ollama } from 'ollama/browser';

interface CommandBarProps {
  onAddWidget: (code: string) => void;
}

const CommandBar: React.FC<CommandBarProps> = ({ onAddWidget }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    try {
      // In a real app we'd load this from env or config. Electron exposes env differently.
      // Assuming Vite setup maps VITE_ variables or we use a proxy.
      // For this spec, ollama connects to the default local or remote.
      const apiKey = import.meta.env.VITE_OLLAMA_API_KEY || '';
      
      const ollama = new Ollama({ 
        host: 'https://ollama.com',
        headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {} 
      });

      const response = await ollama.chat({
        model: 'gpt-oss:120b',
        messages: [{
          role: 'user',
          content: `Generate a single HTML file containing HTML, CSS, and JS for the following request. Return ONLY the code, no markdown wrappers, no explanations. 
Request: ${prompt}`
        }],
        stream: false
      });

      let code = response.message.content;
      // Strip markdown code blocks if the model still adds them
      code = code.replace(/^```html/i, '').replace(/^```/i, '').replace(/```$/i, '').trim();
      
      onAddWidget(code);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate widget:', error);
      alert('Error connecting to Ollama Cloud. Check your console and API key.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white/5 p-2 rounded-lg border border-white/10 focus-within:border-white/30 transition-colors">
      <Sparkles size={18} className="text-blue-400" />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI to add a widget (e.g. 'add a clock')"
        className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-white/30"
        disabled={loading}
      />
      {loading && <Loader2 size={16} className="text-white/50 animate-spin" />}
    </form>
  );
};

export default CommandBar;
