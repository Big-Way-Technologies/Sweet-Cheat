import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { sendMessage, receiveMessages } from '../../services/chatService';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        const unsubscribe = receiveMessages((newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => unsubscribe();
    }, []);

    const handleSend = () => {
        if (inputMessage.trim()) {
            sendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item, index) => index.toString()}
                style={styles.messageList}
            />
            <TextInput
                style={styles.input}
                value={inputMessage}
                onChangeText={setInputMessage}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    messageList: {
        flex: 1,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 5,
    },
    messageText: {
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default ChatScreen;