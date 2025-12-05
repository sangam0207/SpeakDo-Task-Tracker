import { Plus, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateTask: () => void;
  onVoiceInput: () => void;
}

export default function Header({ onCreateTask, onVoiceInput }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          {/* Logo Section */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              SpeakDo
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Voice-enabled task management
            </p>
          </div>

          {/* Buttons Section */}
          <div className="w-full sm:w-auto flex gap-2 sm:gap-2">
            <Button
              onClick={onVoiceInput}
              className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all h-10 px-3 sm:px-4"
            >
              <Mic className="h-4 w-4 mr-1.5 sm:mr-2" />
              <span className="text-sm sm:text-base">Voice</span>
            </Button>
            <Button
              onClick={onCreateTask}
              className="flex-1 sm:flex-none bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all h-10 px-3 sm:px-4"
            >
              <Plus className="h-4 w-4 mr-1.5 sm:mr-2" />
              <span className="text-sm sm:text-base">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}