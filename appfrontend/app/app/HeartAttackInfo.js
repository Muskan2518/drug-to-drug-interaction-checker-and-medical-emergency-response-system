import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Image, Linking } from "react-native";

export default function HeartAttackInfo() {
  const handleEmergencyCall = () => {
    Alert.alert(
      "Emergency",
      "Call 911 or your local medical emergency number.",
      [{ text: "OK", style: "default" }]
    );
  };

  const handleVideoLink = () => {
    Linking.openURL("https://youtu.be/55h4ZDYw4WQ");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Heart Attack Symptoms</Text>
      
      {/* Displaying the Image */}
      <Image
        source={{ uri: "https://max-website20-images.s3.ap-south-1.amazonaws.com/10_Common_Symptoms_of_a_Heart_Attack_f079c12b5f.png" }}
        style={styles.image}
      />
      
      <Text style={styles.sectionHeader}>Recognizing the Symptoms</Text>
      <Text style={styles.text}>
        - Uncomfortable pressure, fullness, or squeezing pain in the center of the chest
      </Text>
      <Text style={styles.text}>
        - Discomfort spreading beyond the chest to shoulders, neck, jaw, or arms
      </Text>
      <Text style={styles.text}>- Shortness of breath</Text>
      <Text style={styles.text}>- Lightheadedness, dizziness, or fainting</Text>
      <Text style={styles.text}>- Sweating</Text>
      <Text style={styles.text}>- Nausea</Text>
      <Text style={styles.text}>
        A heart attack generally causes chest pain for more than 15 minutes but may also have no symptoms at all.
      </Text>

      <Text style={styles.sectionHeader}>What to Do</Text>
      <Text style={styles.text}>
        1. Call Emergency Services: Don’t ignore the symptoms; call 911 or emergency services immediately. If no help is available, have someone drive you to the nearest hospital.
      </Text>
      <Text style={styles.text}>
        2. Take Aspirin: Chew and swallow an aspirin unless allergic or advised otherwise by a doctor.
      </Text>
      <Text style={styles.text}>
        3. Take Prescribed Nitroglycerin: If prescribed, take it as directed by your doctor.
      </Text>
      <Text style={styles.text}>
        4. Begin CPR if Necessary: If the person becomes unconscious, call 911 and begin CPR as directed. Press at least 100 chest compressions per minute.
      </Text>
      <Text style={styles.text}>
        5. Use an AED: If available, use an Automated External Defibrillator (AED) and follow its instructions until help arrives.
      </Text>

      <Pressable style={styles.button} onPress={handleEmergencyCall}>
        <Text style={styles.buttonText}>Call Emergency Services</Text>
      </Pressable>

      {/* Button to open the video link */}
      <Pressable style={styles.videoButton} onPress={handleVideoLink}>
        <Text style={styles.videoButtonText}>Watch Heart Attack Info Video</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 200,
    marginVertical: 15,
    borderRadius: 10,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0066cc",
    marginTop: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#cc0000",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  videoButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  videoButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});