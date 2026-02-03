// API Proxy Service
// 所有 Gemini API 呼叫都通過後端 proxy，隱藏 API Key

const API_BASE_URL = '/mommymate/api/gemini';

export interface ApiProxyRequest {
  endpoint: string;
  method?: 'GET' | 'POST';
  body?: any;
}

export class ApiError extends Error {
  code?: number;
  details?: any;
  
  constructor(message: string, code?: number, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
}

export const callGeminiAPI = async (request: ApiProxyRequest): Promise<any> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const error = await response.json();
      
      // 傳遞更詳細的錯誤資訊
      throw new ApiError(
        error.message || error.error?.message || 'API request failed',
        error.error?.code || response.status,
        error.error
      );
    }

    return await response.json();
  } catch (error) {
    console.error('API Proxy Error:', error);
    throw error;
  }
};
