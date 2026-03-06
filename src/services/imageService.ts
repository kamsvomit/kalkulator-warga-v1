import { GoogleGenAI } from "@google/genai";

async function generateHeroImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const prompt = "modern website hero illustration showing many floating calculator tool cards, BMI calculator, loan calculator, discount calculator, age calculator, unit converter, minimal UI widgets, glassmorphism interface, clean tech aesthetic, soft gradient background, white and blue color palette, futuristic productivity tools, depth of field, ultra detailed, hyper realistic lighting, modern SaaS website hero design, 16:9 composition, empty center space for headline";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        },
      },
    });

    for (const part of response.candidates![0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (error) {
    console.error("Error generating image:", error);
  }
  return null;
}

export { generateHeroImage };
