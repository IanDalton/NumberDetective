import { Image, StyleSheet, Platform, TextInput, View, TouchableOpacity, Text, ScrollView, Alert, useColorScheme, Button } from 'react-native';
import {useEffect, useState} from 'react';
import { generateGame } from '@/scripts/game';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [digits, setDigits] = useState(4); // Default number of digits
  const [hints, setHints] = useState(3); // Default number of hints

 

  return (
    <ThemedView>
      <ThemedText>Home</ThemedText>
      <Button
        title="Start Game"
        onPress={() => {}}
      />
    </ThemedView>
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
