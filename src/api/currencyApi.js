import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app';

/**
 * Mengambil daftar semua mata uang yang tersedia.
 * @returns {Promise<string[]>} Daftar simbol mata uang.
 */
export const fetchCurrencies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/currencies`);
    return Object.keys(response.data);
  } catch (error) {
    console.error("Error fetching currencies:", error);
    return [];
  }
};

/**
 * Mengambil kurs terbaru antara dua mata uang.
 * @param {string} fromCurrency Mata uang asal.
 * @param {string} toCurrency Mata uang tujuan.
 * @returns {Promise<number|null>} Nilai tukar.
 */
export const fetchLatestRate = async (fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return 1;
  try {
    const response = await axios.get(`${BASE_URL}/latest?from=${fromCurrency}&to=${toCurrency}`);
    return response.data.rates[toCurrency];
  } catch (error) {
    console.error("Error fetching latest rate:", error);
    return null;
  }
};

/**
 * Mengambil data historis untuk 30 hari terakhir.
 * @param {string} fromCurrency Mata uang asal.
 * @param {string} toCurrency Mata uang tujuan.
 * @returns {Promise<object|null>} Data historis.
 */
export const fetchHistoricalData = async (fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return null;
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const startDate = date.toISOString().split('T')[0]; // Format YYYY-MM-DD

  try {
    const response = await axios.get(`${BASE_URL}/${startDate}..?from=${fromCurrency}&to=${toCurrency}`);
    return response.data.rates;
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return null;
  }
};
