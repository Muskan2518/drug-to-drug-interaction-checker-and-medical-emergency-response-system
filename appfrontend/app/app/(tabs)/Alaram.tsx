import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, TextInput, Alert, FlatList } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState, useRef } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldShowAlert: true,
    shouldSetBadge: false,
  }),
});

async function requestNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      alert('You will not receive notifications if you do not enable permissions.');
    }
  }
}

export default function AlarmClock() {
  const notificationListener = useRef();
  const [notification, setNotification] = useState(false);
  const [hourr, setHour] = useState("");
  const [minutee, setMinute] = useState("");
  const [ampm, setAmpm] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    requestNotificationPermissions();
    loadAlarms();
    notificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notification) => {
        setNotification(notification);
        showAlert(notification.request.content.body);
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
    };
  }, []);

  function showAlert(message) {
    Alert.alert("Alarm Notification", message, [{ text: "OK" }]);
  }

  async function scheduleNotificationsHandler() {
    let newHourr = parseInt(hourr);
    if (ampm === "pm" && newHourr < 12) {
      newHourr += 12;
    } else if (ampm === "am" && newHourr === 12) {
      newHourr = 0;
    }

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alarm",
        body: customMessage || "It is time to wake up!",
        data: { data: "Your alarm data" },
      },
      trigger: {
        hour: newHourr,
        minute: parseInt(minutee),
        repeats: true,
      },
    });

    const newAlarm = {
      id: identifier,
      hour: hourr,
      minute: minutee,
      ampm,
      message: customMessage || "It is time to wake up!",
    };

    const updatedAlarms = [...alarms, newAlarm];
    setAlarms(updatedAlarms);
    storeAlarms(updatedAlarms);
    setHour("");
    setMinute("");
    setAmpm("");
    setCustomMessage("");
  }

  async function cancelAlarm(id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    const updatedAlarms = alarms.filter(alarm => alarm.id !== id);
    setAlarms(updatedAlarms);
    storeAlarms(updatedAlarms);
  }

  async function storeAlarms(alarms) {
    try {
      const jsonValue = JSON.stringify(alarms);
      await AsyncStorage.setItem("alarms", jsonValue);
    } catch (e) {
      alert(e);
    }
  }

  async function loadAlarms() {
    try {
      const jsonValue = await AsyncStorage.getItem("alarms");
      const storedAlarms = jsonValue != null ? JSON.parse(jsonValue) : [];
      setAlarms(storedAlarms);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alarm App</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter hour (1-12)"
        placeholderTextColor="#bbb"
        value={hourr}
        onChangeText={(text) => setHour(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter minute (0-59)"
        placeholderTextColor="#bbb"
        value={minutee}
        onChangeText={(text) => setMinute(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter 'am' or 'pm'"
        placeholderTextColor="#bbb"
        value={ampm}
        onChangeText={(text) => setAmpm(text.toLowerCase())}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Enter alarm message"
        placeholderTextColor="#bbb"
        value={customMessage}
        onChangeText={setCustomMessage}
      />
      <Pressable style={styles.button} onPress={scheduleNotificationsHandler}>
        <Text style={styles.buttonText}>Set Alarm</Text>
      </Pressable>

      <FlatList
        data={alarms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alarmItem}>
            <Text style={styles.alarmText}>
              {item.hour}:{item.minute} {item.ampm} - {item.message}
            </Text>
            <Pressable
              style={styles.cancelButton}
              onPress={() => cancelAlarm(item.id)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Background color set to black
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  header: {
    color: "#007bff", // Blue color for header text
    margin: 20,
    fontSize: 40,
    fontWeight: "bold",
  },
  button: {
    width: "70%",
    backgroundColor: "#007bff", // Blue background for button
    borderRadius: 18,
    margin: 15,
    padding: 5,
  },
  buttonText: {
    color: "#fff", // White text color for button
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    fontSize: 18,
    margin: 5,
    width: "80%",
    borderBottomWidth: 1,
    borderColor: "#007bff", // Blue border for input
    color: "#fff", // White text color for input
  },
  alarmItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#1a1a1a", // Dark background for alarm item
    borderRadius: 10,
  },
  alarmText: {
    fontSize: 16,
    color: "#fff", // White color for alarm text
  },
  cancelButton: {
    backgroundColor: "#ff4d4d", // Red background for cancel button
    padding: 5,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff", // White text for cancel button
  },
});
