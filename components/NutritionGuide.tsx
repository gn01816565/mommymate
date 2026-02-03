
import React from 'react';

interface NutritionGuideProps {
  onClose: () => void;
}

const NutritionGuide: React.FC<NutritionGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center">
            <span className="text-3xl mr-3">🥗</span>
            <div>
              <h2 className="text-2xl font-bold">孕期全方位營養指南</h2>
              <p className="text-yellow-100 text-sm mt-1">根據衛福部與最新醫學建議整理</p>
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
          
          {/* Section 1: Daily Kit Strategy */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
              <span className="bg-yellow-200 text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">★</span>
              每日標準配備 (懶人包)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">1. 固定保健品</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">●</span><span><b>綜合維他命：</b>含碘 (150mcg)、維生素D (400-600IU)</span></li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">●</span><span><b>葉酸：</b>至少 400 微克 (總量建議 600 微克)</span></li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">●</span><span><b>鐵質：</b>15-30mg (若醫師開立鐵劑請遵醫囑)</span></li>
                  <li className="flex items-start"><span className="text-yellow-500 mr-2">●</span><span><b>DHA：</b>若綜維沒有，建議另補 200-300mg/天</span></li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-100 pb-2">2. 規律飲食框架</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start"><span className="text-green-500 mr-2">●</span><span><b>乳品 2 份：</b>牛奶/優格 (或鈣片補足 1000mg)</span></li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">●</span><span><b>蛋白質：</b>每餐都要有 (肉/魚/蛋/豆)，全天約 70-80g</span></li>
                  <li className="flex items-start"><span className="text-green-500 mr-2">●</span><span><b>蔬果：</b>蔬菜 2-3 份 + 水果 2 份 (補充纖維與維C)</span></li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-yellow-700 mt-4 text-center">
              💡 建議向產檢醫師索取血液報告 (血紅素、鐵、維生素D)，依數值微調更精準！
            </p>
          </div>

          {/* Section 2: Detailed Table */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-orange-400 pl-3">每日營養素建議量詳表</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-600 border border-gray-200 rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 font-bold">營養素</th>
                    <th className="px-4 py-3 font-bold w-1/4">每日建議量</th>
                    <th className="px-4 py-3 font-bold">主要用途</th>
                    <th className="px-4 py-3 font-bold">常見來源</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">葉酸 (Folic Acid)</td>
                    <td className="px-4 py-3">600 微克 <span className="text-xs text-gray-500 block">(保健品至少400)</span></td>
                    <td className="px-4 py-3">預防神經管缺陷、造血</td>
                    <td className="px-4 py-3">深綠色蔬菜、豆類、綜維</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">鐵 (Iron)</td>
                    <td className="px-4 py-3">27 毫克</td>
                    <td className="px-4 py-3">製造紅血球、預防貧血</td>
                    <td className="px-4 py-3">紅肉、肝臟、深色蔬菜</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">鈣 (Calcium)</td>
                    <td className="px-4 py-3">1,000 毫克</td>
                    <td className="px-4 py-3">骨骼牙齒發育、預防抽筋</td>
                    <td className="px-4 py-3">牛奶、優格、芝麻、鈣片</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">維生素 D</td>
                    <td className="px-4 py-3">600 IU (15微克)</td>
                    <td className="px-4 py-3">助鈣吸收、免疫調節</td>
                    <td className="px-4 py-3">日照、魚類、蛋</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">碘 (Iodine)</td>
                    <td className="px-4 py-3">220-250 微克</td>
                    <td className="px-4 py-3">胎兒腦部發育、甲狀腺</td>
                    <td className="px-4 py-3">海帶、碘鹽、海魚</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">DHA (Omega-3)</td>
                    <td className="px-4 py-3">200-300 毫克</td>
                    <td className="px-4 py-3">腦部與視力發育</td>
                    <td className="px-4 py-3">小型魚類、魚油、藻油</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">蛋白質</td>
                    <td className="px-4 py-3">70-80 公克 <span className="text-xs text-gray-500 block">(比孕前+10~25g)</span></td>
                    <td className="px-4 py-3">胎兒組織、羊水生長</td>
                    <td className="px-4 py-3">肉、魚、蛋、奶、豆漿</td>
                  </tr>
                   <tr className="bg-white hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">鎂 (Magnesium)</td>
                    <td className="px-4 py-3">350-360 毫克</td>
                    <td className="px-4 py-3">肌肉放鬆、降子癲風險</td>
                    <td className="px-4 py-3">堅果、深綠蔬菜、全穀</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Phase Specifics */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-pink-400 pl-3">各孕期重點策略</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Early */}
              <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🌱</span>
                  <h4 className="font-bold text-pink-800">孕早期 (0-12週)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <b>核心：</b>葉酸 600mcg (補充劑至少400)</li>
                  <li>• <b>緩解：</b>少量多餐、高蛋白點心防孕吐</li>
                  <li>• <b>飲食：</b>避免生食、酒精、過量咖啡因</li>
                </ul>
              </div>

              {/* Mid */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">🐟</span>
                  <h4 className="font-bold text-blue-800">孕中期 (13-27週)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <b>核心：</b>鐵需求增 (27mg)、鈣 (1000mg)</li>
                  <li>• <b>腦部：</b>DHA 每日 200-300mg</li>
                  <li>• <b>注意：</b>鐵劑與鈣片需分開 2 小時吃</li>
                </ul>
              </div>

              {/* Late */}
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                <div className="flex items-center mb-3">
                  <span className="text-2xl mr-2">⚖️</span>
                  <h4 className="font-bold text-purple-800">孕晚期 (28週+)</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• <b>核心：</b>持續補鐵、鈣、維D</li>
                  <li>• <b>順暢：</b>鎂 (350mg) + 纖維 + 水份防便秘</li>
                  <li>• <b>體重：</b>減少精緻澱粉，控制血糖</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NutritionGuide;
