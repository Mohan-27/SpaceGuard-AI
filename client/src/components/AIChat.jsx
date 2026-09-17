// AIChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import "../style/AIChat.css";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "ai" }
  ]);
  const [inputText, setInputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: "user"
    };
    
    setMessages([...messages, newMessage]);
    setInputText("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: "I'm processing your request. How can I assist you further?",
        sender: "ai"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button className="chat-toggle-btn" onClick={toggleChat}>
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-container">
          <div className="ai-chat">
            {/* Header */}
            <div className="chat-header">
              <div className="header-content">
                <div className="header-icon">
                  <span className="ai-icon">✨</span>
                </div>
                <div className="header-info">
                  <h3>AI Assistant</h3>
                  <span className="status-dot"></span>
                  <span className="status-text">Online</span>
                </div>
              </div>
              <button className="close-btn" onClick={toggleChat}>✕</button>
            </div>

            {/* Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}
                >
                  <div className="message-content">
                    {message.sender === 'ai' && (
                      <div className="avatar ai-avatar">🤖</div>
                    )}
                    <div className="message-bubble">
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <div className="avatar user-avatar">👤</div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="chat-input-container">
              <div className="input-wrapper">
                <textarea
                  ref={inputRef}
                  className="chat-input"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows={1}
                />
                <button 
                  className="send-btn" 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;