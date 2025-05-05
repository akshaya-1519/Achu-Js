import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { ref, push, onValue } from "firebase/database";
import axios from 'axios';


function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const handleSend = () => {
    if (!input.trim() || !username.trim()) return;

    const messageData = {
      text: input,
      username: username,
      timestamp: Date.now()
    };

 
    push(ref(db, 'messages'), messageData);

 
    axios.post('http://localhost:8000/api/messages/', {
      text: input,
      username: username
    });

    setInput("");
  };

  useEffect(() => {
    const messagesRef = ref(db, 'messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const chatMessages = data ? Object.values(data) : [];
 
      const sorted = chatMessages.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(sorted);
    });
  }, []);

  return (
    <div className="container mt-5">
      <h3>💬 Real-time Chat</h3>

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="border p-3 mb-3 bg-light" style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <strong>{msg.username || "Anonymous"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="d-flex gap-2">
        <input
          className="form-control"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
