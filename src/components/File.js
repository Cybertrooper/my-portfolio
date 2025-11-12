import React from 'react';

const File = ({ name, fileData, onFileClick }) => {
  const getFileIcon = (type) => {
    switch (type) {
      case 'text':
        return '📄';
      case 'image':
        return '🖼️';
      case 'application':
        return '⚙️';
      default:
        return '📄';
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 8px',
        cursor: 'pointer',
        margin: '2px 0',
        borderRadius: '3px'
      }}
      onDoubleClick={() => onFileClick(name, fileData)}
    
    >
      <span style={{ marginRight: '8px', fontSize: '16px' }}>
        {getFileIcon(fileData.icon)}
      </span>
      <span>{name}</span>
    </div>
  );
};

export default File; // Make sure this line is here!