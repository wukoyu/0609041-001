import { ai } from './lib/genai.js';
import { input } from '@inquirer/prompts';
import { ask } from './lib/ask_question.js';

const chatHistory = [];

while (true) {
  const q = await ask('→ ');
  const userInput = q.trim();

  if (userInput == 'exit') break;

  if (userInput != '') {
    chatHistory.push({
      role: 'user',
      parts: [{ text: userInput }],
    });

    const resp = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: chatHistory,
      config: {
        systemInstruction: '回答請一律使用台灣繁體中文',
      },
    });

    chatHistory.push({
      role: 'model',
      parts: [{ text: resp.text }],
    });

    // console.log(chatHistory);
    console.log(resp.text);
  }
}