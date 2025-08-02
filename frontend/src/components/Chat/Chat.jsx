import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = ({ appointmentId, senderId, receiverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/chat/${appointmentId}`);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll for new messages every 3 seconds
        return () => clearInterval(interval);
    }, [appointmentId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        try {
            await axios.post('http://localhost:5000/api/chat/send', {
                appointmentId,
                senderId,
                receiverId,
                message: newMessage
            });
            setNewMessage('');
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container w-full p-4 border rounded-lg shadow-md bg-white mx-0">
            <h2 className="text-xl font-semibold mb-4">Chat</h2>
            <div className="messages-display h-80 overflow-y-auto border p-3 mb-4 rounded-md bg-gray-50">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-2 ${msg.sender._id === senderId ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.sender._id === senderId ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                            <strong>{msg.sender.username}:</strong> {msg.message}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;