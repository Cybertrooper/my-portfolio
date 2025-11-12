import React, { useState, useRef } from 'react';

const InternetExplorer = ({ onClose }) => {
  const [url, setUrl] = useState('https://www.wikipedia.org/');
  const [currentUrl, setCurrentUrl] = useState('https://www.wikipedia.org/');
  const [history, setHistory] = useState(['https://www.wikipedia.org/']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 150, y: 150 });
  const [windowSize, setWindowSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iframeRef = useRef(null);
  const windowRef = useRef(null);

  // List of sites that generally work in iframes
  const workingSites = [
    'bing.com',
    'wikipedia.org',
    'github.com',
    'stackoverflow.com',
    'reddit.com',
    'youtube.com',
    'archive.org',
    'example.com',
    'httpbin.org',
    'aleph-it.com',
    'greenenergyac.com',
    'stouffvilleapothecary.com',
    'energyind.ae'
  ];

  // Window dragging functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMaximized) return;
    setWindowPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleMaximize = () => {
    if (isMaximized) {
      // Restore to original size and position
      setIsMaximized(false);
    } else {
      // Maximize to full screen
      setIsMaximized(true);
    }
  };

  const handleNavigate = () => {
    if (!url) return;
    
    setError(null);
    setIsLoading(true);
    
    // Add http:// if missing
    let fullUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      fullUrl = 'https://' + url;
    }
    
    // Check if site is likely to work
    const domain = fullUrl.replace('https://', '').replace('http://', '').split('/')[0];
    const isLikelyToWork = workingSites.some(site => domain.includes(site));
    
    if (!isLikelyToWork) {
      setError(`This website (${domain}) may not allow embedding. Try one of the project sites.`);
      setIsLoading(false);
      return;
    }

    setCurrentUrl(fullUrl);
    setUrl(fullUrl);
    
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(fullUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleNavigate();
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrl(history[newIndex]);
      setIsLoading(true);
      setError(null);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setUrl(history[newIndex]);
      setIsLoading(true);
      setError(null);
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
      setIsLoading(true);
      setError(null);
    }
  };

  const goHome = () => {
    setIsLoading(true);
    setError(null);
    setCurrentUrl('https://www.wikipedia.org/');
    setUrl('https://www.wikipedia.org/');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError('Failed to load this website. It may block embedding for security reasons.');
  };

  const quickSites = [
    { name: 'Aleph-it', url: 'https://aleph-it.com/' },
    { name: 'Green Energy', url: 'https://greenenergyac.com/' },
    { name: 'Stoufille Apothecary', url: 'https://stouffvilleapothecary.com/' },
   
  ];

  return (
    <div 
      ref={windowRef}
      className="window"
      style={{
        position: 'absolute',
        left: isMaximized ? '0' : `${windowPosition.x}px`,
        top: isMaximized ? '0' : `${windowPosition.y}px`,
        width: isMaximized ? '100vw' : `${windowSize.width}px`,
        height: isMaximized ? '100vh' : `${windowSize.height}px`,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Window Header */}
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
          alignItems: 'center'
        }}
      >
        <span>Internet Explorer - {currentUrl.replace('https://', '').replace('http://', '').split('/')[0]}</span>
        <div style={{ display: 'flex', gap: '2px' }}>
          {/* Maximize Button */}
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
          
          {/* Close Button */}
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
            onMouseDown={(e) => e.stopPropagation()}
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Menu Bar */}
      <div style={{
        backgroundColor: '#c0c0c0',
        borderBottom: '1px solid #808080',
        padding: '2px 4px',
        display: 'flex',
        fontSize: '11px',
        gap: '15px'
      }}>
        <div style={{ cursor: 'pointer' }}>File</div>
        <div style={{ cursor: 'pointer' }}>Edit</div>
        <div style={{ cursor: 'pointer' }}>View</div>
        <div style={{ cursor: 'pointer' }}>Go</div>
        <div style={{ cursor: 'pointer' }}>Favorites</div>
        <div style={{ cursor: 'pointer' }}>Help</div>
      </div>

      {/* Toolbar */}
      <div style={{
        backgroundColor: '#c0c0c0',
        borderBottom: '1px solid #808080',
        padding: '4px 8px',
        display: 'flex',
        gap: '4px',
        alignItems: 'center'
      }}>
        <button 
          onClick={goBack}
          disabled={historyIndex === 0}
          style={{
            ...ieButtonStyle,
            opacity: historyIndex === 0 ? 0.5 : 1,
            cursor: historyIndex === 0 ? 'default' : 'pointer'
          }}
        >
          ← Back
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex === history.length - 1}
          style={{
            ...ieButtonStyle,
            opacity: historyIndex === history.length - 1 ? 0.5 : 1,
            cursor: historyIndex === history.length - 1 ? 'default' : 'pointer'
          }}
        >
          Forward →
        </button>
        <button 
          onClick={refresh}
          style={ieButtonStyle}
        >
          🔄 Refresh
        </button>
        <button 
          onClick={goHome}
          style={ieButtonStyle}
        >
          🏠 Home
        </button>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginLeft: '10px',
          flex: 1
        }}>
          <span style={{ fontSize: '11px', marginRight: '5px' }}>Address:</span>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              border: '2px inset #dfdfdf',
              padding: '2px 4px',
              fontSize: '11px',
              fontFamily: 'Arial, sans-serif'
            }}
            placeholder="Enter URL here"
          />
          <button 
            onClick={handleNavigate}
            style={{
              ...ieButtonStyle,
              marginLeft: '4px'
            }}
          >
            Go
          </button>
        </div>
      </div>

      {/* Quick Sites Bar */}
      <div style={{
        backgroundColor: '#e8e8e8',
        borderBottom: '1px solid #808080',
        padding: '3px 8px',
        display: 'flex',
        gap: '10px',
        fontSize: '11px'
      }}>
        <span style={{ fontWeight: 'bold' }}>Project Sites:</span>
        {quickSites.map((site, index) => (
          <button
            key={index}
            onClick={() => {
              setUrl(site.url);
              setCurrentUrl(site.url);
              setIsLoading(true);
              setError(null);
            }}
            style={{
              border: '1px outset #dfdfdf',
              backgroundColor: '#c0c0c0',
              padding: '1px 6px',
              fontSize: '10px',
              cursor: 'pointer'
            }}
          >
            {site.name}
          </button>
        ))}
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div style={{
          height: '3px',
          backgroundColor: '#000080',
          width: '100%',
          animation: 'loading 2s infinite'
        }} />
      )}
      
      {/* Browser Content */}
      <div className="window-content" style={{ 
        padding: '0', 
        height: 'calc(100% - 95px)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {error && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐❌</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>
              Cannot display this webpage
            </div>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
              {error}
            </div>
            <div style={{ fontSize: '11px', color: '#999' }}>
              Try one of the project sites above
            </div>
          </div>
        )}
        
        {isLoading && !error && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🌐</div>
              <div style={{ fontSize: '14px' }}>Loading {currentUrl.replace('https://', '')}...</div>
            </div>
          </div>
        )}
        
        <iframe
          ref={iframeRef}
          src={currentUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: isLoading || error ? 'none' : 'block'
          }}
          title="Internet Explorer"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
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
        <span>
          {isLoading ? 'Loading...' : error ? 'Error' : 'Done'}
          {error && ` - ${error.split('.')[0]}`}
        </span>
        <span>{isMaximized ? 'Maximized' : 'Internet Zone'}</span>
      </div>
    </div>
  );
};

const ieButtonStyle = {
  padding: '3px 8px',
  border: '2px outset #dfdfdf',
  backgroundColor: '#c0c0c0',
  cursor: 'pointer',
  fontSize: '11px',
  minWidth: '60px',
  fontFamily: 'MS Sans Serif, Arial, sans-serif'
};

export default InternetExplorer;