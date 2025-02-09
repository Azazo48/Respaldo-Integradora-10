import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const RegistroUserScreen = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');

    const crearnuevousuario = async () => {
        if (!nombre.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }
        if (!apellido.trim()) {
            Alert.alert("Error", "Los apellidos son obligatorios");
            return;
        }
        if (!correo.includes('@')) {
            Alert.alert("Error", "El correo debe ser válido");
            return;
        }
        if (contrasena.length < 6) {
            Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (!telefono.trim() || telefono.length < 10) {
            Alert.alert("Error", "El número de teléfono debe tener al menos 10 dígitos");
            return;
        }

        try {
            const response = await fetch('https://solobackendintegradora.onrender.com/usuariosc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    correo: correo,
                    contrasena: contrasena,
                    telefono: telefono
                })
            });
            const result = await response.json();
            Alert.alert("Te has Registrado!");
            navigation.navigate("LoginScreen");
        } catch (error) {
            console.error("Error al crear usuario", error);
        }
    };

    // Fuentes Personalizadas
    const [fontsLoaded] = useFonts({
        Playfair: require('../assets/PlayfairDisplay-VariableFont_wght.ttf'),
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrate con nosotros</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellidos"
                value={apellido}
                onChangeText={setApellido}
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
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={telefono}
                onChangeText={setTelefono}
                keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.button} onPress={crearnuevousuario}>
                <Text style={styles.buttonRegistro}>Registrarse</Text>
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
    buttonRegistro: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RegistroUserScreen;
