import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Sweet Cheat!</Text>
            <Button
                title="Go to Chat"
                onPress={() => navigation.navigate('Chat')}
            />
        </View>
    );
};

export default HomeScreen;