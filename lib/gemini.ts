import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PULIC_API_KEY!);

export const geminiModel = genAI.getGenerativeModel({ model: process.env.NEXT_PUBLIC_GEMINI_MODEL! });

export async function generateGigDescription(title: string, skills: string[]) {
  try {
    const prompt = `Create a professional and attractive gig description for a female freelancer offering ${title} services. Skills include: ${skills.join(', ')}. Keep it concise, professional, and appealing to potential clients. Focus on quality, experience, and reliability.`;
    
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating gig description:', error);
    return '';
  }
}

export async function translateText(text: string, targetLang: 'en' | 'ur') {
  try {
    const prompt = `Translate the following text to ${targetLang === 'ur' ? 'Urdu' : 'English'}. Only return the translation, no additional text: ${text}`;
    
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
}

export async function generateRecommendations(userPreferences: string[]) {
  try {
    const prompt = `Based on these preferences: ${userPreferences.join(', ')}, suggest 5 relevant freelance services related to traditional crafts, stitching, embroidery, and tailoring. Return as a JSON array of strings.`;
    
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch {
      return [];
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}