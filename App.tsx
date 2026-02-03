import React, { useState } from 'react';
import Timeline from './components/Timeline';
import DetailView from './components/DetailView';
import ChatWidget from './components/ChatWidget';
import { PREGNANCY_DATA } from './constants';
import { WeekData } from './types';
import { useDarkMode } from './hooks/useDarkMode';

const App: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(PREGNANCY_DATA[0].week);
  const { isDark, toggleDarkMode } = useDarkMode();
  
  const currentData = PREGNANCY_DATA.find(d => d.week === selectedWeek) || PREGNANCY_DATA[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-pink-100 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🤰</span>
              <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                MommyMate
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                  陪伴您與寶寶的每一天
              </div>
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                title={isDark ? '切換到淺色模式' : '切換到深色模式'}
              >
                {isDark ? (
                  <span className="text-xl">☀️</span>
                ) : (
                  <span className="text-xl">🌙</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-6rem)]">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-4 h-full hidden lg:block">
            <Timeline selectedWeek={selectedWeek} onSelectWeek={setSelectedWeek} />
          </div>

          {/* Mobile Selector (Visible only on small screens) */}
          <div className="lg:hidden mb-4">
             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">選擇懷孕週數</label>
             <select 
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(Number(e.target.value))}
                className="block w-full rounded-lg border-gray-300 dark:border-gray-600 shadow-sm focus:border-pink-500 focus:ring-pink-500 py-3 px-4 bg-white dark:bg-gray-700 dark:text-white"
             >
                 {PREGNANCY_DATA.map((d) => (
                     <option key={d.week} value={d.week}>
                         第 {d.week} 週 - {d.title}
                     </option>
                 ))}
             </select>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-8 h-full">
            <DetailView data={currentData} />
          </div>
        </div>
      </main>

      {/* Floating Chat Widget */}
      <ChatWidget currentWeek={selectedWeek} />
    </div>
  );
};

export default App;
