
import React from 'react';

interface BudgetGuideProps {
  onClose: () => void;
}

const BudgetGuide: React.FC<BudgetGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center">
            <span className="text-3xl mr-3">💰</span>
            <div>
              <h2 className="text-2xl font-bold">孕期醫療與保健預算指南</h2>
              <p className="text-emerald-100 text-sm mt-1">2025 台灣健保標準與自費行情估算</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Section 1: Budget Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1 */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🐢</span>
                <span className="text-xs font-bold bg-gray-200 text-gray-600 px-2 py-1 rounded">超精簡型</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">2k - 4k</h3>
              <p className="text-xs text-gray-500 mb-3">整孕期總費用</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ 14次公費產檢</li>
                <li>✅ 健保掛號費</li>
                <li className="text-gray-400">❌ 無額外自費檢查</li>
              </ul>
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">平均每週: <span className="font-bold text-gray-700">$50-100</span></p>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 ring-2 ring-emerald-100 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🐇</span>
                <span className="text-xs font-bold bg-emerald-200 text-emerald-700 px-2 py-1 rounded">標準安全型</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-1">20k - 35k</h3>
              <p className="text-xs text-emerald-600 mb-3">整孕期總費用 (推薦)</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ 公費產檢 + 掛號</li>
                <li>✅ <span className="font-bold text-emerald-700">NIPT</span> (1.2-2.5萬)</li>
                <li>✅ <span className="font-bold text-emerald-700">高層次超音波</span></li>
              </ul>
              <div className="mt-4 pt-3 border-t border-emerald-100">
                <p className="text-xs text-emerald-700">平均每週: <span className="font-bold">$500-900</span></p>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">🦅</span>
                <span className="text-xs font-bold bg-blue-200 text-blue-700 px-2 py-1 rounded">進階檢查型</span>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-1">35k - 60k</h3>
              <p className="text-xs text-blue-500 mb-3">整孕期總費用</p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✅ 標準型項目全部</li>
                <li>✅ <span className="font-bold text-blue-700">羊水晶片</span> (1.5-3萬)</li>
                <li>✅ 額外4D照相/全套血檢</li>
              </ul>
              <div className="mt-4 pt-3 border-t border-blue-100">
                <p className="text-xs text-blue-600">平均每週: <span className="font-bold">$900-1,500</span></p>
              </div>
            </div>
          </div>

          {/* Section 2: Cost Table */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
               <span className="bg-emerald-100 text-emerald-600 p-1 rounded mr-2">📊</span>
               自費項目行情表 (2025)
            </h3>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm text-left text-gray-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-bold">檢查項目</th>
                    <th className="px-4 py-3 font-bold">價格區間 (NTD)</th>
                    <th className="px-4 py-3 font-bold">建議週數/說明</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">NIPT 非侵入性染色體</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">12,000 - 25,000</td>
                    <td className="px-4 py-3">10週後，準確率高，依檢測項目多寡計價</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">高層次超音波</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">3,000 - 8,000</td>
                    <td className="px-4 py-3">20-24週，結構檢查關鍵</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">羊膜穿刺 (自費)</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">8,000 - 15,000</td>
                    <td className="px-4 py-3">16-20週，34歲以上政府補助5000</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">羊水晶片</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">15,000 - 30,000</td>
                    <td className="px-4 py-3">配合羊穿做，檢測微小缺失罕病</td>
                  </tr>
                   <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">自費 4D 超音波</td>
                    <td className="px-4 py-3 font-mono text-emerald-600">1,000 - 3,000</td>
                    <td className="px-4 py-3">紀念性質，非診斷必要</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Cash Flow & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Monthly Supplements */}
             <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
                    💊 每月保健品預算估算
                </h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm border-b border-yellow-200 pb-1">
                        <span>孕婦綜合維他命</span>
                        <span className="font-mono">~$800</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-yellow-200 pb-1">
                        <span>DHA 魚油/藻油</span>
                        <span className="font-mono">~$800</span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-yellow-200 pb-1">
                        <span>鈣片 (若飲食不足)</span>
                        <span className="font-mono">~$500</span>
                    </div>
                    <div className="flex justify-between font-bold text-yellow-900 pt-2">
                        <span>每月合計</span>
                        <span>約 $2,000</span>
                    </div>
                </div>
                <p className="text-xs text-yellow-700 mt-3">
                    *整孕期9個月保健品總計約 $18,000
                </p>
             </div>

             {/* Payment Peaks */}
             <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                <h3 className="font-bold text-red-800 mb-3 flex items-center">
                    🗓️ 資金準備關鍵期 (付款高峰)
                </h3>
                <ul className="relative border-l-2 border-red-200 pl-4 space-y-4">
                    <li className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
                        <span className="text-xs font-bold text-red-500 block">第 10-12 週</span>
                        <span className="text-sm font-bold text-gray-800">NIPT 檢測</span>
                        <span className="text-xs text-gray-500 block ml-1">準備 $12,000 - $25,000</span>
                    </li>
                    <li className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
                        <span className="text-xs font-bold text-red-500 block">第 16-20 週</span>
                        <span className="text-sm font-bold text-gray-800">羊膜穿刺/晶片 (若做)</span>
                        <span className="text-xs text-gray-500 block ml-1">準備 $8,000 - $30,000</span>
                    </li>
                    <li className="relative">
                        <div className="absolute -left-[21px] top-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white"></div>
                        <span className="text-xs font-bold text-red-500 block">第 20-24 週</span>
                        <span className="text-sm font-bold text-gray-800">高層次超音波</span>
                        <span className="text-xs text-gray-500 block ml-1">準備 $3,000 - $8,000</span>
                    </li>
                </ul>
             </div>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-800 flex items-start">
             <span className="text-xl mr-2">💡</span>
             <div>
                 <span className="font-bold">實務建議：</span>
                 建議在懷孕初期先存好 2-3 萬元現金作為應急與檢查基金。一般產檢僅需數百元掛號費，大筆支出集中在上述三個時期，可提前規劃以免壓力過大。
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BudgetGuide;
