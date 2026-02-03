
import React, { useState } from 'react';

interface SubsidiesGuideProps {
  onClose: () => void;
}

const SubsidiesGuide: React.FC<SubsidiesGuideProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'medical' | 'cash' | 'timeline'>('medical');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center">
            <span className="text-3xl mr-3">🏛️</span>
            <div>
              <h2 className="text-2xl font-bold">2025 孕期補助與資源大全</h2>
              <p className="text-cyan-100 text-sm mt-1">中央健保、勞保生育給付與臺南市加碼補助</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-100 bg-gray-50 shrink-0">
            <button 
                onClick={() => setActiveTab('medical')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'medical' ? 'text-cyan-600 bg-white border-t-2 border-cyan-500' : 'text-gray-500 hover:text-cyan-400'}`}
            >
                醫療與產檢補助
            </button>
            <button 
                onClick={() => setActiveTab('cash')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'cash' ? 'text-cyan-600 bg-white border-t-2 border-cyan-500' : 'text-gray-500 hover:text-cyan-400'}`}
            >
                生育給付與獎勵金
            </button>
            <button 
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'timeline' ? 'text-cyan-600 bg-white border-t-2 border-cyan-500' : 'text-gray-500 hover:text-cyan-400'}`}
            >
                申請時程懶人包
            </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 bg-white flex-1">
          
          {/* TAB: MEDICAL */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
                <div className="bg-cyan-50 p-5 rounded-xl border border-cyan-100">
                    <h3 className="font-bold text-cyan-800 text-lg mb-3 flex items-center">
                        🩺 國健署 14 次公費產檢
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                        只要是懷孕且有健保的準媽媽，皆享有 14 次免費產檢（含問診、基本超音波、尿檢等）。
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 bg-white p-3 rounded-lg border border-cyan-200">
                         <li><span className="font-bold text-cyan-700">資格：</span>懷孕婦女 (新住民未納健保另有專案)</li>
                         <li><span className="font-bold text-cyan-700">方式：</span>首次產檢領取「孕婦健康手冊」，之後憑手冊與健保卡就診。</li>
                         <li><span className="font-bold text-cyan-700">內容：</span>例行檢查、3次超音波、妊娠糖尿病篩檢、貧血檢驗、乙型鏈球菌篩檢等。</li>
                    </ul>
                    <div className="mt-3 text-xs text-cyan-600 flex gap-2">
                        <a href="https://mammy.hpa.gov.tw" target="_blank" className="underline hover:text-cyan-800">孕產兒關懷網站</a>
                        <a href="https://www.hpa.gov.tw/Pages/List.aspx?nodeid=194" target="_blank" className="underline hover:text-cyan-800">詳細補助項目表</a>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-5">
                    <h3 className="font-bold text-gray-800 text-lg mb-3">🧬 產前遺傳診斷補助</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-1">補助對象</h4>
                            <p className="text-sm text-gray-600">34歲以上高齡產婦、本人或配偶有遺傳病史、超音波異常等高風險群。</p>
                        </div>
                         <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-bold text-gray-700 mb-1">補助金額</h4>
                            <p className="text-sm text-gray-600">每胎補助羊膜穿刺或基因檢驗費用 <span className="text-red-500 font-bold">5,000元</span> (直接減免)。</p>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {/* TAB: CASH */}
          {activeTab === 'cash' && (
            <div className="space-y-6">
                {/* Labor Insurance */}
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                         <h3 className="font-bold text-orange-800 text-lg mb-2">💼 勞保生育給付</h3>
                         <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded">中央</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                        <p><b>資格：</b>參加勞保滿 280 日分娩 (或滿 181 日早產)。懷孕後離職，若在退保 1 年內生產亦可請領。</p>
                        <p><b>金額：</b>前 6 個月平均月投保薪資 × <span className="text-2xl font-bold text-orange-600 align-middle mx-1">60</span> 日 (2個月)。</p>
                        <p><b>雙胞胎：</b>按比例增給 (雙胞胎給付 4 個月)。</p>
                    </div>
                    <a href="https://www.bli.gov.tw/0004846.html" target="_blank" className="text-xs text-orange-600 underline mt-3 block">勞保局申請說明</a>
                </div>

                {/* Tainan City */}
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                         <h3 className="font-bold text-purple-800 text-lg mb-2">👶 臺南市生育獎勵金 (2025)</h3>
                         <span className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded">地方</span>
                    </div>
                    <div className="space-y-3 text-sm text-gray-700">
                        <p><b>資格：</b>父或母一方設籍臺南市滿 6 個月，且新生兒於臺南市完成出生登記。</p>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                             <div className="bg-white p-2 rounded border border-purple-100 text-center">
                                 <div className="text-gray-500 text-xs">第 1、2 胎</div>
                                 <div className="text-purple-600 font-bold text-lg">$20,000</div>
                             </div>
                             <div className="bg-white p-2 rounded border border-purple-100 text-center">
                                 <div className="text-gray-500 text-xs">第 3、4 胎</div>
                                 <div className="text-purple-600 font-bold text-lg">$30,000</div>
                             </div>
                        </div>
                         <p className="text-xs text-purple-500 mt-1">* 第 5 胎以上每名 $50,000</p>
                    </div>
                    <a href="https://people.tainan.gov.tw/cp.aspx?n=32018" target="_blank" className="text-xs text-purple-600 underline mt-3 block">臺南市戶政公告</a>
                </div>
                
                 {/* National Pension */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 opacity-80">
                    <h3 className="font-bold text-gray-700 mb-1">國民年金 / 農保</h3>
                    <p className="text-sm text-gray-600">若無勞保，國保與農保亦有生育給付，金額約為 2 個月投保金額。請擇一請領。</p>
                </div>
            </div>
          )}

          {/* TAB: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="relative border-l-2 border-cyan-200 pl-6 space-y-8 my-2">
                
                {/* Step 1 */}
                <div className="relative">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                    <h4 className="font-bold text-cyan-900 text-lg">一發現懷孕</h4>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-2">
                        <p className="text-sm text-gray-700 font-bold mb-1">動作：產檢建檔</p>
                        <p className="text-sm text-gray-600">持健保卡至醫療院所，領取「孕婦健康手冊」，啟動 14 次公費產檢資格。</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                    <h4 className="font-bold text-cyan-900 text-lg">懷孕期間</h4>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-2">
                        <p className="text-sm text-gray-700 font-bold mb-1">動作：確認保險身分</p>
                        <p className="text-sm text-gray-600">確認勞保/國保狀態。若有做羊膜穿刺等檢查，確認是否符合 5,000 元補助資格 (醫院通常會協助)。</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                    <h4 className="font-bold text-cyan-900 text-lg">生產後 60 日內 (重要!)</h4>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-2">
                        <p className="text-sm text-gray-700 font-bold mb-1">動作：報戶口 + 領錢</p>
                        <p className="text-sm text-gray-600">至臺南市戶政事務所辦理出生登記，同時申請<span className="text-purple-600 font-bold">生育獎勵金 (2萬元)</span>。</p>
                    </div>
                </div>

                 {/* Step 4 */}
                <div className="relative">
                    <div className="absolute -left-[33px] top-0 w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
                    <h4 className="font-bold text-cyan-900 text-lg">生產後 2 年內</h4>
                    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 mt-2">
                        <p className="text-sm text-gray-700 font-bold mb-1">動作：申請勞保/國保給付</p>
                        <p className="text-sm text-gray-600">準備出生證明等文件向勞保局申請生育給付 (約 2 個月薪資)。</p>
                    </div>
                </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SubsidiesGuide;
