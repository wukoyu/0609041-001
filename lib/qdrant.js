import { QdrantClient } from '@qdrant/js-client-rest';

export const client = new QdrantClient({
  url: process.env.QD_URL,
  apiKey: process.env.QD_API_KEY,
});
