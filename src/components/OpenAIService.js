// src/openaiService.js

import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const getOpenAIResponse = async (prompt) => {
  try {
    console.log("Prompt being sent:", prompt);

    // Making the API request to GPT-4
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',  // Specify the GPT-4 model
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );

    // Extracting the content of the response
    const messageContent = response.data.choices[0].message.content;
    console.log("Extracted message from OpenAI:", messageContent);
    return messageContent;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    if (error.response) {
      console.error('API returned an error response:', {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    }
    throw new Error('Failed to get a response from OpenAI');
  }
};
