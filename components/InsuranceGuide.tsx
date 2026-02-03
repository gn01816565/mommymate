import React, { useState } from 'react';

interface InsuranceGuideProps {
  onClose: () => void;
}

const InsuranceGuide: React.FC<InsuranceGuideProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'calculator' | 'checklist' | 'glossary'>('overview');
  
  // 保費試算狀態
  const [age, setAge] = useState<number>(30);
  const [maternityInsurance, setMaternityInsurance] = useState<boolean>(true);
  const [medicalInsurance, setMedicalInsurance] = useState<boolean>(true);
  const [hospitalInsurance, setHospitalInsurance] = useState<boolean>(true);
  const [cancerInsurance, setCancerInsurance] = useState<boolean>(false);
  const [disabilityInsurance, setDisabilityInsurance] = useState<boolean>(false);
  const [lifeInsurance, setLifeInsurance] = useState<boolean>(false);

  // 檢查清單狀態
  const [checklist, setChecklist] = useState({
    pregnant: false,
    hasExisting: false,
    readTerms: false,
    compareQuotes: false,
    checkWaiting: false,
    understandCoverage: false
  });

  // 計算保費
  const calculatePremium = () => {
    let total = 0;
    
    if (maternityInsurance) total += 3500; // 婦嬰險
    if (medicalInsurance) total += 7500; // 實支實付
    if (hospitalInsurance) total += 4000; // 住院日額
    if (cancerInsurance) total += 12000; // 癌症險
    if (disabilityInsurance) total += 8000; // 失能險
    if (lifeInsurance) total += 6000; // 壽險

    // 年齡調整
    if (age > 35) total *= 1.2;
    else if (age > 40) total *= 1.5;

    return Math.round(total);
  };

  const toggleChecklistItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <span className="mr-2">🛡️</span> 孕期保險規劃指南
              </h2>
              <p className="text-blue-100 text-sm mt-1">完整的保險知識與規劃工具</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
            }`}
          >
            📋 總覽
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'calculator'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
            }`}
          >
            💰 試算
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'checklist'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
            }`}
          >
            ✅ 清單
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'glossary'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-800'
                : 'text-gray-500 dark:text-gray-400 hover:text-blue-400'
            }`}
          >
            📖 名詞
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB: 總覽 */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* 重要提醒 */}
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">⚠️ 最重要的事</h3>
                <p className="text-red-700 dark:text-red-300 text-sm">
                  <strong>婦嬰險必須在懷孕前投保！</strong>懷孕後無法加保，通常有 30-90 天等待期。<br/>
                  建議至少提前 3 個月規劃。
                </p>
              </div>

              {/* 保險優先順序 */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📊 投保優先順序</h3>
                <div className="space-y-3">
                  
                  {/* 婦嬰險 */}
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-pink-900 dark:text-pink-300">💊 婦嬰險（孕婦險）</h4>
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-sm text-pink-800 dark:text-pink-300 mb-2">
                      <strong>最重要！</strong>保障妊娠併發症、產前產後併發症、胎兒先天性疾病、剖腹產手術
                    </p>
                    <div className="text-xs text-pink-700 dark:text-pink-400">
                      年繳：2,000-5,000 元 | 保障：30-50 萬
                    </div>
                  </div>

                  {/* 實支實付 */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-blue-900 dark:text-blue-300">🏥 實支實付醫療險</h4>
                      <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-sm text-blue-800 dark:text-blue-300 mb-2">
                      應付高額醫療費用，病房費差額、手術、雜費、自費耗材
                    </p>
                    <div className="text-xs text-blue-700 dark:text-blue-400">
                      年繳：5,000-10,000 元 | 保障：10-20 萬/次
                    </div>
                  </div>

                  {/* 住院日額 */}
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-purple-900 dark:text-purple-300">💰 住院日額險</h4>
                      <span className="text-yellow-500">⭐⭐⭐⭐</span>
                    </div>
                    <p className="text-sm text-purple-800 dark:text-purple-300 mb-2">
                      基本住院保障，每日定額給付
                    </p>
                    <div className="text-xs text-purple-700 dark:text-purple-400">
                      年繳：3,000-5,000 元 | 保障：2,000-3,000 元/天
                    </div>
                  </div>

                  {/* 癌症險 */}
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-orange-900 dark:text-orange-300">🎗️ 癌症險 / 重大疾病險</h4>
                      <span className="text-yellow-500">⭐⭐⭐</span>
                    </div>
                    <p className="text-sm text-orange-800 dark:text-orange-300 mb-2">
                      孕期發現癌症風險提高，需長期治療保障
                    </p>
                    <div className="text-xs text-orange-700 dark:text-orange-400">
                      年繳：8,000-15,000 元 | 保障：100-200 萬
                    </div>
                  </div>

                </div>
              </div>

              {/* 台灣政府補助 */}
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="font-bold text-green-900 dark:text-green-300 mb-3">🏛️ 台灣政府補助（免費）</h3>
                <ul className="space-y-2 text-sm text-green-800 dark:text-green-300">
                  <li className="flex items-center"><span className="mr-2">✅</span> 產檢補助：14 次免費產檢</li>
                  <li className="flex items-center"><span className="mr-2">✅</span> 生育補助：各縣市 2-5 萬（一次性）</li>
                  <li className="flex items-center"><span className="mr-2">✅</span> 育嬰留職停薪津貼：6 個月投保薪資 80%</li>
                  <li className="flex items-center"><span className="mr-2">✅</span> 托育補助：最高每月 13,000 元</li>
                </ul>
              </div>

            </div>
          )}

          {/* TAB: 保費試算 */}
          {activeTab === 'calculator' && (
            <div className="space-y-6">
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  💡 此為估算參考，實際費率依保險公司、年齡、健康狀況而定
                </p>
              </div>

              {/* 年齡輸入 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  您的年齡
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  min="18"
                  max="50"
                />
              </div>

              {/* 保險選擇 */}
              <div className="space-y-3">
                <h3 className="font-bold text-gray-900 dark:text-white">選擇保險項目</h3>
                
                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={maternityInsurance}
                      onChange={(e) => setMaternityInsurance(e.target.checked)}
                      className="w-5 h-5 text-pink-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">婦嬰險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 3,500 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={medicalInsurance}
                      onChange={(e) => setMedicalInsurance(e.target.checked)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">實支實付醫療險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 7,500 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={hospitalInsurance}
                      onChange={(e) => setHospitalInsurance(e.target.checked)}
                      className="w-5 h-5 text-purple-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">住院日額險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 4,000 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐⭐</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={cancerInsurance}
                      onChange={(e) => setCancerInsurance(e.target.checked)}
                      className="w-5 h-5 text-orange-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">癌症險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 12,000 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={disabilityInsurance}
                      onChange={(e) => setDisabilityInsurance(e.target.checked)}
                      className="w-5 h-5 text-indigo-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">失能險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 8,000 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐</span>
                </label>

                <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={lifeInsurance}
                      onChange={(e) => setLifeInsurance(e.target.checked)}
                      className="w-5 h-5 text-gray-600"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">壽險</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">年繳約 6,000 元</div>
                    </div>
                  </div>
                  <span className="text-yellow-500">⭐⭐⭐</span>
                </label>
              </div>

              {/* 試算結果 */}
              <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 rounded-xl text-white">
                <div className="text-center">
                  <div className="text-sm opacity-90 mb-2">預估年繳保費</div>
                  <div className="text-4xl font-bold mb-1">
                    ${calculatePremium().toLocaleString()}
                  </div>
                  <div className="text-sm opacity-75">每月約 ${Math.round(calculatePremium() / 12).toLocaleString()} 元</div>
                </div>
                {age > 35 && (
                  <div className="mt-4 text-sm text-center opacity-90">
                    ⚠️ 35 歲以上保費較高，建議及早規劃
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * 此為參考估算，實際費率請洽保險公司
              </div>

            </div>
          )}

          {/* TAB: 投保前檢查清單 */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">投保前必做檢查 ✅</h3>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.pregnant}
                  onChange={() => toggleChecklistItem('pregnant')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">確認是否已懷孕</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ⚠️ 懷孕後無法投保婦嬰險！若未懷孕，建議盡快投保
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.hasExisting}
                  onChange={() => toggleChecklistItem('hasExisting')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">檢視現有保單</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    檢查現有保單是否涵蓋孕期保障，避免重複投保
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.compareQuotes}
                  onChange={() => toggleChecklistItem('compareQuotes')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">比較多家保險公司</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    至少比較 3 家以上，注意理賠評價與財務健全度
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.readTerms}
                  onChange={() => toggleChecklistItem('readTerms')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">仔細閱讀保單條款</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    特別注意：妊娠併發症定義、除外責任、理賠條件
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.checkWaiting}
                  onChange={() => toggleChecklistItem('checkWaiting')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">了解等待期規定</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    婦嬰險通常有 30-90 天等待期，需提前規劃
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600">
                <input
                  type="checkbox"
                  checked={checklist.understandCoverage}
                  onChange={() => toggleChecklistItem('understandCoverage')}
                  className="mt-1 w-5 h-5 text-green-600"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">確認保障範圍</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    確認是否涵蓋：自然產、剖腹產、產前產後併發症、胎兒保障
                  </div>
                </div>
              </label>

              {/* 完成度 */}
              <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-300">完成度</span>
                  <span className="text-sm font-bold text-purple-900 dark:text-purple-300">
                    {Object.values(checklist).filter(Boolean).length} / {Object.keys(checklist).length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${(Object.values(checklist).filter(Boolean).length / Object.keys(checklist).length) * 100}%` }}
                  ></div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: 保險名詞解釋 */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">📖 保險名詞解釋</h3>

              <div className="space-y-3">
                
                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">婦嬰險（孕婦險）</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    專為懷孕婦女設計的保險，保障妊娠期間的併發症、胎兒先天性疾病、剖腹產手術等。
                    <strong className="text-red-600 dark:text-red-400"> 必須在懷孕前投保</strong>，懷孕後無法加保。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">實支實付醫療險</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    依實際醫療支出理賠的保險。涵蓋病房費差額、手術費、自費藥品耗材等。
                    與「日額給付」不同，是以收據金額為理賠基礎。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">妊娠併發症</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    懷孕期間可能發生的疾病，如：妊娠糖尿病、子癲前症、胎盤早期剝離、前置胎盤等。
                    婦嬰險通常會保障這些併發症的醫療費用。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">等待期</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    保單生效後到可以理賠之間的期間。婦嬰險通常有 30-90 天等待期，
                    意即投保後需等待一段時間才能申請理賠。目的是避免「帶病投保」。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">除外責任</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    保險公司不理賠的項目。例如：懷孕相關的例行產檢、正常分娩（非併發症）、
                    自願性流產等通常不在保障範圍內。投保前務必詳讀。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">失能險（殘扶險）</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    當因疾病或意外導致失能（殘廢）時，按失能等級給付保險金。
                    孕期併發症可能導致失能，此險可提供長期照護保障與收入補償。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">理賠比例</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    實支實付險可能不是 100% 理賠。例如「8成理賠」表示保險公司只賠 80%，
                    剩下 20% 自付。投保時要注意理賠比例與上限額度。
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">誠實告知義務</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    投保時必須據實告知健康狀況、懷孕狀態、既往病史等。
                    <strong className="text-red-600 dark:text-red-400"> 隱瞞或不實告知可能導致拒賠</strong>，
                    甚至保單無效。
                  </p>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            ⚠️ 以上資訊僅供參考，實際保障與費率請洽專業保險顧問或各保險公司
          </p>
        </div>

      </div>
    </div>
  );
};

export default InsuranceGuide;
