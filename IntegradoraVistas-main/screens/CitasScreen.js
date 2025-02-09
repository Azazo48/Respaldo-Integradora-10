import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CitasScreen = () => {//https://solobackendintegradora.onrender.com/citas/usuario/{userId}
  const [userCitas, setUserCitas] = useState([]); /*= useState([
    {
      id: 1,
      servicio: "Masaje Relajante",
      fecha: "25 de enero de 2025",
      hora: "10:00 a.m.",
      precio: "$50.00",
      local: "Estética Beautificiencia",
      cliente: "Juan Pérez",
    },
    {
      id: 2,
      servicio: "Spa Pedicure",
      fecha: "26 de enero de 2025",
      hora: "2:00 p.m.",
      precio: "$40.00",
      local: "Estética Beautificiencia",
      cliente: "Ana García",
    },
  ]);*/
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const loadUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem("userId");
                if (storedUserId) {
                    setUserId(storedUserId);
                }
            } catch (error) {
                console.error("Error obteniendo userId", error);
            }
        };

        loadUserId();
        const intervalo = setInterval(loadUserId, 3000);

        return () => clearInterval(intervalo);
    }, []);

    useEffect(() => {
      if (userId) {
        const fetchInfoUsuario = async () => {
          try {
            const response = await fetch(`https://solobackendintegradora.onrender.com/citas/usuario/${userId}`);
            const data = await response.json();
            //console.log("Citas recibidas:", data);
            
            if (Array.isArray(data) && Array.isArray(data[0])) {
              setUserCitas(data[0]);
            } else {
              console.error("La estructura de la respuesta no es la esperada.");
            }
          } catch (error) {
            console.error("Error al obtener la información del usuario:", error);
          }
        };
    
        fetchInfoUsuario();
        const intervalo = setInterval(fetchInfoUsuario, 3000);
    
        return () => clearInterval(intervalo);
      }
    }, [userId]);
    
    
    //Fuentes Personalizadas
        const [fontsLoaded] = useFonts({
        Playfair: require('../assets/PlayfairDisplay-VariableFont_wght.ttf'),
        Raleway: require('../assets/Raleway-VariableFont_wght.ttf'),
        });
    
      const cancelarCita = (id, tipo) => {
        Alert.alert(
          "Cancelar Cita",
          "¿Estás seguro de que deseas cancelar esta cita?",
          [
            { text: "No", style: "cancel" },
            {
              text: "Sí",
              onPress: () => {
                if (tipo === "user") {
                  setUserCitas((prevCitas) => prevCitas.filter((cita) => cita.id !== id));
                }
              },
            },
          ]
        );
      };
    
      const renderCitas = (citas) => (
        <ScrollView>
          {citas.length > 0 ? (
            citas.map((cita) => (
              <View key={cita.id} style={styles.card}>
                <Text style={styles.serviceTitle}>{cita.servicio}</Text>
                <Text style={styles.serviceDetails}>Fecha: {cita.fecha}</Text>
                <Text style={styles.serviceDetails}>Hora: {cita.hora}</Text>
                <Text style={styles.serviceDetails}>Precio: {cita.precio}</Text>
                <Text style={styles.serviceDetails}>Local: {cita.local}</Text>
    
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelarCita(cita.id, "user")}
                >
                  <Text style={styles.cancelButtonText}>Cancelar Cita</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={styles.card}>
              <Text style={styles.message}>
                No tienes citas reservadas.
              </Text>
            </View>
          )}
        </ScrollView>
      );
    
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Tus citas</Text>
    
          {renderCitas(userCitas)}
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#f1f1ec",
        padding: 20,
      },
      title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginBottom: 20,
        fontFamily: "Playfair",
        marginTop: "5%"
      },
      card: {
        backgroundColor: "#fdf8d5",
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
      },
      serviceTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        fontFamily: "Raleway"
    
      },
      serviceDetails: {
        fontSize: 16,
        color: "#000",
        marginBottom: 5,
        fontFamily: "Raleway"
      },
      cancelButton: {
        marginTop: 15,
        backgroundColor: "#c94c4c",
        padding: 10,
        borderRadius: 5,
      },
      cancelButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
      },
      detailsButton: {
        marginTop: 10,
        backgroundColor: "#266150",
        padding: 8,
        borderRadius: 5,
      },
      detailsText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
      },
      message: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 10,
        textAlign: "center",
      },
    });
    
    export default CitasScreen;