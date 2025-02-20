import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReservarScreen = ({ route }) => {
    const { servicio } = route.params; // Recibir los datos del servicio
    console.log(servicio)

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [userId, setUserId] = useState('');
    
    const today = new Date().toISOString().split("T")[0];

    const horarios = [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
    ];

        useEffect(() => {
        const loadUserId = async () => {
            try {
                AsyncStorage.getItem("userId").then((storedUserId) => {
                    setUserId(storedUserId)
                });
            } catch (error) {
                console.error("Error obteniendo userId", error);
            }
        };

        loadUserId();
        const intervalo = setInterval(loadUserId, 3000);

        return () => clearInterval(intervalo);
    }, []);

    const reservarCita = async () => {
        if (!selectedDate || !selectedTime) {
            alert("dos")
            //Alert.alert("Error", "Debes seleccionar un día y una hora.");
            return;
        }
        // -idempresa -idusuario -idservicio fecha hora
        console.log("usuario",userId)
        console.log("Servicio",servicio.id)
        console.log("empresa", servicio.empresa)
        console.log("fecha", selectedDate)
        console.log("hora", selectedTime)
        alert("Uno")
        try {
            const response = await fetch('https://solobackendintegradora.onrender.com/citas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    empresa: servicio.empresa,
                    usuario: userId,
                    servicio: servicio.id,
                    fecha: selectedDate,
                    hora: selectedTime
                })
            });
            const result = await response.json();
            Alert.alert( "Reserva Confirmada", `Tu cita está programada para el ${selectedDate} a las ${selectedTime}.` );
            navigation.navigate("HomeScreen");
        } catch (error) {
            console.error("Error al crear usuario", error);
        }
        //Alert.alert( "Reserva Confirmada", `Tu cita está programada para el ${selectedDate} a las ${selectedTime}.` );
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.serviceTitle}>{servicio.nombre}</Text>
                <Text style={styles.serviceDescription}>
                    {servicio.duracion} - {servicio.precio}
                </Text>
            </View>

            <Calendar
                onDayPress={(day) => setSelectedDate(day.dateString)}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        marked: true,
                        selectedColor: "#266150",
                    },
                }}
                minDate={today}
                theme={{
                    selectedDayBackgroundColor: "#6B3F87",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#6B3F87",
                    arrowColor: "#6B3F87",
                }}
                style={styles.calendar}
            />

            <Text style={styles.subTitle}>Selecciona una hora</Text>
            <FlatList
                data={horarios}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.timeSlot,
                            selectedTime === item && styles.selectedTimeSlot,
                        ]}
                        onPress={() => setSelectedTime(item)}
                    >
                        <Text
                            style={[
                                styles.timeSlotText,
                                selectedTime === item && styles.selectedTimeSlotText,
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />

            <TouchableOpacity style={styles.reserveButton} onPress={reservarCita}>
                <Text style={styles.reserveButtonText}>Reservar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F5F3",
        padding: 20,
    },
    infoContainer: {
        marginBottom: 20,
    },
    serviceTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginTop: "8%",
    },
    serviceDescription: {
        fontSize: 16,
        color: "#555",
        textAlign: "center",
        marginTop: 5,
    },
    calendar: {
        borderRadius: 10,
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    timeSlot: {
        backgroundColor: "#E0E0E0",
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: "center",
        width: 120, 
        height: 50, 
    },
    selectedTimeSlot: {
        backgroundColor: "#266150",
    },
    timeSlotText: {
        fontSize: 16,
        color: "#333",
    },
    selectedTimeSlotText: {
        color: "#fff",
    },
    reserveButton: {
        backgroundColor: "#266150",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    reserveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});


export default ReservarScreen;
