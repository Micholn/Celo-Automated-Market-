import React, { useState, useEffect } from 'react';
import AMM from './AMM';

function App() {
  const [reserve1, setReserve1] = useState(0);
  const [reserve2, setReserve2] = useState(0);
  const [amount1, setAmount1] = useState('');
  const [amount2, setAmount2] = useState('');
  const [liquidity, setLiquidity] = useState('');
  const [fromAsset, setFromAsset] = useState('');
  const [toAsset, setToAsset] = useState('');

  useEffect(() => {
    const initAMM = async () => {
      try {
        const amm = new AMM();
        await amm.init();

        const reserve1 = await amm.getReserve1();
        const reserve2 = await amm.getReserve2();

        setReserve1(reserve1);
        setReserve2(reserve2);
      } catch (error) {
        console.error('Failed to initialize AMM:', error);
      }
    };

    initAMM();
  }, []);

  const handleAddLiquidity = async () => {
    try {
      const amm = new AMM();
      await amm.init();

      await amm.addLiquidity(amount1, amount2);
      setAmount1('');
      setAmount2('');
      // Refresh reserves
      const reserve1 = await amm.getReserve1();
      const reserve2 = await amm.getReserve2();
      setReserve1(reserve1);
      setReserve2(reserve2);
    } catch (error) {
      console.error('Failed to add liquidity:', error);
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      const amm = new AMM();
      await amm.init();

      await amm.removeLiquidity(liquidity);
      setLiquidity('');
      // Refresh reserves
      const reserve1 = await amm.getReserve1();
      const reserve2 = await amm.getReserve2();
      setReserve1(reserve1);
      setReserve2(reserve2);
    } catch (error) {
      console.error('Failed to remove liquidity:', error);
    }
  };

  const handleSwap = async () => {
    try {
      const amm = new AMM();
      await amm.init();

      await amm.swap(fromAsset, toAsset, amount1);
      setFromAsset('');
      setToAsset('');
      setAmount1('');
      // Refresh reserves
      const reserve1 = await amm.getReserve1();
      const reserve2 = await amm.getReserve2();
      setReserve1(reserve1);
      setReserve2(reserve2);
    } catch (error) {
      console.error('Failed to swap:', error);
    }
  };

  return (
    <div>
      <h1>Automated Market Maker</h1>
      <h2>Reserves:</h2>
      <p>Asset 1: {reserve1}</p>
      <p>Asset 2: {reserve2}</p>
      <h2>Add Liquidity:</h2>
      <input
        type="text"
        value={amount1}
        onChange={(e) => setAmount1(e.target.value)}
        placeholder="Amount 1"
      />
      <input
        type="text"
        value={amount2}
        onChange={(e) => setAmount2(e.target.value)}
        placeholder="Amount 2"
      />
      <button onClick={handleAddLiquidity}>Add Liquidity</button>
      <h2>Remove Liquidity:</h2>
      <input
        type="text"
        value={liquidity}
        onChange={(e) => setLiquidity(e.target.value)}
        placeholder="Liquidity"
      />
      <button onClick={handleRemoveLiquidity}>Remove Liquidity</button>
      <h2>Swap:</h2>
      <input
        type="text"
        value={fromAsset}
        onChange={(e) => setFromAsset(e.target.value)}
        placeholder="From Asset"
      />
      <input
        type="text"
        value={toAsset}
        onChange={(e) => setToAsset(e.target.value)}
        placeholder="To Asset"
      />
      <input
        type="text"
        value={amount1}
        onChange={(e) => setAmount1(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
}

export default App;
