import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
  url: process.env.QD_URL,
  apiKey: process.env.QD_API_KEY,
  checkCompatibility: false,
});

try {
  await client.createCollection('auo', {
    vectors: {
      size: 3072, // 向量維度（要與 embedding 模型一致）
      distance: 'Cosine', // 相似度計算方式
    },
  });
} catch (e) {
  console.log(e);
}
