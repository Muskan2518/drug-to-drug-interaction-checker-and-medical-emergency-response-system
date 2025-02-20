import React from 'react';
import { ScrollView, Text, StyleSheet, View, Linking, TouchableOpacity, Image } from 'react-native';

const App = () => {
  const openYouTubeLink = () => {
    Linking.openURL('https://youtu.be/owXhSD7XwUk');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Seizure First Aid</Text>
      <Text style={styles.description}>
        If you see someone having a seizure, there are some simple things you can do to help.
      </Text>

      {/* Image section */}
      <Image 
        source={{ uri: 'https://lirp.cdn-website.com/69c0b277/dms3rep/multi/opt/Symptoms+of+Seizures+-+PACE+Hospitals-640w.jpg' }} 
        style={styles.image}
      />

      {/* YouTube link section */}
      <TouchableOpacity onPress={openYouTubeLink}>
        <Text style={styles.link}>Watch this video on seizure first aid</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>If you're with someone having a seizure:</Text>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Only move them if they're in danger, such as near a busy road or hot cooker.</Text>
      </View>

      {/* Additional bullet points as in the original code */}
      
      <Text style={styles.sectionTitle}>If the person is in a wheelchair:</Text>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Put the brakes on and leave any seatbelt or harness on.</Text>
      </View>

      <Text style={styles.warningTitle}>Important:</Text>

      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>•</Text>
        <Text style={styles.bulletText}>Do not put anything in their mouth, including your fingers.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: '#1e90ff',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    fontSize: 20,
    lineHeight: 20,
    marginRight: 8,
  },
  bulletText: {
    fontSize: 16,
    flex: 1,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#d9534f',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default App;