import React, { useState, useRef, useEffect } from 'react';

const Window = ({ 
  title, 
  content, 
  onClose, 
  onMinimize, 
  isMinimized = false,
  position = { x: 100, y: 100 },
  onFileDoubleClick,
  onFolderDoubleClick
}) => {
  const [windowPosition, setWindowPosition] = useState(position);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 500, height: 400 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 500, height: 400 });
  const [originalPosition, setOriginalPosition] = useState(position);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  
  const windowRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setWindowPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      } else if (isResizing) {
        const newSize = { ...windowSize };
        const newPosition = { ...windowPosition };
        
        switch (resizeDirection) {
          case 'n':
            const heightChange = windowPosition.y - e.clientY;
            newSize.height = Math.max(300, windowSize.height + heightChange);
            newPosition.y = e.clientY;
            break;
          case 's':
            newSize.height = Math.max(300, e.clientY - windowPosition.y);
            break;
          case 'e':
            newSize.width = Math.max(400, e.clientX - windowPosition.x);
            break;
          case 'w':
            const widthChange = windowPosition.x - e.clientX;
            newSize.width = Math.max(400, windowSize.width + widthChange);
            newPosition.x = e.clientX;
            break;
          case 'ne':
            const neHeightChange = windowPosition.y - e.clientY;
            newSize.height = Math.max(300, windowSize.height + neHeightChange);
            newSize.width = Math.max(400, e.clientX - windowPosition.x);
            newPosition.y = e.clientY;
            break;
          case 'nw':
            const nwHeightChange = windowPosition.y - e.clientY;
            const nwWidthChange = windowPosition.x - e.clientX;
            newSize.height = Math.max(300, windowSize.height + nwHeightChange);
            newSize.width = Math.max(400, windowSize.width + nwWidthChange);
            newPosition.y = e.clientY;
            newPosition.x = e.clientX;
            break;
          case 'se':
            newSize.height = Math.max(300, e.clientY - windowPosition.y);
            newSize.width = Math.max(400, e.clientX - windowPosition.x);
            break;
          case 'sw':
            const swWidthChange = windowPosition.x - e.clientX;
            newSize.height = Math.max(300, e.clientY - windowPosition.y);
            newSize.width = Math.max(400, windowSize.width + swWidthChange);
            newPosition.x = e.clientX;
            break;
          default:
            break;
        }
        
        setWindowSize(newSize);
        setWindowPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeDirection(null);
    };

    const handleClickOutside = () => {
      setContextMenu({ visible: false, x: 0, y: 0 });
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDragging, isResizing, dragOffset, windowSize, windowPosition, resizeDirection]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleResizeMouseDown = (e, direction) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setWindowSize(originalSize);
      setWindowPosition(originalPosition);
    } else {
      setOriginalSize(windowSize);
      setOriginalPosition(windowPosition);
      setWindowSize({
        width: window.innerWidth - 40,
        height: window.innerHeight - 80
      });
      setWindowPosition({ x: 20, y: 20 });
    }
    setIsMaximized(!isMaximized);
  };

  const handleClose = () => {
    onClose();
  };

  const handleMinimize = () => {
    if (onMinimize) {
      onMinimize();
    }
  };

  const nextImage = () => {
    if (content.content?.images) {
      setCurrentImageIndex((prev) => 
        prev === content.content.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (content.content?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? content.content.images.length - 1 : prev - 1
      );
    }
  };

  const contextMenuItems = [
    {
      label: 'Restore',
      action: () => {
        if (isMaximized) toggleMaximize();
        if (isMinimized && onMinimize) onMinimize();
      },
      disabled: !isMaximized && !isMinimized
    },
    {
      label: 'Move',
      action: () => {
        setIsDragging(true);
      }
    },
    {
      label: 'Size',
      action: () => {
        // Enable resize from bottom-right
        setIsResizing(true);
        setResizeDirection('se');
      }
    },
    { label: 'Minimize', action: handleMinimize },
    { label: 'Maximize', action: toggleMaximize },
    { type: 'separator' },
    { label: 'Close', action: handleClose }
  ];

  const renderContent = () => {
    if (!content) return <div>Select a file to view</div>;
    
    if (content.isFolder) {
      return (
        <div onContextMenu={handleContextMenu}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Contents of {title}</h3>
          <div style={{ 
            border: '1px inset #dfdfdf', 
            padding: '10px',
            backgroundColor: 'white',
            minHeight: '200px',
            overflow: 'auto'
          }}>
            {content.children && Object.entries(content.children).map(([itemName, item]) => 
              item.type === 'folder' ? (
                <div 
                  key={itemName} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    borderRadius: '3px'
                  }}
                  onDoubleClick={() => {
                    if (onFolderDoubleClick) {
                      onFolderDoubleClick(itemName, item);
                    }
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>📁</span>
                  <div>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{itemName}</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>
                      {item.description || 'Folder containing files'}
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  key={itemName} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px', 
                    cursor: 'pointer',
                    borderBottom: '1px solid #f0f0f0',
                    borderRadius: '3px'
                  }}
                  onDoubleClick={() => {
                    if (onFileDoubleClick) {
                      onFileDoubleClick(itemName, item);
                    }
                  }}
                >
                  <span style={{ marginRight: '12px', fontSize: '20px' }}>
                    {item.icon === 'application' ? '⚙️' : 
                     item.icon === 'text' ? '📄' : 
                     item.icon === 'image' ? '🖼️' : '📁'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '13px' }}>{itemName}</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>
                      {item.description || 'Application file'}
                    </div>
                    {item.tech && (
                      <div style={{ fontSize: '10px', opacity: 0.7, marginTop: '2px' }}>
                        <strong>Tech:</strong> {item.tech.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      );
    }
    
    if (content.icon === 'text' && content.content) {
      return (
        <div 
          style={{ 
            padding: '15px',
            backgroundColor: 'white',
            height: '100%',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.4',
            overflow: 'auto',
            boxSizing: 'border-box'
          }}
          onContextMenu={handleContextMenu}
        >
          {content.content}
        </div>
      );
    }
    
    if (content.icon === 'image') {
      return (
        <div 
          style={{ 
            padding: '15px',
            backgroundColor: 'white',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'auto'
          }}
          onContextMenu={handleContextMenu}
        >
          <div style={{
            width: '200px',
            height: '150px',
            backgroundColor: '#f0f0f0',
            border: '2px dashed #ccc',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            🖼️ Image Preview
          </div>
          <p style={{ marginTop: '15px', textAlign: 'center' }}>
            <strong>{title}</strong>
          </p>
          {content.description && (
            <p style={{ textAlign: 'center', marginTop: '5px' }}>
              {content.description}
            </p>
          )}
        </div>
      );
    }
    
    if (content.icon === 'application' && content.content) {
      const appData = content.content;
      const images = appData.images || (appData.image ? [appData.image] : []);
      const hasImages = images.length > 0;

      return (
        <div style={{ height: '100%', overflow: 'auto', padding: '15px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '20px',
            borderBottom: '2px solid #000080',
            paddingBottom: '15px'
          }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              marginRight: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
              border: '2px solid #c0c0c0',
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              {hasImages ? (
                <img 
                  src={images[0]} 
                  alt={appData.title}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}
              {!hasImages && (
                <div style={{ fontSize: '32px' }}>⚙️</div>
              )}
            </div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#000080' }}>
                {appData.title || title}
              </h2>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                {appData.description}
              </p>
            </div>
          </div>

          {appData.features && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#000080', marginBottom: '10px' }}>✨ Key Features</h3>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '10px',
                marginBottom: '15px'
              }}>
                {appData.features.map((feature, index) => (
                  <div key={index} style={{
                    padding: '8px 12px',
                    backgroundColor: '#f0f8ff',
                    border: '1px solid #c0c0c0',
                    borderRadius: '3px',
                    fontSize: '12px'
                  }}>
                    • {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          {appData.tech && (
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#000080', marginBottom: '10px' }}>🛠️ Technology Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {appData.tech.frontend && (
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '13px' }}>Frontend</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {appData.tech.frontend.map((tech, index) => (
                        <span key={index} style={{
                          padding: '3px 8px',
                          backgroundColor: '#e3f2fd',
                          border: '1px solid #90caf9',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {appData.tech.backend && (
                  <div style={{ flex: '1', minWidth: '200px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '13px' }}>Backend</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {appData.tech.backend.map((tech, index) => (
                        <span key={index} style={{
                          padding: '3px 8px',
                          backgroundColor: '#f3e5f5',
                          border: '1px solid #ce93d8',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {Object.entries(appData.tech).map(([category, technologies]) => 
                !['frontend', 'backend'].includes(category) && (
                  <div key={category} style={{ marginTop: '10px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', textTransform: 'capitalize' }}>
                      {category.replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {technologies.map((tech, index) => (
                        <span key={index} style={{
                          padding: '3px 8px',
                          backgroundColor: '#e8f5e8',
                          border: '1px solid #a5d6a7',
                          borderRadius: '12px',
                          fontSize: '11px'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginBottom: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {appData.playStore && (
              <button 
                style={{ 
                  padding: '10px 20px', 
                  border: '2px outset #dfdfdf',
                  backgroundColor: '#34A853',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onClick={() => window.open(appData.playStore, '_blank')}
              >
                <span style={{ fontSize: '16px' }}>📱</span>
                Google Play Store
              </button>
            )}
            {appData.liveDemo && (
              <button 
                style={{ 
                  padding: '10px 20px', 
                  border: '2px outset #dfdfdf',
                  backgroundColor: '#000080',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
                onClick={() => window.open(appData.liveDemo, '_blank')}
              >
                🌐 Live Demo
              </button>
            )}
            {appData.github && (
              <button 
                style={{ 
                  padding: '10px 20px', 
                  border: '2px outset #dfdfdf',
                  backgroundColor: '#333',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '12px'
                }}
                onClick={() => window.open(appData.github, '_blank')}
              >
                💻 GitHub
              </button>
            )}
            {appData.status && (
              <div style={{
                padding: '8px 16px',
                backgroundColor: '#e8f5e8',
                border: '1px solid #4CAF50',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#2E7D32',
                fontWeight: 'bold'
              }}>
                ✅ {appData.status}
              </div>
            )}
          </div>

          <div style={{
            backgroundColor: '#f8f8f8',
            border: '1px inset #dfdfdf',
            padding: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#000080' }}>📱 Application Screenshots</h3>
            
            <div style={{
              width: '100%',
              height: '300px',
              backgroundColor: '#e0e0e0',
              border: '2px solid #c0c0c0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              marginBottom: '15px',
              position: 'relative'
            }}>
              {hasImages ? (
                <>
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${appData.title} screenshot ${currentImageIndex + 1}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain' 
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{
                          position: 'absolute',
                          left: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ‹
                      </button>
                      <button
                        onClick={nextImage}
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          cursor: 'pointer',
                          fontSize: '18px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        ›
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '10px' }}>🖼️</div>
                  No screenshots available
                </div>
              )}
            </div>

            {hasImages && images.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '10px'
              }}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: index === currentImageIndex ? '#000080' : '#c0c0c0',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            )}

            <p style={{ margin: '10px 0', fontSize: '12px', color: '#999' }}>
              {hasImages 
                ? `Screenshot ${currentImageIndex + 1} of ${images.length}` 
                : 'Add screenshots to showcase your application'
              }
            </p>

            {appData.note && (
              <div style={{
                padding: '10px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '4px',
                fontSize: '11px',
                color: '#856404',
                marginTop: '10px'
              }}>
                💡 {appData.note}
              </div>
            )}
          </div>
        </div>
      );
    }
    
    return (
      <div 
        style={{ height: '100%', overflow: 'auto' }}
        onContextMenu={handleContextMenu}
      >
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>{title}</h3>
        <div style={{ 
          padding: '15px',
          backgroundColor: '#f8f8f8',
          border: '1px inset #dfdfdf',
          textAlign: 'center'
        }}>
          <p><strong>File Type:</strong> {content.icon || 'Unknown'}</p>
          {content.description && (
            <p><strong>Description:</strong> {content.description}</p>
          )}
          <div style={{ marginTop: '20px', fontSize: '32px' }}>
            {content.icon === 'text' ? '📄' : 
             content.icon === 'image' ? '🖼️' : 
             content.icon === 'application' ? '⚙️' : '📁'}
          </div>
        </div>
      </div>
    );
  };

  if (isMinimized) return null;

  return (
    <>
      <div 
        ref={windowRef}
        className="window"
        style={{
          left: windowPosition.x,
          top: windowPosition.y,
          width: isMaximized ? 'calc(100vw - 40px)' : `${windowSize.width}px`,
          height: isMaximized ? 'calc(100vh - 80px)' : `${windowSize.height}px`,
          zIndex: 1000,
          position: 'absolute',
          cursor: isDragging ? 'grabbing' : 'default',
          display: 'flex',
          flexDirection: 'column',
          minWidth: '400px',
          minHeight: '300px'
        }}
        onContextMenu={handleContextMenu}
      >
        <div 
          className="window-header"
          onMouseDown={handleMouseDown}
          onDoubleClick={toggleMaximize}
          style={{
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#000080',
            color: 'white',
            padding: '3px 5px',
            fontWeight: 'bold',
            fontSize: '13px'
          }}
        >
          <span>{title}</span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button 
              onClick={handleMinimize}
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
                fontWeight: 'bold',
                lineHeight: '1'
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              _
            </button>
            
            <button 
              onClick={toggleMaximize}
              style={{
                backgroundColor: '#c0c0c0',
                border: '2px outset #dfdfdf',
                cursor: 'pointer',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold'
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {isMaximized ? '🗗' : '🗖'}
            </button>
            
            <button 
              onClick={handleClose}
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
              onMouseDown={(e) => e.stopPropagation()}
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="window-content" style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
          backgroundColor: 'white',
          border: '2px inset #dfdfdf',
          margin: '1px'
        }}>
          {renderContent()}
        </div>
        
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
          <span>1 object</span>
          <span>{isDragging ? 'Dragging...' : isResizing ? 'Resizing...' : isMaximized ? 'Maximized' : 'Ready'}</span>
        </div>

        {/* Resize Handles */}
        {!isMaximized && (
          <>
            {/* Top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 5,
                right: 5,
                height: 5,
                cursor: 'n-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'n')}
            />
            {/* Bottom */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 5,
                right: 5,
                height: 5,
                cursor: 's-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 's')}
            />
            {/* Left */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 5,
                bottom: 5,
                width: 5,
                cursor: 'w-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'w')}
            />
            {/* Right */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 5,
                bottom: 5,
                width: 5,
                cursor: 'e-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'e')}
            />
            {/* Top-Left */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 8,
                height: 8,
                cursor: 'nw-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'nw')}
            />
            {/* Top-Right */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 8,
                height: 8,
                cursor: 'ne-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'ne')}
            />
            {/* Bottom-Left */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 8,
                height: 8,
                cursor: 'sw-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'sw')}
            />
            {/* Bottom-Right */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 8,
                height: 8,
                cursor: 'se-resize'
              }}
              onMouseDown={(e) => handleResizeMouseDown(e, 'se')}
            />
          </>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu.visible && (
        <>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 2000
            }}
            onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
          />
          <div 
            style={{
              position: 'fixed',
              left: contextMenu.x,
              top: contextMenu.y,
              backgroundColor: '#c0c0c0',
              border: '2px solid',
              borderTopColor: '#dfdfdf',
              borderLeftColor: '#dfdfdf',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              padding: '2px',
              zIndex: 2001,
              minWidth: '150px',
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)'
            }}
          >
            {contextMenuItems.map((item, index) => (
              item.type === 'separator' ? (
                <div 
                  key={index}
                  style={{
                    height: '1px',
                    backgroundColor: '#808080',
                    margin: '2px 0'
                  }}
                />
              ) : (
                <div
                  key={index}
                  style={{
                    padding: '4px 20px 4px 25px',
                    fontSize: '13px',
                    cursor: item.disabled ? 'default' : 'pointer',
                    color: item.disabled ? '#808080' : 'black',
                    backgroundColor: 'transparent',
                    position: 'relative'
                  }}
                  onClick={() => !item.disabled && item.action()}
                >
                  {item.label}
                </div>
              )
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Window;