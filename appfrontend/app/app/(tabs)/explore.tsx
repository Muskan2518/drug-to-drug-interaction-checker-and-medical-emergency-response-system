import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import HeartAttackInfo from '../HeartAttackInfo';
import BloodSugarPrevention from '../BloodSugarPrevention';
import SeizureFirstAid from '../SeizureFirstAid';

const App = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const renderContent = () => {
    switch (selectedInfo) {
      case 'HeartAttack':
        return <HeartAttackInfo />;
      case 'BloodSugar':
        return <BloodSugarPrevention />;
      case 'Seizure':
        return <SeizureFirstAid />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Information</Text>

      <View style={styles.card}>
        <Pressable onPress={() => setSelectedInfo('HeartAttack')} style={({ pressed }) => [styles.linkContainer, pressed && styles.pressed]}>
          <Text style={styles.linkText}>Heart Attack Information</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Pressable onPress={() => setSelectedInfo('BloodSugar')} style={({ pressed }) => [styles.linkContainer, pressed && styles.pressed]}>
          <Text style={styles.linkText}>Preventing Blood Sugar Spikes</Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Pressable onPress={() => setSelectedInfo('Seizure')} style={({ pressed }) => [styles.linkContainer, pressed && styles.pressed]}>
          <Text style={styles.linkText}>Seizure First Aid</Text>
        </Pressable>
      </View>

      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  linkContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  linkText: {
    fontSize: 20,
    color: '#1A73E8',
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: '#E0F0FF',
    borderRadius: 8,
  },
  contentContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default App;
