import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [telemetryData, setTelemetryData] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000');

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setTelemetryData((prev) => [data, ...prev].slice(0, 50));
      } catch (error) {
        console.error(error);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className='center' style={{ color: '#ffffff', minHeight: '100vh', backgroundColor: '#1a1a1a' }}>
      
      <div className='title_container' style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #ffffff33', 
        padding: '10px 20px' 
      }}>
        <div onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <img src='logo.png' style={{ width: '200px', height: 'auto' }} alt="logo" />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('home')} 
            style={activeTab === 'home' ? activeButtonStyle : navButtonStyle}>
            Home
          </button>
          <button 
            onClick={() => setActiveTab('Telemetry')} 
            style={activeTab === 'Telemetry' ? activeButtonStyle : navButtonStyle}>
            Telemetry
          </button>
        </div>
      </div>

      <div className='content_sector' style={{ padding: '40px', textAlign: 'center' }}>
        {activeTab === 'home' && (
          <div>
            <h2>Welcome to Visual Core</h2>
          </div>
        )}
        {activeTab === 'Telemetry' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2>Telemetry Stream</h2>
            <div style={{ 
              backgroundColor: '#000', 
              padding: '20px', 
              borderRadius: '10px', 
              textAlign: 'left',
              height: '500px',
              overflowY: 'auto',
              border: '1px solid #ffffff33',
              fontFamily: 'monospace',
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              {telemetryData.length === 0 ? (
                <p style={{ color: '#666' }}>No data received...</p>
              ) : (
                telemetryData.map((item, index) => (
                  <div key={index} style={{ borderBottom: '1px solid #222', padding: '5px 0' }}>
                    <span style={{ color: '#888' }}>[{item.timestamp}]</span>
                    <span style={{ color: '#4CAF50', marginLeft: '10px' }}>{item.source}</span>
                    <span style={{ color: '#fff', marginLeft: '15px' }}>{item.data}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

const navButtonStyle = {
  backgroundColor: 'transparent',
  color: '#ffffffaa',
  border: '1px solid #ffffff33',
  padding: '8px 20px',
  borderRadius: '20px',
  cursor: 'pointer',
  transition: '0.2s'
};

const activeButtonStyle = {
  ...navButtonStyle,
  backgroundColor: '#ffffff',
  color: '#000000',
  fontWeight: 'bold',
  border: '1px solid #ffffff'
};

export default App;
