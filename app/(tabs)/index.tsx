import { Image, StyleSheet, Platform, TextInput, View, TouchableOpacity, Text, ScrollView, Alert, useColorScheme, Button } from 'react-native';
import {useEffect, useState} from 'react';
import { generateGame } from '@/scripts/game';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker'; 

export default function HomeScreen() {
  const navigation = useNavigation();
  const [digits, setDigits] = useState(4); // Default number of digits
  const [hints, setHints] = useState(3); // Default number of hints

  const handlePlay = () => {
        navigation.navigate('GameScreen', { digits: 3, hints: 5 });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Number Detective</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <ThemedText type="subtitle">Select Game Settings:</ThemedText>
        <View style={styles.pickerContainer}>
          <ThemedText>Number of Digits:</ThemedText>
          <Picker
            selectedValue={digits}
            onValueChange={(value) => setDigits(value)}
            style={styles.picker}
          >
            {[3, 4, 5, 6].map((num) => (
              <Picker.Item key={num} label={`${num}`} value={num} />
            ))}
          </Picker>
        </View>
        <View style={styles.pickerContainer}>
          <ThemedText>Number of Hints:</ThemedText>
          <Picker
            selectedValue={hints}
            onValueChange={(value) => setHints(value)}
            style={styles.picker}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Picker.Item key={num} label={`${num}`} value={num} />
            ))}
          </Picker>
        </View>
        <Button title="Play" onPress={handlePlay} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  inputContainer: {
    marginVertical: 16,
  },
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  cellInput: {
    textAlign: 'center',
    fontSize: 18,
    width: '100%',
    height: '100%',
  },
  hintsContainer: {
    marginVertical: 16,
  },
  hintBox: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hintTopRight: {
    position: 'absolute',
    top: 4,
    right: 4,
    alignItems: 'flex-end',
  },
  hintEmoji: {
    fontSize: 12,
  },
  hintNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  congratulationsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratulationsText: {
    fontSize: 24,
    color: '#FFF',
    marginBottom: 16,
  },
    pickerContainer: {
    marginVertical: 16,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
