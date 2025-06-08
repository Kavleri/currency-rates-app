import React from 'react';

const CurrencyConverter = ({
  currencies,
  fromCurrency,
  toCurrency,
  setFromCurrency,
  setToCurrency,
  amount,
  setAmount,
  convertedAmount
}) => {
  return (
    <div className="converter-container">
      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="amount-input"
        />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
      <div className="equals-sign">=</div>
      <div className="result-group">
        <p className="converted-amount">{convertedAmount.toFixed(2)}</p>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
