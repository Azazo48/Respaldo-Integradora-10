import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    
    const handleLogin = async () => {
        if (!correo.includes('@')) {
            Alert.alert("Error", "El correo debe ser válido");
            return;
        }
        if (contrasena.length < 2) { // Modificar en la versión final (actualmente en 2 para facilitar pruebas)
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }
        try {
            const response = await fetch('https://solobackendintegradora.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correo: correo,
                    contrasena: contrasena,
                })
            });
            const data = await response.json();
            if (data && data[0] && data[0][0] && data[0][0].id) {
                await AsyncStorage.setItem("userType", data[0][0].tipo.toString());
                const tipo = data[0][0].tipo
                if (tipo == "usuario") {
                    await AsyncStorage.setItem("userId", data[0][0].id.toString());
                    console.log("user id", data[0][0].id.toString())
                }
                if (tipo == "empresa") {
                    await AsyncStorage.setItem("empresaId", data[0][0].id.toString());
                    console.log("Empresa id", data[0][0].id.toString())
                }
                const userType = await AsyncStorage.getItem("userType");
                //console.log(data[0][0].id)
                //console.log(data[0][0].tipo)
                //console.log(data)
                if(userType == "empresa"){
                    navigation.navigate("HomeScreen");
                }
                if(userType == "usuario"){
                    navigation.navigate("PerfilScreen");
                }
                
            } else {
                Alert.alert("Error en las credenciales");
            }
        } catch (error) {
            console.error("Error de conexión", error);
            Alert.alert("Error de conexión");
        }
    };

    // Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        Playfair: require('../assets/PlayfairDisplay-VariableFont_wght.ttf'),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicia sesión</Text>
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
                <Text style={styles.buttonText}>Inicia Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("RegistroEmpresa")}>
                <Text style={styles.registerText}>
                    ¿Eres una empresa? ¡Regístrate con nosotros!
                </Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1ec',
        padding: 20,
        borderColor: "#cbcbbe",
        borderWidth: 2
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
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerText: {
        marginTop: 20,
        textAlign: "center",
        fontSize: 14,
        color: "#266150",
        fontWeight: "bold",
        textDecorationLine: "underline",
    }
});

export default LoginScreen;
