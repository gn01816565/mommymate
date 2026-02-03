
import React, { useState } from 'react';

interface ShoppingListProps {
  onClose: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'stages' | 'bag' | 'budget'>('stages');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-6 flex justify-between items-center text-white shrink-0">
          <div className="flex items-center">
            <span className="text-3xl mr-3">🛍️</span>
            <div>
              <h2 className="text-2xl font-bold">孕期必備採購清單</h2>
              <p className="text-pink-100 text-sm mt-1">2025 台灣市售行情與待產準備攻略</p>
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
                onClick={() => setActiveTab('stages')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'stages' ? 'text-pink-600 bg-white border-t-2 border-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
            >
                分階段必買
            </button>
            <button 
                onClick={() => setActiveTab('bag')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'bag' ? 'text-pink-600 bg-white border-t-2 border-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
            >
                待產包清單 (36週前)
            </button>
            <button 
                onClick={() => setActiveTab('budget')}
                className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'budget' ? 'text-pink-600 bg-white border-t-2 border-pink-500' : 'text-gray-500 hover:text-pink-400'}`}
            >
                預算與攻略
            </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-8 bg-white flex-1">
          
          {/* TAB: STAGES */}
          {activeTab === 'stages' && (
            <div className="space-y-8">
                {/* Early Stage */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded text-sm mr-2">孕早期 (1-12週)</span>
                        打底期重點
                    </h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">物品</th>
                                    <th className="px-4 py-3">單價 (NTD)</th>
                                    <th className="px-4 py-3">購買重點</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">孕婦綜合維他命</td>
                                    <td className="px-4 py-3 text-gray-500">600-1,200/瓶</td>
                                    <td className="px-4 py-3 text-gray-600">含葉酸≥400mcg、鐵27mg</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">腹部撫紋霜/乳液</td>
                                    <td className="px-4 py-3 text-gray-500">300-800/瓶</td>
                                    <td className="px-4 py-3 text-gray-600">無酒精低敏，從初期開始擦</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">孕婦內褲 (加大)</td>
                                    <td className="px-4 py-3 text-gray-500">150-300/件</td>
                                    <td className="px-4 py-3 text-gray-600">棉質、無縫、高腰包覆</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mid Stage */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm mr-2">孕中期 (13-27週)</span>
                        舒適期重點
                    </h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">物品</th>
                                    <th className="px-4 py-3">單價 (NTD)</th>
                                    <th className="px-4 py-3">購買重點</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">托腹帶</td>
                                    <td className="px-4 py-3 text-gray-500">800-2,000/條</td>
                                    <td className="px-4 py-3 text-gray-600">選可調節，久站族必備</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">哺乳內衣</td>
                                    <td className="px-4 py-3 text-gray-500">400-800/件</td>
                                    <td className="px-4 py-3 text-gray-600">無鋼圈、單手易開扣</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">DHA 藻油/魚油</td>
                                    <td className="px-4 py-3 text-gray-500">500-1,200/瓶</td>
                                    <td className="px-4 py-3 text-gray-600">助胎兒腦部發育，藻油佳</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Late Stage */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                        <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm mr-2">孕晚期 (28週+)</span>
                        衝刺期重點
                    </h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-xl">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3">物品</th>
                                    <th className="px-4 py-3">單價 (NTD)</th>
                                    <th className="px-4 py-3">購買重點</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">月亮枕/側睡枕</td>
                                    <td className="px-4 py-3 text-gray-500">1,500-3,500</td>
                                    <td className="px-4 py-3 text-gray-600">支撐大肚，改善睡眠品質</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">鈣片</td>
                                    <td className="px-4 py-3 text-gray-500">300-800/瓶</td>
                                    <td className="px-4 py-3 text-gray-600">防抽筋，與鐵劑分開吃</td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">免洗內褲/產褥墊</td>
                                    <td className="px-4 py-3 text-gray-500">200-500/包</td>
                                    <td className="px-4 py-3 text-gray-600">準備約20-30天份</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          )}

          {/* TAB: HOSPITAL BAG */}
          {activeTab === 'bag' && (
            <div>
                 <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-rose-800 text-lg mb-2">🎒 待產包懶人包</h3>
                    <p className="text-sm text-rose-700">建議在 <span className="font-bold">36週前</span> 打包完畢，放在玄關或車上。分為證件、盥洗、衣物、產後護理四大類。</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="border border-gray-200 rounded-xl p-4">
                         <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">🪪 必備證件</h4>
                         <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                             <li>夫妻雙方身分證 (正本+影本)</li>
                             <li>健保卡</li>
                             <li>媽媽手冊 (B肝登錄表)</li>
                             <li>現金/信用卡 (出院結帳用)</li>
                         </ul>
                     </div>
                     <div className="border border-gray-200 rounded-xl p-4">
                         <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">🧴 盥洗與生活</h4>
                         <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                             <li>牙刷、牙膏、毛巾 (爸爸也要)</li>
                             <li>乾洗髮、沐浴乳 (小瓶裝)</li>
                             <li>保溫杯 (裝溫開水)</li>
                             <li>環保餐具、手機充電器</li>
                         </ul>
                     </div>
                     <div className="border border-gray-200 rounded-xl p-4">
                         <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">👗 衣物類</h4>
                         <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                             <li>出院服 (寬鬆、保暖帽子)</li>
                             <li>止滑拖鞋 (浴室安全)</li>
                             <li>哺乳內衣 (2-3件)</li>
                             <li>襪子 (保暖腳部)</li>
                         </ul>
                     </div>
                     <div className="border border-gray-200 rounded-xl p-4">
                         <h4 className="font-bold text-gray-800 mb-2 border-b pb-1">🩸 產後護理</h4>
                         <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                             <li>產褥墊 (惡露用，特大衛生棉)</li>
                             <li>免洗內褲 (20件以上)</li>
                             <li>沖洗瓶 (自然產傷口清洗)</li>
                             <li>羊脂膏、溢乳墊 (哺乳備用)</li>
                         </ul>
                     </div>
                 </div>
            </div>
          )}

          {/* TAB: BUDGET & TIPS */}
          {activeTab === 'budget' && (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                        <div className="font-bold text-green-800 mb-1">超精簡型</div>
                        <div className="text-2xl font-bold text-green-600 mb-2">$5k - 8k</div>
                        <p className="text-xs text-green-700">只買絕對必需品：基本維他命、基本內衣褲、產褥墊。適合預算有限或接收恩典牌者。</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 ring-2 ring-blue-100">
                         <div className="font-bold text-blue-800 mb-1">標準舒適型</div>
                        <div className="text-2xl font-bold text-blue-600 mb-2">$15k - 25k</div>
                        <p className="text-xs text-blue-700">多數媽媽選擇：含托腹帶、月亮枕、完整待產包、品質較好的營養品。</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                         <div className="font-bold text-purple-800 mb-1">進階享受型</div>
                        <div className="text-2xl font-bold text-purple-600 mb-2">$25k - 40k</div>
                        <p className="text-xs text-purple-700">追求高品質：高階機能枕、大量專櫃內衣、多品牌保養品、頂級營養補充。</p>
                    </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-5 border border-yellow-200">
                    <h3 className="font-bold text-yellow-800 mb-3 text-lg">💡 聰明採購攻略</h3>
                    <ul className="space-y-3 text-sm text-gray-700">
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2 font-bold">1. 購買時機：</span>
                            <span>建議在 <b>孕中期 (17-28週)</b> 身體較舒適時大量採購。孕晚期行動不便，只補期待產包耗材。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2 font-bold">2. 省錢訣竅：</span>
                            <span>善用婦幼展滿額禮 (常送免洗褲、溢乳墊)、接收親友二手孕婦裝 (只穿幾個月)、月亮枕可先借用試躺。</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-yellow-600 mr-2 font-bold">3. 避免過買：</span>
                            <span>內衣褲建議分階段買 (身材變化大)，新生兒奶瓶奶嘴不用囤太多 (寶寶可能挑嘴)。</span>
                        </li>
                         <li className="flex items-start">
                            <span className="text-yellow-600 mr-2 font-bold">4. 安全第一：</span>
                            <span>貼身衣物選台灣品牌或有 CNS 認證，避免螢光劑殘留。</span>
                        </li>
                    </ul>
                </div>
            </div>
          )}

          {/* Footer Sources */}
          <div className="mt-8 pt-4 border-t border-gray-100 text-xs text-gray-400">
            <p className="mb-1">資料來源：</p>
            <ul className="list-disc list-inside space-y-0.5">
                <li><a href="https://www.mammyvillage.com/blogs/mammyvillageblog/164573" target="_blank" className="hover:underline">六甲村 Top10 必買</a></li>
                <li><a href="https://article.yodee.com.tw/hospital-bag/" target="_blank" className="hover:underline">YODEE 待產包攻略</a></li>
                <li><a href="https://www.mombaby.com.tw/articles/9924472" target="_blank" className="hover:underline">丁丁藥局 280天必備清單</a></li>
                <li><a href="https://hugsie.com.tw/2022/05/23/5%E5%A4%A7%E5%AD%95%E5%A9%A6%E7%94%A8%E5%93%81%E6%8C%91%E9%81%B8%E6%94%BB%E7%95%A5" target="_blank" className="hover:underline">Hugsie 孕婦用品挑選攻略</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShoppingList;
