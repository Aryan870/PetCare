import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../components/Chat/Chat';

const ChatPage = () => {
    const { appointmentId, senderId, receiverId } = useParams();

    return (
        <div className="w-full p-4">
            <h1 className="text-2xl font-bold mb-4">Appointment Chat</h1>
            <Chat key={appointmentId} appointmentId={appointmentId} senderId={senderId} receiverId={receiverId} />
        </div>
    );
};

export default ChatPage;
