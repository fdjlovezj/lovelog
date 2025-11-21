import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. AI features will not work.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const polishMessage = async (text: string, style: 'romantic' | 'poetic' | 'funny'): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return text;

  try {
    const prompt = `
      You are a romantic writing assistant helping fandunjin write a daily note to his long-distance girlfriend zhaojin.
      Please rewrite the following text to be more ${style}, warm, and loving. Keep it concise (under 100 words).
      
      Original text: "${text}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return text;
  }
};

export const suggestDailyTopic = async (): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "Tell zhaojin what you miss most about her today.";

  try {
    const prompt = "Give me one short, creative, and specific prompt for fandunjin to write to his long-distance girlfriend zhaojin today. It should be sweet and engaging.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "What is your favorite memory of us?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "What is your favorite memory of us?";
  }
};

export const generateLoveNote = async (): Promise<string> => {
  const ai = getAiClient();
  if (!ai) return "I love you more than words can say, Zhaojin.";

  try {
    const prompt = "Write a very short, sweet, and deeply romantic 'I love you' message from fandunjin to his long-distance girlfriend zhaojin. It should be spontaneous and emotional. Under 60 words.";
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Every second apart is a second too long. I love you, Zhaojin.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Every second apart is a second too long. I love you, Zhaojin.";
  }
};