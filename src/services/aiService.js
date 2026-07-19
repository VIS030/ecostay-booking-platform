import { apiClient } from './api';

export const aiService = {
  /**
   * Sends user prompt and history to the FastAPI AI endpoint.
   * @param {string} prompt - User request string.
   * @param {Array} history - Session chat message array [{"role": "user"|"assistant", "content": "..."}]
   */
  async askTravelAssistant(prompt, history = []) {
    try {
      const response = await apiClient.post('/ai/travel-assistant', {
        prompt,
        history
      });
      return response;
    } catch (err) {
      console.error('Error calling AI Travel Assistant API:', err);
      throw err;
    }
  }
};
