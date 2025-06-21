import { useEffect, useState } from 'react';

interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
}

const chatService = {
    messages: [] as Message[],
    listeners: [] as Function[],

    sendMessage: (message: Message) => {
        chatService.messages.push(message);
        chatService.notifyListeners();
    },

    receiveMessage: (message: Message) => {
        chatService.messages.push(message);
        chatService.notifyListeners();
    },

    getMessages: () => {
        return chatService.messages;
    },

    subscribe: (listener: Function) => {
        chatService.listeners.push(listener);
        return () => {
            chatService.listeners = chatService.listeners.filter(l => l !== listener);
        };
    },

    notifyListeners: () => {
        chatService.listeners.forEach(listener => listener(chatService.messages));
    }
};

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const unsubscribe = chatService.subscribe(setMessages);
        return () => unsubscribe();
    }, []);

    const sendMessage = (text: string, sender: string) => {
        const message: Message = {
            id: Math.random().toString(36).substr(2, 9),
            text,
            sender,
            timestamp: new Date()
        };
        chatService.sendMessage(message);
    };

    return {
        messages,
        sendMessage
    };
};

export default chatService;