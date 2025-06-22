import './App.css';
import { InputBox } from './components/index';
import useCurrencyInfo from './hooks/useCurrencyInfo';
import { useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmt);
    setConvertedAmt(amount);
  };

  const convert = () => {
    if (!amount || isNaN(amount)) return;
    setConvertedAmt((Number(amount) * currencyInfo[to]).toFixed(2));
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/bgimage.png')` }}
    >
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl text-white font-semibold mb-6">
        Currency Converter
      </h1>

      {/* Form Box with blur */}
      <div className="w-full max-w-lg bg-white/20 border border-gray-600 rounded-xl p-6 backdrop-blur-md shadow-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          {/* From Box */}
          <div className="mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onAmountChange={setAmount}
              onCurrencyChange={setFrom}
              selectCurrency={from}
            />
          </div>

          {/* Swap Button */}
          <div className="relative w-full h-0.5 my-6 flex justify-center">
            <button
              type="button"
              className="absolute left-1/2 -top-4 -translate-x-1/2 border border-white bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700 transition"
              onClick={swap}
            >
              Swap
            </button>
          </div>

          {/* To Box */}
          <div className="mb-4">
            <InputBox
              label="To"
              amount={convertedAmt}
              currencyOptions={options}
              onAmountChange={setConvertedAmt}
              onCurrencyChange={setTo}
              selectCurrency={to}
              amountDisable
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-lg transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
