import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      socketRef.current = io('http://localhost:8080', {
        path: '/socket.io',
      });

      socketRef.current.on('message', (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        socketRef.current?.disconnect();
      };
    }
  }, [isLoggedIn]);

  const sendMessage = () => {
    if (input.trim() && socketRef.current) {
      socketRef.current.emit('message', {
        senderId: username,
        text: input,
      });
      setInput('');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', width: '400px', height: 'auto', padding: '40px' }}>
          <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>⚡ Realtime Chat</h1>
            <input 
              placeholder="Enter your username..." 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit">Join Chat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3>💬 Channels</h3>
        <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}># general</div>
      </div>
      <div className="main-chat">
        <div className="chat-header">
          <div className="status-indicator"></div>
          <strong># general</strong>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === username ? 'sent' : 'received'}`}>
              <div style={{ fontSize: '10px', opacity: 0.7, marginBottom: '4px' }}>{msg.senderId}</div>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input 
            placeholder="Type a message..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
