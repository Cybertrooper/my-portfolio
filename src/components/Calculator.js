import React, { useState } from 'react';

const Calculator = ({ onClose }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div 
      className="window"
      style={{
        position: 'absolute',
        left: '150px',
        top: '150px',
        width: '200px',
        zIndex: 1000
      }}
    >
      {/* Window Header */}
      <div className="window-header">
        <span>Calculator</span>
        <button 
          onClick={onClose}
          style={{
            backgroundColor: '#c0c0c0',
            border: '2px outset #dfdfdf',
            cursor: 'pointer',
            width: '18px',
            height: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
      </div>
      
      {/* Calculator Display */}
      <div className="window-content" style={{ padding: '8px' }}>
        <div style={{
          backgroundColor: 'white',
          border: '2px inset #dfdfdf',
          padding: '4px 8px',
          textAlign: 'right',
          fontSize: '18px',
          fontFamily: 'Courier New, monospace',
          marginBottom: '8px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}>
          {display}
        </div>
        
        {/* Calculator Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px'
        }}>
          {/* Row 1 */}
          <button onClick={clear} style={calcButtonStyle}>C</button>
          <button onClick={() => inputOperation('/')} style={calcButtonStyle}>/</button>
          <button onClick={() => inputOperation('*')} style={calcButtonStyle}>*</button>
          <button onClick={() => inputOperation('-')} style={calcButtonStyle}>-</button>
          
          {/* Row 2 */}
          <button onClick={() => inputNumber(7)} style={calcButtonStyle}>7</button>
          <button onClick={() => inputNumber(8)} style={calcButtonStyle}>8</button>
          <button onClick={() => inputNumber(9)} style={calcButtonStyle}>9</button>
          <button onClick={() => inputOperation('+')} style={{...calcButtonStyle, gridRow: 'span 2'}}>+</button>
          
          {/* Row 3 */}
          <button onClick={() => inputNumber(4)} style={calcButtonStyle}>4</button>
          <button onClick={() => inputNumber(5)} style={calcButtonStyle}>5</button>
          <button onClick={() => inputNumber(6)} style={calcButtonStyle}>6</button>
          
          {/* Row 4 */}
          <button onClick={() => inputNumber(1)} style={calcButtonStyle}>1</button>
          <button onClick={() => inputNumber(2)} style={calcButtonStyle}>2</button>
          <button onClick={() => inputNumber(3)} style={calcButtonStyle}>3</button>
          <button onClick={performCalculation} style={{...calcButtonStyle, gridRow: 'span 2'}}>=</button>
          
          {/* Row 5 */}
          <button onClick={() => inputNumber(0)} style={{...calcButtonStyle, gridColumn: 'span 2'}}>0</button>
          <button onClick={inputDecimal} style={calcButtonStyle}>.</button>
        </div>
      </div>
    </div>
  );
};

const calcButtonStyle = {
  padding: '8px 4px',
  border: '2px outset #dfdfdf',
  backgroundColor: '#c0c0c0',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: 'bold',
  minHeight: '30px'
};

export default Calculator;