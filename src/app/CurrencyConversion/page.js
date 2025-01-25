'use client'

'use client';

import { useState } from 'react';

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1); // Ensure this is a number
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'PKR', name: 'Pakistani Rupee' },
    { code: 'SAR', name: 'Saudi Riyal' },
    { code: 'KWD', name: 'Kuwaiti Dinar' },
    { code: 'AED', name: 'UAE Dirham' },
    { code: 'TRY', name: 'Turkish Lira' },
    { code: 'ZAR', name: 'South African Rand' },
  ];

  const handleConvert = async () => {
    try {
      if (amount <= 0) {
        alert('Please enter a valid amount greater than 0.');
        return;
      }
    //   5Z85BP9ZFOPND244
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/067be843deb6f54cfd38ee58/pair/${fromCurrency}/${toCurrency}/${amount}`
      );
      const data = await response.json();

      if (data.result === 'success') {
        setConvertedAmount(data.conversion_result);
      } else {
        console.error('Error fetching conversion rate:', data.error_message);
        alert('Currency conversion failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please check your internet connection and try again.');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md max-w-md mx-auto mt-10 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Currency Converter</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))} // Ensure numeric input
        className="border p-2 mb-4 w-full"
        placeholder="Amount"
      />
      <div className="flex gap-4 mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="border p-2 flex-1"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="border p-2 flex-1"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name} ({currency.code})
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleConvert}
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
      >
        Convert
      </button>
      {convertedAmount !== null && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium">
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}
