// Secure Gemini Service - 透過後端 API Proxy
// API Key 完全不會暴露在前端

import { WeekData, AiAdviceResult } from '../types';
import { callGeminiAPI, ApiError } from './apiProxy';

// 錯誤訊息處理
const getErrorMessage = (error: any): string => {
  if (error instanceof ApiError) {
    // 檢查是否為額度用完
    if (error.code === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
      return '⚠️ API 使用額度已達上限\n\n您今天的免費額度已用完，請明天再試。\n或考慮升級至付費版本以獲得更多額度。';
    }
    
    // 檢查是否為認證錯誤
    if (error.code === 401 || error.code === 403) {
      return '🔐 API 認證失敗\n\nAPI Key 可能已過期或無效，請聯繫管理員。';
    }
    
    // 檢查是否為模型不存在
    if (error.code === 404) {
      return '❌ 請求的 AI 模型不存在\n\n系統設定可能有誤，請聯繫管理員。';
    }
    
    // 檢查是否為伺服器錯誤
    if (error.code && error.code >= 500) {
      return '🔧 Google AI 服務暫時無法使用\n\n請稍後再試，或聯繫管理員。';
    }
  }
  
  // 網路錯誤
  if (error.message?.includes('fetch') || error.message?.includes('network')) {
    return '📡 網路連線發生問題\n\n請檢查您的網路連線後再試。';
  }
  
  // 預設錯誤訊息
  return '❌ AI 服務暫時無法使用\n\n請稍後再試。如果問題持續，請聯繫管理員。';
};

export const getWeekAdvice = async (weekData: WeekData): Promise<AiAdviceResult> => {
  const prompt = `
    我是一位懷孕 ${weekData.week} 週的準媽媽。
    目前的階段是：${weekData.title}。
    
    請針對這個階段，提供一個溫暖、詳細的建議，包含：
    1. 這個週數寶寶的發展重點 (更有趣的比喻)。
    2. 媽媽身體可能出現的不適與舒緩方式。
    3. 針對以下檢查項目的補充說明：${weekData.checkups.map(c => c.name).join(', ')}。
    4. 給爸爸的一句話建議。

    請用繁體中文回答，語氣親切專業，並使用 Markdown 格式 (使用條列式)。
    限制在 500 字以內。
  `;

  try {
    const response = await callGeminiAPI({
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      method: 'POST',
      body: {
        contents: [{
          parts: [{ text: prompt }]
        }],
        tools: [{ googleSearch: {} }]
      }
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "目前無法獲取建議，請稍後再試。";
    
    // Extract grounding sources
    const sources: { title: string; uri: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web) {
          sources.push({
            title: chunk.web.title || '參考資料',
            uri: chunk.web.uri
          });
        }
      });
    }

    return { text, sources };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: getErrorMessage(error),
      sources: []
    };
  }
};

export const chatWithDoula = async (message: string, contextWeek: number): Promise<string> => {
  const prompt = `
    你是一位專業、溫柔的產前導樂 (Doula) 和衛教師。
    使用者目前懷孕第 ${contextWeek} 週。
    使用者的問題是：${message}

    請用繁體中文回答，針對台灣的醫療環境與習俗給予適當建議。
    如果涉及嚴重的醫療狀況 (如劇烈腹痛、大量出血)，請務必建議立即就醫。
  `;

  try {
    const response = await callGeminiAPI({
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      method: 'POST',
      body: {
        contents: [{
          parts: [{ text: prompt }]
        }]
      }
    });

    return response.candidates?.[0]?.content?.parts?.[0]?.text || "抱歉，我一時答不上來。";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return getErrorMessage(error);
  }
}

export const generateWeekNarration = async (week: number, description: string): Promise<string> => {
  const prompt = `
    請用溫柔、母性的口吻，用繁體中文朗讀以下內容，語速適中，充滿期待感：
    "恭喜妳來到懷孕第 ${week} 週。${description} 這是寶寶成長的重要時刻。"
  `;

  try {
    const response = await callGeminiAPI({
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent',
      method: 'POST',
      body: {
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' }
            }
          }
        }
      }
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("No audio generated");
    
    return base64Audio;
  } catch (error) {
    console.error("TTS Error", error);
    // 拋出帶有友善訊息的錯誤
    if (error instanceof ApiError) {
      throw new Error(getErrorMessage(error));
    }
    throw error;
  }
};

// --- Audio Utils for PCM Decoding ---

function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const playRawAudio = async (base64String: string): Promise<void> => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const bytes = decodeBase64(base64String);
    
    // Convert PCM (Int16) to Float32 manually for raw audio stream
    const dataInt16 = new Int16Array(bytes.buffer);
    const frameCount = dataInt16.length;
    const buffer = audioContext.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (e) {
    console.error("Audio Playback Error", e);
  }
};
