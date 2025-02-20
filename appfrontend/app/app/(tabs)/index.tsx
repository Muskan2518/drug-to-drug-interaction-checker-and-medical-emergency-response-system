import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import io from "socket.io-client";

const LOCATION_TASK_NAME = 'background-location-task';
const BACKEND_URL = 'https://5f26-103-232-241-239.ngrok-free.app/api';
const SOCKET_URL = 'http://localhost:5111'; // Update to your server address

const socket = io(SOCKET_URL);

export default function HomeScreen() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    // Listen for emergency notifications from other devices
    socket.on("emergencyNotification", (locationData) => {
      Alert.alert("Emergency Alert", `Emergency at Latitude ${locationData.latitude}, Longitude ${locationData.longitude}`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      Alert.alert(`Location: Latitude ${currentLocation.coords.latitude}, Longitude ${currentLocation.coords.longitude}`);

      // Send emergency event via WebSocket
      socket.emit("emergency", {
        userId: 'user_001', // Replace with dynamic userId if available
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      await axios.post(`${BACKEND_URL}/findNearestUser`, {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

    } catch (error) {
      console.error('Error fetching location in foreground:', error);
      Alert.alert('Error fetching location');
    }
  };

  return (
    <View style={styles.container}>
      {isSignedIn ? (
        <>
          <Text style={styles.text}>Welcome! You are signed in.</Text>
          <Text style={styles.text}>Only use this button in case of real Emergency. If used wrongly, you will be banned from the app.</Text>
          <Button title="Emergency" onPress={getLocation} color="red" />

          {location && (
            <Text style={styles.locationText}>
              Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.text}>Please sign in to use all the features</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  locationText: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
});
