const Chat = require('../models/Chat');
const Appointment = require('../models/Appointment');

// Send a message
exports.sendMessage = async (req, res) => {
    try {
        const { appointmentId, senderId, receiverId, message } = req.body;

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        const chatMessage = new Chat({
            appointment: appointmentId,
            sender: senderId,
            receiver: receiverId,
            message
        });

        await chatMessage.save();
        res.status(201).json({ message: 'Message sent successfully', chatMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get messages for a particular appointment
exports.getMessages = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const messages = await Chat.find({ appointment: appointmentId })
            .populate('sender', 'username email')
            .populate('receiver', 'username email')
            .sort('createdAt');

        res.status(200).json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
