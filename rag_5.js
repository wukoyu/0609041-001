import { ai } from './lib/genai.js';
import { client } from './lib/qdrant.js';

async function searchFAQ(query, limit = 3) {
  // 取得查詢的 embedding
  const response = await ai.models.embedContent({
    model: 'gemini-embedding-001',
    contents: query,
    config: { taskType: 'RETRIEVAL_QUERY' },
  });

  // 搜尋相似內容
  const results = await client.query('faq', {
    query: response.embeddings[0].values,
    limit,
    with_payload: true,
  });

  return results.points.map((r) => ({
    score: r.score,
    ...r.payload,
  }));
}

let results = await searchFAQ('生日優惠');
results = results.filter((r) => {
  return r.score >= 0.7;
});

console.log(results);
