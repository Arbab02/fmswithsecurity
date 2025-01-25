// services/stockDataService.js

const API_KEY = 'cu9j0mpr01qnf5nn5i5gcu9j0mpr01qnf5nn5i60'; // Replace with your Finnhub API key
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockData = async (symbol) => {
  try {
    const response = await fetch(`${BASE_URL}/quote?symbol=GOOG&token=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle the data structure based on Finnhub API response
    return data;
  } catch (error) {
    console.error('Error fetching data from Finnhub:', error.message);
    return { error: error.message };
  }
};
