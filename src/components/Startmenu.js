import React, { useState } from 'react';

const StartMenu = ({ isOpen, onClose, onProgramClick, onProjectClick }) => {
  const [showProgramsSubmenu, setShowProgramsSubmenu] = useState(false);
  const [showProjectsSubmenu, setShowProjectsSubmenu] = useState(false);
  const [showDocumentsSubmenu, setShowDocumentsSubmenu] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '28px',
        left: '0',
        width: '220px',
        backgroundColor: '#c0c0c0',
        border: '2px outset #dfdfdf',
        zIndex: 2000,
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        fontSize: '11px'
      }}
      onClick={(e) => e.stopPropagation()}
    >
    

      {/* Menu Items */}
      <div style={{ padding: '2px 0', position: 'relative' }}>
        
        {/* Programs with Submenu */}
        <div 
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
          onMouseEnter={() => setShowProgramsSubmenu(true)}
          onMouseLeave={() => setShowProgramsSubmenu(false)}
        >
          <span>Programs</span>
          <span>▶</span>
          
          {/* Programs Submenu */}
          {showProgramsSubmenu && (
            <div 
              style={{
                position: 'absolute',
                left: '218px',
                top: '0',
                width: '160px',
                backgroundColor: '#c0c0c0',
                border: '2px outset #dfdfdf',
                zIndex: 2001
              }}
              onMouseEnter={() => setShowProgramsSubmenu(true)}
              onMouseLeave={() => setShowProgramsSubmenu(false)}
            >
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProgramClick('Notepad')}
              >
                📝 Notepad
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProgramClick('Calculator')}
              >
                🧮 Calculator
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProgramClick('Paint')}
              >
                🎨 Paint
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProgramClick('Internet Explorer')}
              >
                🌐 Internet Explorer
              </div>
            </div>
          )}
        </div>

        {/* Documents with Submenu */}
        <div 
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
          onMouseEnter={() => setShowDocumentsSubmenu(true)}
          onMouseLeave={() => setShowDocumentsSubmenu(false)}
        >
          <span>Documents</span>
          <span>▶</span>
          
          {/* Documents Submenu */}
          {showDocumentsSubmenu && (
            <div 
              style={{
                position: 'absolute',
                left: '218px',
                top: '0',
                width: '180px',
                backgroundColor: '#c0c0c0',
                border: '2px outset #dfdfdf',
                zIndex: 2001
              }}
              onMouseEnter={() => setShowDocumentsSubmenu(true)}
              onMouseLeave={() => setShowDocumentsSubmenu(false)}
            >
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProjectClick('About Me.txt')}
              >
                📄 About Me.txt
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProjectClick('Contact Info.txt')}
              >
                📄 Contact Info.txt
              </div>
            </div>
          )}
        </div>

        {/* Projects Submenu */}
        <div 
          style={{
            padding: '4px 8px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative'
          }}
          onMouseEnter={() => setShowProjectsSubmenu(true)}
          onMouseLeave={() => setShowProjectsSubmenu(false)}
        >
          <span>My Projects</span>
          <span>▶</span>
          
          {/* Projects Submenu */}
          {showProjectsSubmenu && (
            <div 
              style={{
                position: 'absolute',
                left: '218px',
                top: '0',
                width: '180px',
                backgroundColor: '#c0c0c0',
                border: '2px outset #dfdfdf',
                zIndex: 2001
              }}
              onMouseEnter={() => setShowProjectsSubmenu(true)}
              onMouseLeave={() => setShowProjectsSubmenu(false)}
            >
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProjectClick('Applications')}
              >
                📁 Applications
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProjectClick('Websites')}
              >
                📁 Websites
              </div>
              <div 
                style={{
                  padding: '4px 8px',
                  cursor: 'pointer'
                }}
             //
                onClick={() => onProjectClick('Graphic Design')}
              >
                📁 Graphic Design
              </div>
            </div>
          )}
        </div>

        {/* Favorites */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
       //
        >
          <span>Favorites</span>
          <span>▶</span>
        </div>

        {/* Settings */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer'
        }}
       //
        >
          <span>Settings</span>
        </div>

        {/* Find */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer'
        }}
       
        >
          <span>Find</span>
        </div>

        {/* Help */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer'
        }}
    
        >
          <span>Help</span>
        </div>

        {/* Run */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      
        >
          <span>Run...</span>
        </div>

        {/* Separator */}
        <div style={{
          height: '2px',
          backgroundColor: '#808080',
          margin: '2px 0'
        }}></div>

        {/* Shut Down */}
        <div style={{
          padding: '4px 8px',
          cursor: 'pointer'
        }}
      
        onClick={() => {
          if (window.confirm('Are you sure you want to shut down?')) {
            alert('Windows is now shutting down...');
          }
        }}
        >
          <span>Shut Down...</span>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;