import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const [nombre, setNombre] = useState('');
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    
    const handleLogin = async () => {
        if (!correo.includes('@')) {
            Alert.alert("Error", "El correo debe ser válido");
            return;
        }
        if (contrasena.length < 2) {//Modificar en la version final(esta en 2 para facilitar las pruevas)
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }
        try {
        const url = `https://solobackendintegradora.onrender.com/login?correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`;
        const response = await fetch(url, { method: 'GET' });
        const data = await response.json();
        //console.log(data);
    
        if (data && data[0] && data[0][0] && data[0][0].id) {
            await AsyncStorage.setItem("userId", data[0][0].id.toString());
            navigation.navigate("PerfilScreen");
        } else {
            Alert.alert("Error en las credenciales");
        }
        } catch (error) {
        console.error("Error de conexión", error);
        Alert.alert("Error de conexión");
        }
    };

//Fuentes Personalizadas
const [fontsLoaded] = useFonts({
    Playfair: require('../assets/PlayfairDisplay-VariableFont_wght.ttf'),
});
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia de sesion</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonRegistro}>Inicia Sesion</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1ec',
        padding: 20,
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        marginVertical: 20,
        fontFamily: "Playfair"
    },
    input: {
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderColor: "#ccc",
        borderWidth: 1,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#266150",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonRegistro: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
