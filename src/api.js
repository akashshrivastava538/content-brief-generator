import axios from 'axios';

// Your Hugging Face API Key
const API_KEY = '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';

// Define your models here
const MODELS = {
  gpt2: 'gpt2',
  gpt3: 'openai-community/gpt-3.5-turbo', // Example fallback model
  bart: 'facebook/bart-large-cnn', // Example summarization model
  t5: 't5-small', // Another example summarization model
};

// Function to generate text with retry logic for different models
export const generateText = async (inputText, model = MODELS.gpt2) => {
  try {
    const endpoint = `https://api-inference.huggingface.co/models/${model}`;

    // Send a POST request to the Hugging Face API
    const response = await axios.post(
      endpoint,
      { inputs: inputText },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Return the generated text from the response
    return response.data?.[0]?.generated_text || 'No text generated';
  } catch (error) {
    console.error('Error generating text:', error.response?.data || error.message);

    // Fallback to another model if the primary model fails
    if (error.response?.data?.error === 'Model is currently loading') {
      console.log('Switching to fallback model');
      return generateText(inputText, MODELS.gpt3); // Example fallback to gpt-3.5
    } else {
      throw new Error('Failed to generate text');
    }
  }
};

// Function to fetch summary using a specified model
export const fetchSummaryAndSources = async (inputText, model = MODELS.bart) => {
  try {
    const endpoint = `https://api-inference.huggingface.co/models/${model}`;
    const prompt = `Provide a detailed, informative explanation about ${inputText}.`;

    // Send a POST request to the Hugging Face API
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

    // Return the summary text from the response
    return response.data?.[0]?.generated_text || 'No summary generated';
  } catch (error) {
    console.error('Error fetching summary and sources:', error.response?.data || error.message);
    throw new Error('Failed to fetch summary and sources');
  }
};







