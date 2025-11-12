import React, { useState } from 'react';
import File from './File';

const Folder = ({ name, content, onFileClick, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getFolderIcon = () => {
    return isOpen ? '📂' : '📁';
  };

  return (
    <div style={{ marginLeft: level * 15 }}>
      {/* Folder Header */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          cursor: 'pointer',
          padding: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          margin: '2px 0',
          borderRadius: '3px'
        }}
     
      >
        <span style={{ marginRight: '8px', fontSize: '16px' }}>
          {getFolderIcon()}
        </span>
        <span>{name}</span>
      </div>
      
      {/* Folder Contents */}
      {isOpen && content.children && (
        <div style={{ borderLeft: '1px dotted #ccc', marginLeft: '10px' }}>
          {Object.entries(content.children).map(([itemName, item]) => 
            item.type === 'folder' ? (
              <Folder 
                key={itemName}
                name={itemName}
                content={item}
                onFileClick={onFileClick}
                level={level + 1}
              />
            ) : (
              <File 
                key={itemName}
                name={itemName}
                fileData={item}
                onFileClick={onFileClick}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Folder; // Make sure this line is here!