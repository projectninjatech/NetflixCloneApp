import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getBaseIp } from '../api/config';
import RNRestart from 'react-native-restart';

const AddServerScreen = ({ navigation }) => {
    const [serverIp, setServerIp] = useState('');

    useEffect(() => {
        // Check for an existing server IP in AsyncStorage on component mount
        const checkExistingServerIp = async () => {
            try {

                const existingServerIp = await getBaseIp()
                if (existingServerIp) {
                    // Check server connection before navigating to the login screen
                    checkServerHealth(existingServerIp);
                }


            } catch (error) {
                console.error('Error checking existing server IP', error);
                // Handle error, e.g., show connection error
            }
        };

        checkExistingServerIp();
    }, []);

    const checkServerHealth = async (ip) => {
        try {
            const response = await fetch(`${ip}/check-con`);
            const data = await response.json();

            if (data.status === 'ok') {
                // Server is running, move to the login screen or perform any other actions
                navigation.navigate('LoginScreen');
            } else {
                // Server is not running, show connection error
                console.warn('Server connection error');
            }
        } catch (error) {
            console.error('Error checking server health', error);
            // Handle error, e.g., show connection error
        }
    };

    const handleAddServer = async () => {
        // Check server connection before adding it
        console.warn(serverIp)
        try {
            const response = await fetch(`${serverIp}/check-con`);
            console.warn("Server result",response)
            const data = await response.json();

            if (data.status === 'ok') {
                // Server is running, save the server IP to AsyncStorage
                console.log("Trying to set server ip in async storage")
                await AsyncStorage.setItem('serverIp', serverIp);
                console.log("Server added now restarting the app")
                RNRestart.restart();
            } else {
                // Server is not running, show connection error
                console.warn('Server connection error');
            }
        } catch (error) {
            console.error('Error checking server health or saving server IP', error);
            // Handle error, e.g., show connection error
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Server IP"
                placeholderTextColor="white"
                onChangeText={(text) => setServerIp(text)}
            />

            <TouchableOpacity style={styles.addButton} onPress={() => handleAddServer()}>
                <Text style={styles.buttonText}>Add Server</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#333333',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        color: 'white',
    },
    addButton: {
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddServerScreen;
