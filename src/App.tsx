import { useState } from 'react';
import Editor from './components/Editor';
import CommandBar from './components/CommandBar';
import Sandbox from './components/Sandbox';
import { GripHorizontal } from 'lucide-react';

function App() {
  const [widgets, setWidgets] = useState<{ id: string, code: string }[]>([]);

  const handleAddWidget = (code: string) => {
    setWidgets(prev => [...prev, { id: Date.now().toString(), code }]);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-surface rounded-xl overflow-hidden backdrop-blur-md shadow-2xl border border-white/10 text-white font-sans">
      {/* Drag Handle */}
      <div className="drag-region flex items-center justify-center h-6 bg-white/5 hover:bg-white/10 transition-colors cursor-move">
        <GripHorizontal size={16} className="text-white/30" />
      </div>

      <div className="flex-1 overflow-auto p-6 no-drag-region flex flex-col gap-4">
        <Editor />
        
        {widgets.map(widget => (
          <Sandbox key={widget.id} code={widget.code} />
        ))}
      </div>

      <div className="p-4 bg-black/40 border-t border-white/10 no-drag-region">
        <CommandBar onAddWidget={handleAddWidget} />
      </div>
    </div>
  );
}

export default App;
