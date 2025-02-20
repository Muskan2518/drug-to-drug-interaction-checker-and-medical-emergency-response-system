import React from "react";
import { StyleSheet, Text, View, ScrollView, Linking, Pressable, Image } from "react-native";

export default function BloodSugarPrevention() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Preventing Blood Sugar Spikes</Text>

      {/* Displaying the Image */}
      <Image
        source={{ uri: "https://www.verywellhealth.com/thmb/xDCJJ6fk-seMseag_CyhgB2ZUQQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/hyperglycemia-symptoms-5ada088fba617700366b24fc-707a0c35777444ac9457d5b09719ddb8.png" }}
        style={styles.image}
      />

      <Text style={styles.sectionHeader}>Monitor Blood Sugar Levels</Text>
      <Text style={styles.text}>
        The first step in preventing spikes is knowing your blood sugar levels. Especially if you take medication like insulin, check your blood sugar often.
      </Text>

      <Text style={styles.sectionHeader}>Check Blood Sugar Every Morning</Text>
      <Text style={styles.text}>
        This is called a fasting blood sugar level. For some with type 2 diabetes, once-per-day testing might be enough. However, others may need to check it up to 10 times daily.
      </Text>

      <Text style={styles.sectionHeader}>Choose Whole Grains</Text>
      <Text style={styles.text}>
        Compared to refined grains, whole grains include the fibrous outer layer (bran) and nutrient-rich core (germ). Eating whole grains provides more nutrients.
      </Text>

      <Text style={styles.sectionHeader}>Eat More Fiber</Text>
      <Text style={styles.text}>
        Fiber isn't absorbed or broken down like other carbs, so it doesn’t cause a big blood sugar increase.
      </Text>

      <Text style={styles.sectionHeader}>Balance Meals with Fat and Protein</Text>
      <Text style={styles.text}>
        Eating fat and protein with carbs helps control blood sugar. Carbs alone break down quickly into glucose and spike blood sugar. Fat and protein slow digestion.
      </Text>

      <Pressable style={styles.linkButton} onPress={() => Linking.openURL("https://www.blkmaxhospital.com/blogs/heart-attack-symptoms")}>
        <Text style={styles.linkText}>Learn More About Heart Health</Text>
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
  linkButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});