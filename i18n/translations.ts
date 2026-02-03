// i18n Translations

export const translations = {
  'zh-TW': {
    app: {
      title: 'MommyMate',
      subtitle: '陪伴您與寶寶的每一天',
    },
    nav: {
      home: '首頁',
      timeline: '時間軸',
      chat: '聊天助手',
      guides: '指南',
    },
    timeline: {
      selectWeek: '選擇懷孕週數',
      week: '第 {week} 週',
    },
    advice: {
      getAdvice: '取得 AI 建議',
      loading: '正在生成建議...',
      sources: '參考資料',
    },
    audio: {
      generate: '生成語音導覽',
      play: '播放語音導覽',
      generating: '正在生成語音...',
    },
    chat: {
      placeholder: '輸入您的問題...',
      send: '傳送',
      greeting: '你好！我是你的 AI 導樂。關於懷孕、產檢或補助有任何問題嗎？',
    },
    errors: {
      quotaExceeded: '⚠️ API 使用額度已達上限\n\n您今天的免費額度已用完，請明天再試。',
      networkError: '📡 網路連線發生問題\n\n請檢查您的網路連線後再試。',
      authError: '🔐 API 認證失敗\n\nAPI Key 可能已過期或無效。',
      genericError: '❌ AI 服務暫時無法使用\n\n請稍後再試。',
    },
  },
  'en-US': {
    app: {
      title: 'MommyMate',
      subtitle: 'Your Pregnancy Journey Companion',
    },
    nav: {
      home: 'Home',
      timeline: 'Timeline',
      chat: 'Chat',
      guides: 'Guides',
    },
    timeline: {
      selectWeek: 'Select Week',
      week: 'Week {week}',
    },
    advice: {
      getAdvice: 'Get AI Advice',
      loading: 'Generating advice...',
      sources: 'Sources',
    },
    audio: {
      generate: 'Generate Audio',
      play: 'Play Audio',
      generating: 'Generating audio...',
    },
    chat: {
      placeholder: 'Type your question...',
      send: 'Send',
      greeting: 'Hello! I\'m your AI doula. Any questions about pregnancy, checkups, or benefits?',
    },
    errors: {
      quotaExceeded: '⚠️ API Quota Exceeded\n\nYour free quota is used up. Please try again tomorrow.',
      networkError: '📡 Network Error\n\nPlease check your internet connection.',
      authError: '🔐 Authentication Failed\n\nAPI Key may be invalid or expired.',
      genericError: '❌ Service Unavailable\n\nPlease try again later.',
    },
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = typeof translations['zh-TW'];
