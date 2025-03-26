import { Image, StyleSheet, Platform, TextInput, View, TouchableOpacity, Text, ScrollView, Alert, useColorScheme, Button } from 'react-native';
import {useEffect, useState} from 'react';
import { generateGame, Game } from '@/scripts/game';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import GameHint from '@/components/GameHint';


export default function GameScreen() {
  //const route = useRoute();
  //const { digits, hints } = route.params; // Retrieve parameters from navigation
  const [game] = useState(():Game => generateGame(3, 2)); // Pass parameters to generateGame
  const answerLength = game.answer.length;
  const hints = game.rules; // Assuming `game.hints` is an array of hint objects
  const colorScheme = useColorScheme(); // Detect light or dark mode

  const inputsRef = useRef<TextInput[]>([]);
  const [userInput, setUserInput] = useState<string[]>(Array(answerLength).fill(''));
  const [startTime] = useState(Date.now());
  const [isGameOver, setIsGameOver] = useState(false);
  const [points, setPoints] = useState<number | null>(null);

  const hasUserInput = () => {
    return userInput.every((input) => input.length === 1);
  };

  const calculatePoints = (timeTaken: number, hintsUsed: number, digits: number) => {
    const basePoints = 1000;
    const timePenalty = Math.floor(timeTaken / 1000); // 1 point deducted per second
    const hintPenalty = hintsUsed * 50; // 50 points deducted per hint
    return Math.max(basePoints - timePenalty - hintPenalty + digits * 10, 0); // Ensure points are non-negative
  };

  useEffect(() => {
    inputsRef.current[0]?.focus(); // Automatically focus the first input on mount
  }, []);

  const handleInputChange = (text: string, index: number) => {
    const updatedInput = [...userInput];
    updatedInput[index] = text;
    setUserInput(updatedInput);

    if (text.length === 1 && index < answerLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleCheckAnswer = () => {
    const userAnswer = userInput.join('');
    if (userAnswer === game.answer) {
      const timeTaken = Date.now() - startTime;
      const pointsEarned = calculatePoints(timeTaken, hints.length, answerLength);
      setPoints(pointsEarned);
      setIsGameOver(true);
    } else {
      Alert.alert('Incorrect', 'Your answer is incorrect. Try again!');
    }
  };

  

  const isDarkMode = colorScheme === 'dark';

  if (isGameOver) {
    return (
      <View style={[styles.congratulationsScreen, { backgroundColor: 'green' }]}>
        <Text style={styles.congratulationsText}>Congratulations!</Text>
        <Text style={styles.congratulationsText}>
          Time: {Math.floor((Date.now() - startTime) / 1000)} seconds
        </Text>
        <Text style={styles.congratulationsText}>Points: {points}</Text>
      </View>
    );
  }

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
        <ThemedText type="title" style={{ color: isDarkMode ? '#FFF' : '#000' }}>
          ${game.answer}
        </ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.inputContainer}>
        <ThemedText type="subtitle" style={{ color: isDarkMode ? '#FFF' : '#000' }}>
          Enter your guess:
        </ThemedText>
        <View style={styles.cellContainer}>
          {Array.from({ length: answerLength }).map((_, index) => (
            <View key={index} style={[styles.cell, { borderColor: isDarkMode ? '#FFF' : '#CCC' }]}>
              <TextInput
                ref={(el) => (inputsRef.current[index] = el!)}
                style={[styles.cellInput, { color: isDarkMode ? '#FFF' : '#000' }]}
                maxLength={1}
                keyboardType="numeric"
                value={userInput[index]}
                onChangeText={(text) => handleInputChange(text, index)}
              />
            </View>
          ))}
        </View>
        {hasUserInput() && (
          <Button title="Check Answer" onPress={handleCheckAnswer} />
        )}
      </ThemedView>
      <ThemedView style={styles.hintsContainer}>
        <ThemedText type="subtitle" style={{ color: isDarkMode ? '#FFF' : '#000' }}>
          Hints:
        </ThemedText>
        <ScrollView>
          {hints.map((hint, index) => (
            GameHint({hint,isDarkMode})
          ))}
        </ScrollView>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
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
});
