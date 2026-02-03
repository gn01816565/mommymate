
import React, { useState, useEffect } from 'react';
import { WeekData, AiAdviceResult } from '../types';
import { getWeekAdvice, generateBabyVideo, generateWeekNarration, playRawAudio } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import NutritionGuide from './NutritionGuide';
import BudgetGuide from './BudgetGuide';
import ShoppingList from './ShoppingList';
import SubsidiesGuide from './SubsidiesGuide';

interface DetailViewProps {
  data: WeekData;
}

const DetailView: React.FC<DetailViewProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'checkups' | 'todo'>('overview');
  const [aiAdvice, setAiAdvice] = useState<AiAdviceResult | null>(null);
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [showNutritionGuide, setShowNutritionGuide] = useState<boolean>(false);
  const [showBudgetGuide, setShowBudgetGuide] = useState<boolean>(false);
  const [showShoppingList, setShowShoppingList] = useState<boolean>(false);
  const [showSubsidiesGuide, setShowSubsidiesGuide] = useState<boolean>(false);
  
  // Video & Audio Generation State
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);
  const [generatingMedia, setGeneratingMedia] = useState<boolean>(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  useEffect(() => {
    // Reset states when week changes
    setAiAdvice(null);
    setLoadingAi(false);
    setVideoUrl(null);
    setAudioBase64(null);
    setGeneratingMedia(false);
    setMediaError(null);
    setShowNutritionGuide(false);
    setShowBudgetGuide(false);
    setShowShoppingList(false);
    setShowSubsidiesGuide(false);
    setActiveTab('overview');
  }, [data.week]);

  const handleGetAiAdvice = async () => {
    setLoadingAi(true);
    const advice = await getWeekAdvice(data);
    setAiAdvice(advice);
    setLoadingAi(false);
  };

  const handleGenerateMedia = async () => {
    setMediaError(null);
    setGeneratingMedia(true);

    try {
        // 1. Check/Request API Key
        const aiStudio = (window as any).aistudio;
        if (aiStudio && aiStudio.hasSelectedApiKey && aiStudio.openSelectKey) {
            const hasKey = await aiStudio.hasSelectedApiKey();
            if (!hasKey) {
                await aiStudio.openSelectKey();
            }
        }

        // 2. Generate Video and Audio in parallel
        const videoPromise = generateBabyVideo(data.week, data.babySize);
        const audioPromise = generateWeekNarration(data.week, data.description);

        const [url, audioData] = await Promise.all([videoPromise, audioPromise]);
        
        setVideoUrl(url);
        setAudioBase64(audioData);
        
        // Auto-play audio if available
        if (audioData) {
            playRawAudio(audioData);
        }

    } catch (error: any) {
        console.error("Media gen failed", error);
        const errMsg = error?.toString() || "";
        
        const aiStudio = (window as any).aistudio;
        if (errMsg.includes("Requested entity was not found") && aiStudio) {
             await aiStudio.openSelectKey();
             setMediaError("API Key 驗證失敗，請重新選擇 Key 後再試一次。");
        } else {
             setMediaError("生成失敗，請稍後再試。");
        }
    } finally {
        setGeneratingMedia(false);
    }
  };

  const handlePlayAudio = () => {
      if (audioBase64) {
          playRawAudio(audioBase64);
      }
  };

  const openYoutubeSearch = () => {
      const query = encodeURIComponent(`懷孕第 ${data.week} 週 超音波 發展`);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  const openGoogleGiftSearch = () => {
      const query = encodeURIComponent(`2025 媽媽手冊 換禮 攻略`);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  const formatCurrency = (val: string) => {
    return <span className="font-mono text-pink-600 font-medium">{val}</span>;
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden relative">
      {/* Modals */}
      {showNutritionGuide && (
        <NutritionGuide onClose={() => setShowNutritionGuide(false)} />
      )}
      {showBudgetGuide && (
        <BudgetGuide onClose={() => setShowBudgetGuide(false)} />
      )}
      {showShoppingList && (
        <ShoppingList onClose={() => setShowShoppingList(false)} />
      )}
      {showSubsidiesGuide && (
        <SubsidiesGuide onClose={() => setShowSubsidiesGuide(false)} />
      )}

      {/* Header with Image */}
      <div className="relative h-48 md:h-64 overflow-hidden group">
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold mb-1">第 {data.week} 週</h2>
                    <p className="text-lg opacity-90">{data.title}</p>
                </div>
                <div className="hidden md:block bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-sm border border-white/30">
                    👶 寶寶大小：{data.babySize}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'overview' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50' : 'text-gray-500 hover:text-pink-400'}`}
        >
          總覽與建議
        </button>
        <button 
          onClick={() => setActiveTab('checkups')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'checkups' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50' : 'text-gray-500 hover:text-pink-400'}`}
        >
          檢查與補助
        </button>
        <button 
          onClick={() => setActiveTab('todo')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'todo' ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50' : 'text-gray-500 hover:text-pink-400'}`}
        >
          待辦與清單
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-lg mb-4">{data.description}</p>
                    
                    {/* Dad's Corner */}
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl shadow-sm mb-6">
                        <h3 className="flex items-center text-blue-800 font-bold mb-2">
                            <span className="text-xl mr-2">🦸‍♂️</span> 準爸爸專區 (Dad's Corner)
                        </h3>
                        <p className="text-blue-700 text-sm leading-relaxed">
                            {data.dadTips}
                        </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                         <button 
                            onClick={() => setShowNutritionGuide(true)}
                            className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-yellow-200 transition-colors"
                         >
                            <span>🥗</span><span>營養指南</span>
                         </button>
                         <button 
                            onClick={() => setShowShoppingList(true)}
                            className="flex items-center space-x-2 bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors"
                         >
                            <span>🛍️</span><span>採購清單</span>
                         </button>
                         <button 
                            onClick={openYoutubeSearch}
                            className="flex items-center space-x-2 bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-200 transition-colors"
                         >
                            <span>📺</span><span>相關影片</span>
                         </button>
                    </div>
                </div>

                {/* AI & Media Generation Section */}
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-indigo-900 flex items-center">
                            <span className="mr-2">✨</span> AI 智能助手
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Advice Card */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h4 className="font-bold text-gray-800 mb-2">本週建議</h4>
                            {!aiAdvice ? (
                                <div className="text-center py-6">
                                    <p className="text-gray-500 text-sm mb-4">獲取針對第 {data.week} 週的詳細護理建議</p>
                                    <button 
                                        onClick={handleGetAiAdvice}
                                        disabled={loadingAi}
                                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                    >
                                        {loadingAi ? 'AI 思考中...' : '獲取 AI 建議'}
                                    </button>
                                </div>
                            ) : (
                                <div>
                                    <div className="prose prose-sm prose-pink max-h-60 overflow-y-auto mb-3">
                                        <ReactMarkdown>{aiAdvice.text}</ReactMarkdown>
                                    </div>
                                    {aiAdvice.sources.length > 0 && (
                                        <div className="border-t border-gray-100 pt-2">
                                            <p className="text-xs text-gray-400 mb-1">資料來源 (Grounding):</p>
                                            <ul className="text-xs space-y-1">
                                                {aiAdvice.sources.map((s, i) => (
                                                    <li key={i}>
                                                        <a href={s.uri} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline truncate block">
                                                            {s.title}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Media Card */}
                        <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col">
                            <h4 className="font-bold text-gray-800 mb-2">寶寶模擬影像 & 語音</h4>
                            
                            <div className="flex-1 flex flex-col items-center justify-center min-h-[160px] bg-black/5 rounded-lg overflow-hidden relative">
                                {generatingMedia ? (
                                    <div className="flex flex-col items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                                        <p className="text-xs text-gray-500">正在生成影像與語音 (約需 10-20 秒)...</p>
                                    </div>
                                ) : videoUrl ? (
                                    <div className="w-full h-full flex flex-col">
                                        <video src={videoUrl} controls className="w-full h-auto max-h-48 object-contain bg-black" />
                                        {audioBase64 && (
                                            <div className="flex items-center justify-center p-2 bg-gray-100 w-full mt-auto">
                                                <button onClick={handlePlayAudio} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center">
                                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                                    重播語音導覽
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center p-4">
                                        <p className="text-gray-500 text-sm mb-4">生成 {data.babySize} 的 3D 模擬影片</p>
                                        <button 
                                            onClick={handleGenerateMedia}
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                                        >
                                            開始生成
                                        </button>
                                        {mediaError && <p className="text-red-500 text-xs mt-2">{mediaError}</p>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Life Preparations */}
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">生活準備</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {data.lifePreparations.map((item, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-2">{item.icon}</div>
                                <h4 className="font-bold text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{item.content}</p>
                                <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">
                                    {item.category === 'diet' ? '飲食' : 
                                     item.category === 'clothing' ? '衣著' : 
                                     item.category === 'living' ? '居住' : 
                                     item.category === 'travel' ? '行動' : '健康'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* TAB: CHECKUPS */}
        {activeTab === 'checkups' && (
            <div className="space-y-6">
                 {/* Resources & Budget Cards */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {/* Subsidies Card */}
                     <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-100 shadow-sm flex flex-col justify-between">
                         <div className="mb-4">
                             <h3 className="text-lg font-bold text-cyan-800 flex items-center">
                                 <span className="text-2xl mr-2">🏛️</span> 補助資源大全
                             </h3>
                             <p className="text-sm text-cyan-600 mt-1">
                                 14次公費產檢、勞保生育給付、臺南市生育獎勵與各項減免申請懶人包。
                             </p>
                         </div>
                         <button 
                            onClick={() => setShowSubsidiesGuide(true)}
                            className="bg-cyan-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-cyan-700 shadow-md transition-all flex items-center justify-center"
                         >
                             查看補助詳情
                         </button>
                     </div>

                     {/* Budget Card */}
                     <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 shadow-sm flex flex-col justify-between">
                         <div className="mb-4">
                             <h3 className="text-lg font-bold text-emerald-800 flex items-center">
                                 <span className="text-2xl mr-2">💰</span> 費用與預算規劃
                             </h3>
                             <p className="text-sm text-emerald-600 mt-1">
                                 NIPT、高層次超音波等自費項目行情整理，幫助您提前規劃產檢預算。
                             </p>
                         </div>
                         <button 
                            onClick={() => setShowBudgetGuide(true)}
                            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 shadow-md transition-all flex items-center justify-center"
                         >
                             查看預算指南
                         </button>
                     </div>
                 </div>

                {/* Routine Checkups */}
                <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <span className="bg-pink-100 text-pink-600 p-1.5 rounded-lg mr-2">🩺</span>
                        本週產檢項目
                    </h3>
                    <div className="space-y-3">
                        {data.checkups.map((checkup, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border ${checkup.isMandatory ? 'bg-white border-pink-200 shadow-sm' : 'bg-gray-50 border-gray-200 border-dashed'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900">
                                        {checkup.name}
                                        {checkup.isMandatory && <span className="ml-2 text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">必做</span>}
                                    </h4>
                                    <span className="text-xs text-gray-500">{formatCurrency(checkup.costRange)}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{checkup.description}</p>
                                <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block">
                                    <span className="mr-1">💰</span> 補助：{checkup.subsidy}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vaccines */}
                {data.vaccines && data.vaccines.length > 0 && (
                    <div>
                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                            <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mr-2">💉</span>
                            建議疫苗
                        </h3>
                        <div className="space-y-3">
                            {data.vaccines.map((v, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-gray-900">{v.name}</h4>
                                        <span className="text-xs text-gray-500">{formatCurrency(v.costRange)}</span>
                                    </div>
                                    <p className="text-sm text-gray-700">{v.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* TAB: TODO */}
        {activeTab === 'todo' && (
            <div className="space-y-6">
                {/* To-Do List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-100 font-bold text-gray-700">
                        本週待辦事項
                    </div>
                    <div className="divide-y divide-gray-100">
                        {data.toDo.map((item, idx) => (
                            <div key={idx} className="p-4 flex items-center hover:bg-gray-50 transition-colors">
                                <div className="w-5 h-5 rounded-full border-2 border-pink-300 mr-3 cursor-pointer hover:bg-pink-100"></div>
                                <div>
                                    <div className="text-gray-800">{item.task}</div>
                                    <div className="text-xs text-gray-400 capitalize">{item.category}</div>
                                </div>
                            </div>
                        ))}
                        <div className="p-4 flex items-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={openGoogleGiftSearch}>
                            <div className="w-5 h-5 rounded-full border-2 border-yellow-300 mr-3"></div>
                            <div>
                                <div className="text-gray-800 font-medium">搜尋媽媽禮資訊</div>
                                <div className="text-xs text-yellow-500">Bonus</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Supplements */}
                <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                    <h3 className="font-bold text-green-800 mb-3 flex items-center">
                        <span className="mr-2">💊</span> 重點營養補充
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {data.supplements.map((sup, idx) => (
                            <span key={idx} className="bg-white text-green-700 px-3 py-1 rounded-full text-sm border border-green-200 shadow-sm">
                                {sup}
                            </span>
                        ))}
                        <button onClick={() => setShowNutritionGuide(true)} className="px-3 py-1 rounded-full text-sm border border-green-600 text-green-700 hover:bg-green-100">
                            + 查看完整指南
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;
