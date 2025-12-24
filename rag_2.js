import { ai } from "./lib/genai.js"
import { cosineSimilarity } from "./lib/tool.js"

const response1 = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: "如何學習程式設計？"
})

const response2 = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: "Python 程式入門"
})

const response3 = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: "香蕉好吃"
})

const vector1 = response1.embeddings[0].values
const vector2 = response2.embeddings[0].values
const vector3 = response3.embeddings[0].values

console.log(cosineSimilarity(vector1, vector2))
console.log(cosineSimilarity(vector1, vector3))