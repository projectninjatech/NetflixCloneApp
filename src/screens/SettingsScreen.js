import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { userLogout } from '../api/userloginAPI';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {

    const navigation = useNavigation();

    const handlelogout = async () => {
        const responseData = await userLogout();
        navigation.navigate("LoginScreen")
        console.log("User logout", responseData)
    };

    const changeServer = async () => {
        await AsyncStorage.removeItem('serverIp');
        navigation.navigate("AddServerScreen")
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.logoutButton} onPress={changeServer}>
                <Text style={styles.buttonText}>Change Server</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handlelogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.infoText}>This app is developed by Imran Ansari @projectninjatech. It is built for educational purposes. Please note that the developer is not responsible for any unwanted use of the app and does not promote or endorse piracy of any content.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        width:'80%',
        backgroundColor: '#EB1825',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    infoText: {
        top: 20,
        color:'white',
        width:'80%',
        fontWeight: 'bold',
        fontSize: 16,
    }
})