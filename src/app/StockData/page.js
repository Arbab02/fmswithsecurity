'use client'

import { useState, useEffect } from 'react';
import { fetchStockData } from '@/lib/alphaVantage';

const StockData = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStockData = async () => {
      const data = await fetchStockData(symbol);
      
      if (data.error) {
        setError(data.error);
      } else {
        setStockData(data);
      }
    };

    getStockData();
  }, [symbol]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4 mx-auto w-[80%] bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Stock Data for {symbol}</h2>
      <div>
        {stockData ? (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Current Price</td>
                <td className="border px-4 py-2">{stockData.c}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">High</td>
                <td className="border px-4 py-2">{stockData.h}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Low</td>
                <td className="border px-4 py-2">{stockData.l}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Open</td>
                <td className="border px-4 py-2">{stockData.o}</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Previous Close</td>
                <td className="border px-4 py-2">{stockData.pc}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default StockData;
