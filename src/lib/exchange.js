// src/utils/api.js
const BASE_URL = 'https://v6.exchangerate-api.com/v6/067be843deb6f54cfd38ee58';

export async function getExchangeRates(baseCurrency) {
  const response = await fetch(`${BASE_URL}/latest/${baseCurrency}`);
  const data = await response.json();
  return data;
}
