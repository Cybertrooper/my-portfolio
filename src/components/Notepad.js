import React, { useState } from 'react';

const Notepad = ({ onClose }) => {
  const [text, setText] = useState('Welcome to Notepad!\n\nYou can type anything here...\n\nThis is your personal notepad application.');

  return (
    <div 
      className="window"
      style={{
        position: 'absolute',
        left: '100px',
        top: '100px',
        width: '500px',
        height: '400px',
        zIndex: 1000
      }}
    >
      {/* Window Header */}
      <div className="window-header">
        <span>Notepad</span>
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
        <div style={{ marginRight: '15px', cursor: 'pointer' }}>Search</div>
        <div style={{ cursor: 'pointer' }}>Help</div>
      </div>
      
      {/* Text Area */}
      <div className="window-content" style={{ padding: '0', height: 'calc(100% - 60px)' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            padding: '8px',
            boxSizing: 'border-box'
          }}
          placeholder="Type your text here..."
        />
      </div>
      
      {/* Status Bar */}
      <div 
        style={{
          backgroundColor: '#c0c0c0',
          borderTop: '1px solid #808080',
          padding: '2px 5px',
          fontSize: '11px',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span>Ln 1, Col 1</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default Notepad;