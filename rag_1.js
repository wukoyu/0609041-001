import { ai } from "./lib/genai.js"

const response = await ai.models.embedContent({
  model: "gemini-embedding-001",
  contents: "如何學習程式設計？"
})

const vector = response.embeddings[0].values
console.log("向量維度:", vector.length) // 3072
console.log("前 5 個數值:", vector.slice(0, 5))