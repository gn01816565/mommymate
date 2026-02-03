import React from 'react';
import { PREGNANCY_DATA } from '../constants';
import { WeekData } from '../types';

interface TimelineProps {
  selectedWeek: number;
  onSelectWeek: (week: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({ selectedWeek, onSelectWeek }) => {
  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-6 bg-pink-500 text-white">
        <h2 className="text-2xl font-bold">孕期旅程</h2>
        <p className="text-pink-100 text-sm mt-1">點擊週數查看詳情</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {PREGNANCY_DATA.map((data: WeekData, index) => {
          const isSelected = selectedWeek === data.week;
          const isLast = index === PREGNANCY_DATA.length - 1;

          return (
            <div key={data.week} className="relative pl-8 group cursor-pointer" onClick={() => onSelectWeek(data.week)}>
              {/* Vertical Line */}
              {!isLast && (
                <div className="absolute left-[11px] top-8 bottom-0 w-0.5 bg-gray-200 group-hover:bg-pink-200 transition-colors h-full -mb-4 z-0"></div>
              )}
              
              {/* Dot */}
              <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 z-10 transition-all duration-300 ${
                isSelected 
                  ? 'bg-pink-500 border-pink-200 scale-110' 
                  : 'bg-white border-gray-300 group-hover:border-pink-300'
              }`}></div>

              <div className={`p-4 rounded-lg border transition-all duration-200 ${
                isSelected 
                  ? 'bg-pink-50 border-pink-200 shadow-md transform translate-x-1' 
                  : 'bg-white border-gray-100 hover:bg-gray-50'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-sm font-bold ${isSelected ? 'text-pink-600' : 'text-gray-500'}`}>
                    第 {data.week} 週
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {data.period.split(' ')[0]}
                  </span>
                </div>
                <h3 className={`text-lg font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {data.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {data.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
