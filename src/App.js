import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import HistoricalChart from './components/HistoricalChart';
import { fetchCurrencies, fetchLatestRate, fetchHistoricalData } from './api/currencyApi';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [amount, setAmount] = useState(1);
  const [rate, setRate] = useState(0);
  const [historicalData, setHistoricalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Ambil daftar mata uang saat aplikasi pertama kali dimuat
  useEffect(() => {
    const getCurrencies = async () => {
      const availableCurrencies = await fetchCurrencies();
      setCurrencies(availableCurrencies);
      setIsLoading(false);
    };
    getCurrencies();
  }, []);

  // 2. Ambil kurs terbaru dan data historis setiap kali mata uang berubah
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const getRates = async () => {
        setIsLoading(true);
        const latestRate = await fetchLatestRate(fromCurrency, toCurrency);
        const history = await fetchHistoricalData(fromCurrency, toCurrency);
        setRate(latestRate);
        setHistoricalData(history);
        setIsLoading(false);
      };
      getRates();
    }
  }, [fromCurrency, toCurrency]);

  // Hitung jumlah yang dikonversi, hanya dihitung ulang jika `amount` atau `rate` berubah
  const convertedAmount = useMemo(() => amount * rate, [amount, rate]);

  if (isLoading && currencies.length === 0) {
     return <div className="loading-screen">Memuat Data...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>💸 Aplikasi Kurs Mata Uang</h1>
        <p>Lihat kurs terkini dan histori data secara real-time.</p>
      </header>
      <main>
        <CurrencyConverter
          currencies={currencies}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          setFromCurrency={setFromCurrency}
          setToCurrency={setToCurrency}
          amount={amount}
          setAmount={setAmount}
          convertedAmount={convertedAmount}
        />
        {isLoading && <div className="loading-indicator">Memperbarui data...</div>}
        <HistoricalChart
          historicalData={historicalData}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </main>
      <footer className="App-footer">
        <p>Dibuat dengan React.js & Chart.js. Data dari Frankfurter.app.</p>
      </footer>
    </div>
  );
}

export default App;
