import { ai } from './lib/genai.js';
import { Type } from '@google/genai';

function getWeather(city) {
  // 模擬天氣查詢
  const data = {
    台北: { temp: 25, condition: '晴天' },
    高雄: { temp: 28, condition: '多雲' },
  };

  return data[city] || { temp: 20, condition: '未知' };
}

// 定義天氣查詢工具
const getWeatherDeclaration = {
  name: 'get_weather',
  description: '查詢指定城市的天氣資訊',
  parameters: {
    type: Type.OBJECT,
    properties: {
      city: {
        type: Type.STRING,
        description: '城市名稱，例如：台北、高雄',
      },
    },
    required: ['city'],
  },
};

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: '今天台北天氣如何？',
  config: {
    systemInstruction: '回答請一律使用台灣繁體中文',
    tools: [
      {
        functionDeclarations: [getWeatherDeclaration],
      },
    ],
  },
});

if (response.functionCalls) {
  const result = [];
  response.functionCalls.forEach((fc) => {
    switch (fc.name) {
      case 'get_weather':
        result.push({
          city: fc.args.city,
          data: getWeather(fc.args.city),
        });
        break;
    }
  });

  // console.log(result)
  const resp = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: JSON.stringify(result),
    config: {
      systemInstruction: '回答請一律使用台灣繁體中文',
    },
  });
  console.log(resp.text);
} else {
  console.log(response.text);
}
