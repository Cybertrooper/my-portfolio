import React, { useState, useRef, useEffect } from 'react';

const Paint = ({ onClose }) => {
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 300;
    
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF'
  ];

  return (
    <div 
      className="window"
      style={{
        position: 'absolute',
        left: '100px',
        top: '100px',
        width: '450px',
        zIndex: 1000
      }}
    >
      {/* Window Header */}
      <div className="window-header">
        <span>Paint</span>
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
      
      {/* Menu Bar */}
      <div style={{
        backgroundColor: '#c0c0c0',
        borderBottom: '1px solid #808080',
        padding: '2px 4px',
        display: 'flex',
        fontSize: '11px'
      }}>
        <div style={{ marginRight: '15px', cursor: 'pointer' }}>File</div>
        <div style={{ marginRight: '15px', cursor: 'pointer' }}>Edit</div>
        <div style={{ marginRight: '15px', cursor: 'pointer' }}>View</div>
        <div style={{ cursor: 'pointer' }}>Help</div>
      </div>
      
      {/* Toolbox */}
      <div style={{
        display: 'flex',
        padding: '8px',
        backgroundColor: '#c0c0c0',
        borderBottom: '1px solid #808080',
        gap: '10px',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Colors:</span>
        {colors.map((colorValue) => (
          <div
            key={colorValue}
            onClick={() => setColor(colorValue)}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: colorValue,
              border: color === colorValue ? '2px solid #000' : '1px solid #808080',
              cursor: 'pointer'
            }}
          />
        ))}
        
        <span style={{ fontSize: '11px', fontWeight: 'bold', marginLeft: '10px' }}>Size:</span>
        <select 
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          style={{ fontSize: '11px' }}
        >
          <option value={2}>Small</option>
          <option value={5}>Medium</option>
          <option value={10}>Large</option>
        </select>
        
        <button 
          onClick={clearCanvas}
          style={{
            marginLeft: 'auto',
            padding: '4px 8px',
            border: '2px outset #dfdfdf',
            backgroundColor: '#c0c0c0',
            fontSize: '11px',
            cursor: 'pointer'
          }}
        >
          Clear
        </button>
      </div>
      
      {/* Canvas */}
      <div className="window-content" style={{ padding: '8px' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            border: '2px inset #dfdfdf',
            backgroundColor: 'white',
            cursor: 'crosshair',
            width: '100%',
            height: '300px'
          }}
        />
      </div>
      
      {/* Status Bar */}
      <div 
        style={{
          backgroundColor: '#c0c0c0',
          borderTop: '1px solid #808080',
          padding: '2px 5px',
          fontSize: '11px'
        }}
      >
        <span>Ready</span>
      </div>
    </div>
  );
};

export default Paint;