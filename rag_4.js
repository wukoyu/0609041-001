import { readFileSync } from 'fs';
import { ai } from './lib/genai.js';
import { client } from './lib/qdrant.js';

// 讀取 FAQ 資料
const faqData = JSON.parse(readFileSync('./data/faq.json', 'utf-8'));

// 建立 collection（如果已存在會先刪除）
await client.recreateCollection('faq', {
  vectors: { size: 3072, distance: 'Cosine' },
});

// 批次產生 embeddings
const points = await Promise.all(
  faqData.map(async (faq) => {
    const text = `${faq.question} ${faq.answer}`;
    const response = await ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: text,
      config: { taskType: 'RETRIEVAL_DOCUMENT' },
    });

    return {
      id: faq.id,
      vector: response.embeddings[0].values,
      payload: faq,
    };
  })
);

await client.upsert('faq', { points });
console.log(`已索引 ${points.length} 筆 FAQ`);
