// src/pages/dashboard/Messages.jsx
import React, { useState } from 'react';
import { carsData } from '../../data/carsData';
import './Messages.css';

const conversations = [
  { id: 1, car: carsData[0], seller: 'Emeka Auto', initials: 'EA', time: '2h ago', unread: 2, lastMessage: 'Yes the car is still available. When can you come for inspection?', status: 'hot' },
  { id: 2, car: carsData[6], seller: 'Lagos Motors', initials: 'LM', time: '1d ago', unread: 0, lastMessage: 'Thank you for your interest. The price is negotiable.', status: 'cold' },
  { id: 3, car: carsData[14], seller: 'Abuja Cars', initials: 'AC', time: '3d ago', unread: 1, lastMessage: 'The car has full documentation. No issues whatsoever.', status: 'hot' },
];

const Messages = () => {
  const [active, setActive] = useState(conversations[0]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, from: 'seller', text: 'Hello! Yes the car is still available. When can you come for inspection?', time: '10:32 AM' },
    { id: 2, from: 'me', text: 'Great! I am interested. Can we negotiate the price a bit?', time: '10:34 AM' },
    { id: 3, from: 'seller', text: 'The price is firm but I can throw in a full service and new tires.', time: '10:36 AM' },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      from: 'me',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setMessage('');
  };

  return (
    <div className="dashboard-section">
      <div className="section-page-header">
        <div>
          <h2><i className="bi bi-chat-dots-fill"></i> Messages & Leads</h2>
          <p>{conversations.filter(c => c.unread > 0).length} unread conversations</p>
        </div>
      </div>

      <div className="messages-layout">

        {/* Conversations list */}
        <div className="conversations-list">
          <div className="conversations-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search conversations..." />
          </div>
          {conversations.map(conv => (
            <div
              key={conv.id}
              className={`conv-item ${active?.id === conv.id ? 'conv-item--active' : ''}`}
              onClick={() => setActive(conv)}
            >
              <div className="conv-avatar">{conv.initials}</div>
              <div className="conv-info">
                <div className="conv-top">
                  <strong>{conv.seller}</strong>
                  <span className="conv-time">{conv.time}</span>
                </div>
                <p className="conv-car">{conv.car.name}</p>
                <p className="conv-last">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="conv-unread">{conv.unread}</span>
              )}
            </div>
          ))}
        </div>

        {/* Chat window */}
        <div className="chat-window">
          {active ? (
            <>
              {/* Chat header */}
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="conv-avatar">{active.initials}</div>
                  <div>
                    <strong>{active.seller}</strong>
                    <span><i className="bi bi-circle-fill"></i> Online</span>
                  </div>
                </div>
                <div className="chat-header-car">
                  <img src={active.car.image} alt={active.car.name} />
                  <div>
                    <p>{active.car.name}</p>
                    <strong>{active.car.price}</strong>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`chat-bubble-wrap ${msg.from === 'me' ? 'chat-bubble-wrap--me' : ''}`}
                  >
                    <div className={`chat-bubble ${msg.from === 'me' ? 'chat-bubble--me' : 'chat-bubble--them'}`}>
                      <p>{msg.text}</p>
                      <span>{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="chat-input-bar">
                <button className="chat-attach-btn">
                  <i className="bi bi-paperclip"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                />
                <button className="chat-send-btn" onClick={sendMessage}>
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </>
          ) : (
            <div className="chat-empty">
              <i className="bi bi-chat-dots"></i>
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Messages;