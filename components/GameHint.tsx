import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet,Alert } from 'react-native';
import { Hint} from '@/scripts/game';

interface GameHintProps {
    hint: Hint;
    isDarkMode: boolean;
}

const GameHint: React.FC<GameHintProps> = ({ hint, isDarkMode }) => {
    const handleHintPress = (hint: { rule: string }) => {
        Alert.alert('Hint', hint.rule);
      };
    return (
        <TouchableOpacity
            style={[
                styles.hintBox,
                {
                    borderColor: isDarkMode ? '#FFF' : '#CCC',
                    backgroundColor: isDarkMode ? '#333' : '#FFF',
                },
            ]}
            onPress={() => handleHintPress(hint)}
        >
            <View style={styles.hintTopRight}>
                <Text style={[styles.hintEmoji, { color: isDarkMode ? '#FFF' : '#000' }]}>
                    ✅ {hint.correct}
                </Text>
                <Text style={[styles.hintEmoji, { color: isDarkMode ? '#FFF' : '#000' }]}>
                    ❓ {hint.misplaced}
                </Text>
            </View>
            <Text style={[styles.hintNumber, { color: isDarkMode ? '#FFF' : '#000' }]}>
                {hint.hintNumber}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    hintBox: {
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
    },
    hintTopRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    hintEmoji: {
        fontSize: 16,
        marginHorizontal: 5,
    },
    hintNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
});

export default GameHint;