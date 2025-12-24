import { ai } from './lib/genai.js';
import { ask } from './lib/ask_question.js';

const chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: '回答請一律使用台灣繁體中文',
  },
});

while (true) {
  const q = await ask('→ ');
  const userInput = q.trim();

  if (userInput == 'exit') break;

  if (userInput != '') {
    const resp = await chat.sendMessage({ message: userInput });

    // console.log(chat.getHistory());
    console.log(resp.text);
  }
}
