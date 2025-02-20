import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const HomeLocalScreen = () => {
  const navigation = useNavigation();





  
  // Definir los servicios (para propósitos de ejemplo, aquí están en un array estático)
  const servicios = [
    {
      id: "1",
      nombre: "Spa Pedicure",
      duracion: "1 Hora",
      precio: "Desde 40 DLS",
    },
    {
      id: "2",
      nombre: "Acrylic Nails",
      duracion: "1 Hora",
      precio: "Desde 60 DLS",
    },
  ];

  const handleReservar = (servicio) => {
    // Navega a la pantalla de reserva, pasando la información del servicio
    navigation.navigate("Reserva", {
      servicio: servicio,
    });
  };

  const handleEditar = (servicio) => {
    // Navega a la pantalla de edición, pasando la información del servicio
    navigation.navigate("EditarServicio", { servicio });
  };

  // Fuentes Personalizadas
  const [fontsLoaded] = useFonts({
    Playfair: require("../assets/PlayfairDisplay-VariableFont_wght.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estética Beautificiencia</Text>
      <Text style={styles.subtitle}>Anaheim CA</Text>

      <Image
        source={{
          uri: "https://i.pinimg.com/originals/6c/bd/ee/6cbdee4d0050fff77ef812ea51a2ce4c.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.services}>
        {servicios.map((servicio) => (
          <View key={servicio.id} style={styles.serviceCard}>
            <View>
              <Text style={styles.serviceTitle}>{servicio.nombre}</Text>
              <Text style={styles.serviceDuration}>{servicio.duracion}</Text>
              <Text style={styles.servicePrice}>{servicio.precio}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.reserveButton, { marginRight: 10 }]}
                onPress={() => handleReservar(servicio)}
              >
                <Text style={styles.reserveText}>RESERVAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditar(servicio)}
              >
                <Text style={styles.editText}>EDITAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
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
    marginBottom: 5,
    marginTop: "5%",
    fontFamily: "Playfair",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Playfair",
  },
  services: {
    marginTop: 10,
  },
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fdf8d5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#cbcbbe",
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  serviceDuration: {
    fontSize: 14,
    color: "#000",
    marginTop: 5,
  },
  servicePrice: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  reserveButton: {
    backgroundColor: "#266150",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  reserveText: {
    color: "#fdf8d5",
    fontWeight: "bold",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#FFA500",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default HomeLocalScreen;
