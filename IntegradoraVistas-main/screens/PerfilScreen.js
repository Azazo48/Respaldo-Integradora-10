import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import RegistroUserScreen from "./RegistroUserScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerfilScreen = () => {
    const [InfoUsuario, setInfoUsuario] = useState({});
    const navigation = useNavigation();
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem("userId");
                if (storedUserId) {
                    setUserId(storedUserId);
                } else {
                    //console.log("No userId");
                }
            } catch (error) {
                console.error("Error userId", error);
            }
        };
        loadUserId();
        loadUserId();
        const intervalo = setInterval(() => {
            loadUserId();
        }, 3000);
        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchInfoUsuario = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/usuarios/${userId}`);
                    const data = await response.json();
                    if (data && data[0] && data[0][0]) {
                        setInfoUsuario(data[0][0]);
                    } else {
                        console.error("Problema con la informacion del usuario");
                    }
                } catch (error) {
                    console.error("Error al obtener la información del usuario:", error);
                }
            };
            fetchInfoUsuario();
            const intervalo = setInterval(() => {
                fetchInfoUsuario();
            }, 3000);
            return () => clearInterval(intervalo);
        }
    }, [userId]);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("userId");
            setInfoUsuario({});
            setUserId(''); 
            navigation.navigate("PerfilScreen");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

const [fontsLoaded] = useFonts({
    Playfair: require('../assets/PlayfairDisplay-VariableFont_wght.ttf'),
    Raleway: require('../assets/Raleway-VariableFont_wght.ttf'),
});

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.userName}>{userId ? `${InfoUsuario.nombre} ${InfoUsuario.apellido}` : "Usario no logeado"}</Text>
            </View>

            <TouchableOpacity
            onPress={() => navigation.navigate("Registro")}
                style={styles.button}>
                <Text style={styles.buttonRegistro}>Regístrate con Nosotros</Text>
            </TouchableOpacity>

            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Nombre: </Text>
                    {InfoUsuario.nombre}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Apellidos: </Text>
                    {InfoUsuario.apellido}
                </Text>
                {/*<Text style={styles.infoText}>
                    <Text style={styles.label}>Número de teléfono móvil: </Text>
                    {InfoUsuario.telefono}
                </Text>*/}
                <Text style={styles.infoText}>
                    <Text style={styles.label}>Email: </Text>
                    {InfoUsuario.correo}
                </Text>
            </View>
            {userId && (
            <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                <Text style={styles.Opciones}>Cerrar sesión</Text>
            </TouchableOpacity>
)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f1f1ec",
        padding: 20,
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        marginTop: 40,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        fontFamily: "Raleway"
    },
    infoContainer: {
        backgroundColor: "#fdf8d5",
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: "#000",
        marginBottom: 10,
        fontFamily: "Raleway"
    },
    label: {
        fontWeight: "bold",
        color: "#000",
    },
    button: {
        backgroundColor: "#266150",
        padding: 10,
        width: "50%",
        alignSelf: "center",
        borderRadius: 10,
        marginBottom: 20,
    }
});

export default PerfilScreen;
