import axios from 'axios';

// Your Hugging Face API Key
const API_KEY = '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';  

// Define your models here
const MODELS = {
  gpt2: 'gpt2',
  gpt3: 'openai-community/gpt-3.5-turbo',
  bart: 'facebook/bart-large-cnn',
  t5: 't5-small',
  mistral7B: 'mistralai/Mistral-7B-Instruct-v0.3',
};

// Function to fetch summary using a specified model
export const fetchSummaryAndSources = async (inputText, model = MODELS.mistral7B) => {
  try {
    const prompt = inputText || `Provide a simple and informative summary of Artificial Intelligence (AI), explaining its key concepts, real-world applications, and why it matters. Include examples like self-driving cars, smart assistants, and AI in healthcare. The summary should be understandable to a general audience, focusing on clarity and simplicity.`;

    const endpoint = `https://api-inference.huggingface.co/models/${model}`;

    const response = await axios.post(
      endpoint,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Log the API response for debugging purposes
    console.log('API Response:', response.data);

    // Check the response format and structure
    const generatedText = response.data?.[0]?.generated_text || 'No summary generated';
    const sources = response.data?.[0]?.generated_sources || [];  // Assuming sources are available

    return { brief: generatedText, sources };  // Return both fields

  } catch (error) {
    console.error('Error fetching summary and sources:', error.response?.data || error.message);
    throw new Error('Failed to fetch summary and sources');
  }
};
















