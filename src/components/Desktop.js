import React, { useState } from 'react';
import Window from './Window';
import StartMenu from './Startmenu';
import Notepad from './Notepad';
import Calculator from './Calculator';
import Paint from './Paint';
import Spline from '@splinetool/react-spline';
import InternetExplorer from './InternetExplorer';

// Let's create some simple fake data structure that won't cause errors
const createSampleData = () => ({
  root: {
    "Applications": {
      type: "folder",
      children: {
        "Tab Collector": {
          type: "file",
          icon: "application",
          description: "Complete debt collection management system",
          tech: ["React Native", "SQLite", "Node.js", "Express"],
          content: {
            type: "application",
            title: "Tab Collector",
            description: "A mobile application that makes it easy for small shop owners and local businesses to manage customer debts ('on tab' purchases) without hassle. Keep everything organized, secure, and available offline—right on your phone.",
            features: [
              "📒 Track Customers & Tabs – Create customer profiles and record purchases, payments, and balances in one place",
              "💳 Payment Tracking – Record payments and automatically update customer balances",
              "📱 Offline Functionality – Access and manage data even without internet connection",
              "🔒 Secure Data Storage – Customer information and financial data protected",
              "📊 Balance Management – Real-time tracking of customer debts and credits",
              "🔔 Payment Reminders – Never forget outstanding balances",
              "📈 Business Analytics – Insights into your tab collection performance"
            ],
            tech: {
              frontend: ["React Native", "JavaScript", "Redux"],
              database: ["SQLite", "Local Storage"],
              mobile: ["Android", "iOS"],
              deployment: ["Google Play Store"]
            },
            images: [
              "/images/tab1.webp",
              "/images/tab2.webp",
              "/images/tab3.webp",
              "/images/tab4.webp"],
            playStore: "https://play.google.com/store/apps/details?id=com.alephinformationtechnology.tabcollector",
            status: "Live on Google Play Store"
          }
        },
        "Animal Adventures": {
          type: "file",
          icon: "application",
          description: "Educational app for children about animals and habitats",
          tech: ["React", "GIMP", "JavaScript", "CSS3"],
          content: {
            type: "application",
            title: "Animal Adventures",
            description: "An educational application targeted for children that teaches about animals, their habitats, sounds, and behaviors with 2D pixel animations that help children visualize the animals better.",
            features: [
              "🦁 Interactive Animal Learning – Explore different animals with detailed information",
              "🏞️ Habitat Exploration – Learn about where animals live and their environments",
              "🔊 Animal Sounds – Listen to authentic animal sounds and calls",
              "🎨 2D Pixel Animations – Engaging pixel art animations for better visualization",
              "📚 Educational Content – Age-appropriate information about animal behaviors",
              "🎮 Interactive Quizzes – Fun quizzes to reinforce learning",
              "👶 Child-Friendly Interface – Simple navigation designed for young children"
            ],
            tech: {
              frontend: ["React", "JavaScript", "CSS3", "HTML5"],
              design: ["GIMP", "Pixel Art", "2D Animation"],
              audio: ["Web Audio API", "Sound Effects"],
              deployment: ["Web Platform", "Mobile Responsive"]
            },
            images: [
              "/images/1.jpeg",
              "/images/2.jpeg", 
              "/images/3.jpeg",
              "/images/5.jpeg"
            ],
            status: "Development Complete - Ready for Deployment",
            note: "Built with React and custom 2D pixel art created in GIMP"
          }
        },
        "Savari": {
          type: "file",
          icon: "application",
          description: "Deal finder application with dual dashboards",
          tech: ["React", "Firebase", "FastAPI", "Node.js"],
          content: {
            type: "application",
            title: "Savari",
            description: "A comprehensive deal finder application with full Firebase integration, featuring separate dashboards for users and business owners, notifications, verification system, and real-time deal tracking.",
            features: [
              "🛍️ Deal Discovery – Find the best deals and discounts in your area",
              "👥 Dual Dashboards – Separate interfaces for users and business owners",
              "🔔 Smart Notifications – Get notified about new deals and promotions",
              "🔐 User Authentication – Secure login/signup with email verification",
              "✅ Business Verification – Verified business accounts for trust",
              "📊 Analytics Dashboard – Business owners can track deal performance",
              "📍 Location-Based Deals – Find deals relevant to your location"
            ],
            tech: {
              frontend: ["React", "Redux", "Styled Components"],
              backend: ["FastAPI", "Python", "Firebase Functions"],
              database: ["Firestore", "Firebase Auth", "Cloud Storage"],
              notifications: ["Firebase Cloud Messaging", "Push Notifications"],
              deployment: ["Firebase Hosting", "Cloud Run"]
            },
            images: [
              "/images/savari3.jpeg",
              "/images/savari2.jpeg",
              "/images/savari4.jpeg"
            ],
            status: "In Development",
            note: "Full-stack application with real-time features and dual user roles"
          }
        }
      }
    },
   "Websites": {
  "type": "folder",
  "children": {
    "Green Energy AC": {
      "type": "file",
      "icon": "application",
      "description": "HVAC and renewable energy solutions company website",
      "tech": ["HTML5", "CSS3", "JavaScript", "PHP"],
      "content": {
        "type": "application",
        "title": "Green Energy AC",
        "description": "A professional website for an HVAC and renewable energy solutions company, showcasing their services in air conditioning, heating, and sustainable energy solutions.",
        "features": [
          "🏢 Professional Business Website – Clean, modern design for HVAC company",
          "🌿 Renewable Energy Focus – Highlighting sustainable energy solutions",
          "📞 Contact & Quote System – Easy customer inquiry forms",
          "📱 Responsive Design – Optimized for all devices",
          "⚡ Fast Loading – Optimized performance for better user experience",
          "🎯 Service Showcase – Detailed presentation of HVAC services",
          "📍 Local Business Optimization – Geared towards local customers"
        ],
        "tech": {
          "frontend": ["HTML5", "CSS3", "JavaScript"],
          "backend": ["PHP"],
          "deployment": ["cPanel", "Shared Hosting"]
        },
        "liveDemo": "https://greenenergyac.com",
        "status": "Live & Active"
      }
    },
    "Aleph IT": {
      "type": "file",
      "icon": "application",
      "description": "Information technology services company website",
      "tech": ["React", "JavaScript", "CSS3", "Node.js"],
      "content": {
        "type": "application",
        "title": "Aleph IT",
        "description": "A comprehensive website for an IT services company offering technology solutions, software development, and IT consulting services to businesses.",
        "features": [
          "💻 IT Services Portfolio – Showcasing technology solutions and services",
          "🛠️ Service Catalog – Detailed IT service offerings",
          "📊 Case Studies – Client success stories and projects",
          "👥 Team Presentation – Company expertise and professionals",
          "📞 Consultation Booking – Service inquiry and contact system",
          "🌐 Multi-page Structure – Comprehensive business information",
          "🔒 Security Features – Secure contact forms and data handling"
        ],
        "tech": {
          "frontend": ["React", "JavaScript", "CSS3"],
          "backend": ["Node.js"],
          "deployment": ["Vercel", "Netlify"]
        },
        "liveDemo": "https://aleph-it.com",
        "status": "Live & Active"
      }
    },
    "Stouffville Apothecary": {
      "type": "file",
      "icon": "application",
      "description": "Pharmacy and healthcare services website",
      "tech": ["WordPress", "PHP", "JavaScript", "CSS3"],
      "content": {
        "type": "application",
        "title": "Stouffville Apothecary",
        "description": "A professional website for a local pharmacy offering healthcare services, prescription management, and health products with a focus on community care.",
        "features": [
          "💊 Pharmacy Services – Prescription management and healthcare services",
          "🏥 Health Information – Educational health content and resources",
          "📍 Local Community Focus – Serving local community needs",
          "📱 Mobile-Friendly – Accessible on all devices",
          "📞 Online Contact – Easy communication with pharmacy staff",
          "🕒 Service Hours – Clear business hour information",
          "🚗 Location & Directions – Easy to find physical location"
        ],
        "tech": {
          "platform": ["WordPress"],
          "frontend": ["PHP", "JavaScript", "CSS3", "Custom Theme"],
          "deployment": ["WordPress Hosting"]
        },
        "liveDemo": "https://stouffvilleapothecary.com",
        "status": "Live & Active"
      }
    },
    "The Vape Mart": {
      "type": "file",
      "icon": "application",
      "description": "Vape products and accessories e-commerce website",
      "tech": ["Shopify", "Liquid", "JavaScript", "CSS3"],
      "content": {
        "type": "application",
        "title": "The Vape Mart",
        "description": "An e-commerce website specializing in vape products, e-liquids, and accessories with product catalog, shopping cart, and online ordering capabilities.",
        "features": [
          "🛒 E-commerce Platform – Full online shopping experience",
          "📦 Product Catalog – Extensive vape products and accessories",
          "💳 Online Ordering – Secure checkout and payment processing",
          "🚚 Shipping Integration – Order tracking and delivery options",
          "📱 Responsive Store – Mobile-optimized shopping experience",
          "🔍 Product Search – Easy product discovery and filtering",
          "📞 Customer Support – Direct communication channels"
        ],
        "tech": {
          "platform": ["Shopify"],
          "frontend": ["Liquid", "JavaScript", "CSS3"],
          "payment": ["Shopify Payments"],
          "deployment": ["Shopify Hosting"]
        },
        "liveDemo": "https://thevapemart.ca",
        "status": "Live & Active"
      }
    },
    "Kiwi Stores": {
      "type": "file",
      "icon": "application",
      "description": "Multi-vendor e-commerce marketplace platform",
      "tech": ["WordPress", "WooCommerce", "PHP", "JavaScript"],
      "content": {
        "type": "application",
        "title": "Kiwi Stores",
        "description": "A multi-vendor e-commerce marketplace platform connecting multiple sellers with customers, featuring vendor dashboards, product management, and order processing.",
        "features": [
          "🏪 Multi-Vendor Marketplace – Platform for multiple sellers",
          "👨‍💼 Vendor Dashboards – Individual seller management portals",
          "📊 Sales Analytics – Performance tracking for vendors",
          "🛒 Unified Shopping Cart – Seamless multi-vendor purchases",
          "⭐ Vendor Ratings – Customer feedback and review system",
          "🚚 Integrated Shipping – Multiple vendor shipping options",
          "💳 Secure Payments – Protected transaction processing"
        ],
        "tech": {
          "platform": ["WordPress", "WooCommerce"],
          "frontend": ["PHP", "JavaScript", "CSS3"],
          "deployment": ["WooCommerce Hosting"]
        },
        "liveDemo": "https://kiwistores.co",
        "status": "Live & Active"
      }
    },
    "Energy Industries": {
      "type": "file",
      "icon": "application",
      "description": "Industrial energy solutions company website",
      "tech": ["WordPress", "PHP", "JavaScript", "CSS3"],
      "content": {
        "type": "application",
        "title": "Energy Industries",
        "description": "A professional website for an industrial energy solutions company based in the Middle East, showcasing large-scale energy projects and industrial solutions.",
        "features": [
          "🏭 Industrial Focus – Specialized in large-scale energy projects",
          "🌍 International Reach – Serving Middle East and global markets",
          "📈 Project Portfolio – Showcase of completed energy projects",
          "🤝 Client Partnerships – Business collaboration features",
          "📞 Enterprise Contact – Corporate inquiry system",
          "🎯 Industry Specific – Tailored for energy sector clients",
          "🔧 Technical Solutions – Detailed engineering and energy solutions"
        ],
        "tech": {
          "platform": ["WordPress"],
          "frontend": ["PHP", "JavaScript", "CSS3"],
          "deployment": ["Enterprise Hosting"]
        },
        "liveDemo": "https://energyind.ae",
        "status": "Live & Active"
      }
    }
  }
},

 
"About Me.txt": {
  type: "file",
  icon: "text",
  description: "My background and skills",
  content: `ALI MOHSEN
FULL-STACK DEVELOPER

Full-Stack developer with over 6 years of experience in Full stack development and database architecture.
Proficient in React, Java, Python, and scalable system designs. Over the years I've garnered experience in building
robust web applications and digital solutions to enhance performance, scalability, and user experience.

EXPERIENCE
----------
Administrative Manager & Full-Stack Developer
DecoStars - Doha Qatar | 2024 - Present
• Inspect administrative operations, and coordinate with IT and finance team to optimize workflows
• Manage budgets to ensure efficient use of technology systems across departments
• Implemented digital tracking tools that improved procurement efficiency by 20%

Full-Stack Developer
Aleph-IT - Dubai, UAE | 2021 - 2024
• Worked on React-Native apps (100+ installs, 0 crash reports, 90+ Lighthouse score)
• Shipped Shopify / WooCommerce stores (largest client $10k+ monthly revenue)
• Python automation scripts removed hours of manual data-migration weekly
• Handled gateways, inventory sync, checkout flows for SMEs

Web Developer / WordPress Specialist
Cedars tech, Beirut, Lebanon | 2020-2021
• Built and maintained multiple websites for clients in retail and other industries
• Integrated custom payment methods according to client needs
• Worked closely with designers for responsive layout with optimized SEO

Data Entry/Front End
Ministry Of Public Health, Beirut, Lebanon | 2019-2020
• Entered data for different patients for the phoenix project applied in primary healthcare centers
• Worked on making the design functional and responsive for the Phoenix program under the guidance of the Lead Developer of the MoPH

EDUCATION
---------
Bachelor of Science in Computer Science
Lebanese International University (Honors) | 2018 - 2021

Associates Degree in Sustainability Studies
Palomar College, San Marcos, California | 2013 - 2015

TECHNICAL SKILLS
----------------
Frontend: React Native, Expo, React, TypeScript, JavaScript, HTML, CSS, Tailwind, Lighting web components
Backend: FastAPI, PHP, Node.js, Express, Ruby, Java
Database: MariaDB, MySQL, Firebase
E-commerce: Shopify, WooCommerce
DevOps: Git, CI/CI, Linux, Cloudflare, Docker

SOFT SKILLS
-----------
Leadership, Analytics, Organizational skills, Teamwork, Communication, 
Problem Solving, Innovation, Collaboration

KEY PROJECTS
------------
Yoshi Delivery Application: User to user delivery application full stack development with database integration, 
3-way payment system and Oss maps (no google fees)

HVAC Scheduler Application: Service Scheduling application for one of the top HVAC companies in Dubai
ensuring all service related contracts are listed, scheduled monthly to service workers. Tasks separated and
assigned to each worker with immediate documentation upon completing service via before and after images
that are sent to the client directly through email while also sending notifications to the admins whether the
task has been completed or not.

Shopify -> WooCommerce Migration: Migrated a Shopify website with over 3500 products, including images,
variations, categories, and SEO data. Ensured a responsive storefront with custom checkout and inventory
syncing.

LANGUAGES
---------
Arabic: Native
English: Native

EXTRACURRICULAR ACTIVITIES
--------------------------
• Volunteered in the ministry of public health
• Volunteered in Foodblessed (An NGO focused on giving food to families and refugees in need)
• Volunteered in reconstruction after the 4th august explosion

"Turning ideas into functional, beautiful applications that make a difference."`
},
"Contact Info.txt": {
  type: "file", 
  icon: "text",
  description: "How to get in touch with me",
  content: `CONTACT INFORMATION
==================

Let's connect and build something amazing together!

PHONE
-----
+974-39926688

EMAIL
-----
alimohssen1@hotmail.com

LOCATION
--------
Doha, Qatar

PROFESSIONAL
------------
• Current Role: Full-Stack & Mobile Developer
• Availability: Open to new opportunities and collaborations
• Expertise: React, React Native, Firebase, FastAPI, E-commerce

WEB DEVELOPMENT PORTFOLIO
-------------------------
• Green Energy AC: https://greenenergyac.com
• Aleph IT: https://aleph-it.com
• Stouffville Apothecary: https://stouffvilleapothecary.com
• The Vape Mart: https://thevapemart.ca
• Kiwi Stores: https://kiwistores.co
• Energy Industries: https://energyind.ae


PREFERRED CONTACT METHODS
-------------------------
1. Email (response within 24 hours)
2. Phone Call
3. WhatsApp

BUSINESS HOURS
--------------
• Monday - Friday: 9AM - 6PM (Qatar Time)
• Weekend: Limited availability for urgent matters

Let's discuss your next project! 

---
"How you do anything is how you do everything."
---`
}
  }
});

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState([]);
  const [internetExplorerOpen, setInternetExplorerOpen] = useState(false);
 
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [notepadOpen, setNotepadOpen] = useState(false);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [paintOpen, setPaintOpen] = useState(false);
  const projectsData = createSampleData();

  // Function to handle opening files from anywhere (desktop, folders, etc.)
  const handleFileClick = (fileName, fileData) => {
    setSelectedItem(fileName);
    
    const newWindow = {
      id: Date.now(),
      title: fileName,
      content: fileData,
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 100 + 50 
      },
      isMinimized: false
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  // NEW: Function to handle opening files from inside folder windows
  const handleFileDoubleClickFromFolder = (fileName, fileData) => {
    handleFileClick(fileName, fileData);
  };

  // NEW: Function to handle opening folders from inside folder windows
  const handleFolderDoubleClickFromFolder = (folderName, folderData) => {
    const newWindow = {
      id: Date.now(),
      title: folderName,
      content: { 
        ...folderData, 
        isFolder: true,
        description: `Contents of ${folderName} folder`
      },
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 100 + 50 
      },
      isMinimized: false
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  const handleProgramClick = (programName) => {
    setStartMenuOpen(false);
    
    if (programName === 'Notepad') {
      setNotepadOpen(true);
    } else if (programName === 'Calculator') {
      setCalculatorOpen(true);
    } else if (programName === 'Paint') {
      setPaintOpen(true);
    } else if (programName === 'Internet Explorer') {
      setInternetExplorerOpen(true);
    } else {
      handleFileClick(programName, { 
        icon: 'application', 
        description: `${programName} application` 
      });
    }
  };

  const handleProjectClick = (projectName) => {
    setStartMenuOpen(false);
    const projectData = projectsData.root[projectName];
    if (projectData) {
      if (projectData.type === 'folder') {
        handleFolderDoubleClick(projectName, projectData);
      } else {
        handleFileClick(projectName, projectData);
      }
    }
  };

  const handleDesktopClick = () => {
    setSelectedItem(null);
    setStartMenuOpen(false);
  };

  const closeWindow = (id) => {
    setOpenWindows(prev => prev.filter(window => window.id !== id));
  };

  const minimizeWindow = (id) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: !window.isMinimized } : window
    ));
  };

  const restoreWindow = (id) => {
    setOpenWindows(prev => prev.map(window => 
      window.id === id ? { ...window, isMinimized: false } : window
    ));
  };

  const handleFolderDoubleClick = (folderName, folderData) => {
    const newWindow = {
      id: Date.now(),
      title: folderName,
      content: { 
        ...folderData, 
        isFolder: true,
        description: `Contents of ${folderName} folder`
      },
      position: { 
        x: Math.random() * 300 + 100, 
        y: Math.random() * 100 + 50 
      },
      isMinimized: false
    };
    setOpenWindows(prev => [...prev, newWindow]);
  };

  // Get all open windows (not minimized)
  const visibleWindows = openWindows.filter(window => !window.isMinimized);
  
  // Get all minimized windows for taskbar
  const minimizedWindows = openWindows.filter(window => window.isMinimized);

  return (
    
   <div 
      style={{
        height: '100vh',
        padding: '20px',
        fontFamily: 'MS Sans Serif, Arial, sans-serif',
        fontSize: '11px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClick={handleDesktopClick}
    >
      {/* Spline component as the background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <Spline
          scene="https://prod.spline.design/Mg0XA7GWhhiaUqtj/scene.splinecode" 
        />
      </div>
      {/* Desktop Area - Takes up all space except taskbar */}
      <div style={{
        flex: 1,
        position: 'relative',
        marginBottom: '40px'
      }}>
        {/* Open Windows - PASS THE NEW FUNCTIONS TO WINDOW COMPONENT */}
        {visibleWindows.map(window => (
          <Window
            key={window.id}
            {...window}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            isMinimized={window.isMinimized}
            onFileDoubleClick={handleFileDoubleClickFromFolder}
            onFolderDoubleClick={handleFolderDoubleClickFromFolder}
          />
        ))}

        {/* App Windows */}
        {notepadOpen && <Notepad onClose={() => setNotepadOpen(false)} />}
        {calculatorOpen && <Calculator onClose={() => setCalculatorOpen(false)} />}
        {paintOpen && <Paint onClose={() => setPaintOpen(false)} />}
        {internetExplorerOpen && <InternetExplorer onClose={() => setInternetExplorerOpen(false)} />}

        {/* DESKTOP ICONS */}
        <div style={{ 
          flexDirection: 'column',
          gap: '5px',
          padding: '0px',
          marginTop: '-1rem',
          marginLeft: '-1rem',
        }}>
          {/* My Computer */}
          <div 
            className="desktop-icon"
            onDoubleClick={() => handleFileClick('My Computer', { icon: 'system', description: 'System folder' })}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>💻</div>
            <div style={{ textAlign: 'center', fontSize: '11px' }}>My Computer</div>
          </div>
          
          {/* Recycle Bin */}
          <div 
            className="desktop-icon"
            onDoubleClick={() => handleFileClick('Recycle Bin', { icon: 'system', description: 'Deleted items' })}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>🗑️</div>
            <div style={{ textAlign: 'center', fontSize: '11px' }}>Recycle Bin</div>
          </div>

          <div 
            className="desktop-icon"
            onDoubleClick={() => setInternetExplorerOpen(true)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '70px',
              height: '70px',
              color: 'white',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <div style={{ fontSize: '32px', marginBottom: '4px' }}>🌐</div>
            <div style={{ textAlign: 'center', fontSize: '11px' }}>Internet</div>
          </div>

          {/* YOUR PROJECT FOLDERS */}
          {Object.entries(projectsData.root).map(([name, content]) => 
            content.type === 'folder' && (
              <div 
                key={name}
                className="desktop-icon"
                onDoubleClick={() => handleFolderDoubleClick(name, content)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70px',
                  height: '70px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>📁</div>
                <div style={{ textAlign: 'center', fontSize: '11px' }}>{name}</div>
              </div>
            )
          )}

          {/* Individual files as desktop icons too */}
          {Object.entries(projectsData.root).map(([name, content]) => 
            content.type === 'file' && (
              <div 
                key={name}
                className="desktop-icon"
                onDoubleClick={() => handleFileClick(name, content)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '70px',
                  height: '70px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>
                  {content.icon === 'text' ? '📄' : '🖼️'}
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px' }}>{name}</div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Taskbar - Fixed at bottom */}
     <div style={{
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#c0c0c0',
  borderTop: '2px solid #ffffff',
  height: '28px',
  display: 'flex',
  alignItems: 'center',
  padding: '2px',
  zIndex: 1000,
  fontFamily: 'MS Sans Serif, Arial, sans-serif',
  boxShadow: '0 -1px 0 #dfdfdf'
}}>
  {/* Start Button */}
  <button 
    onClick={(e) => {
      e.stopPropagation();
      setStartMenuOpen(!startMenuOpen);
    }}
    style={{
      border: '2px outset #dfdfdf',
      borderTopColor: '#ffffff',
      borderLeftColor: '#ffffff',
      borderRightColor: '#808080',
      borderBottomColor: '#808080',
      padding: '2px 4px',
      fontWeight: 'bold',
      fontSize: '11px',
      backgroundColor: '#c0c0c0',
      height: '22px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      cursor: 'pointer',
      minWidth: '54px',
      boxShadow: startMenuOpen ? 'inset 1px 1px 0 #000000, inset -1px -1px 0 #ffffff' : 'none',
      borderStyle: startMenuOpen ? 'inset' : 'outset'
    }}
  >
    <span style={{ fontSize: '14px' }}>🪟</span>
    <span>Start</span>
  </button>
  
  {/* Separator */}
  <div style={{
    width: '2px',
    height: '20px',
    margin: '0 2px',
    borderLeft: '1px solid #808080',
    borderRight: '1px solid #ffffff'
  }}></div>
  
  {/* Taskbar Window Buttons */}
  <div style={{ 
    flex: 1, 
    display: 'flex',
    gap: '2px',
    alignItems: 'center',
    overflow: 'hidden'
  }}>
    {/* Visible Windows */}
    {visibleWindows.map(window => (
      <button
        key={window.id}
        style={{
          border: '2px outset #dfdfdf',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
        onClick={() => minimizeWindow(window.id)}
      >
        <span>📄</span>
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {window.title}
        </span>
      </button>
    ))}
    
    {/* Minimized Windows */}
    {minimizedWindows.map(window => (
      <button
        key={window.id}
        style={{
          border: '2px inset #dfdfdf',
          borderTopColor: '#808080',
          borderLeftColor: '#808080',
          borderRightColor: '#ffffff',
          borderBottomColor: '#ffffff',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
        onClick={() => restoreWindow(window.id)}
      >
        <span>📄</span>
        <span style={{ 
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap' 
        }}>
          {window.title}
        </span>
      </button>
    ))}
    
    {/* Application Windows */}
    {notepadOpen && (
      <button
        style={{
          border: '2px outset #dfdfdf',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
      >
        <span>📝</span>
        <span>Notepad</span>
      </button>
    )}
    {calculatorOpen && (
      <button
        style={{
          border: '2px outset #dfdfdf',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
      >
        <span>🧮</span>
        <span>Calculator</span>
      </button>
    )}
    {paintOpen && (
      <button
        style={{
          border: '2px outset #dfdfdf',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
      >
        <span>🎨</span>
        <span>Paint</span>
      </button>
    )}
    {internetExplorerOpen && (
      <button
        style={{
          border: '2px outset #dfdfdf',
          borderTopColor: '#ffffff',
          borderLeftColor: '#ffffff',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          padding: '2px 4px',
          fontSize: '11px',
          backgroundColor: '#c0c0c0',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          minWidth: '120px',
          maxWidth: '160px'
        }}
      >
        <span>🌐</span>
        <span>Internet Explorer</span>
      </button>
    )}
  </div>

  {/* System Tray */}
  <div style={{
    borderLeft: '2px solid #808080',
    borderTop: '2px solid #808080',
    borderRight: '2px solid #ffffff',
    borderBottom: '2px solid #ffffff',
    padding: '2px 6px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    height: '20px',
    marginLeft: '2px'
  }}>
    <span style={{ fontSize: '12px' }}>🔊</span>
    <span style={{ fontSize: '11px' }}>
      {new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })}
    </span>
  </div>
</div>
      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen} 
        onClose={() => setStartMenuOpen(false)}
        onProgramClick={handleProgramClick}
        onProjectClick={handleProjectClick}
      />
    </div>
  );
};

export default Desktop;