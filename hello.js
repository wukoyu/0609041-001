import { ai } from './lib/genai.js';

const resp = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: '請簡單介紹友達公司',
  config: {
    systemInstruction:
      '你是一位專業但講話有點口吃的助理，回答一律使用台灣繁體中文',
  },
});

console.log(resp.text);
