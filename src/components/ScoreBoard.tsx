import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  PanResponder,
  Platform,
} from 'react-native';
import { GameStateEnum } from '../Main';

interface Props {
  color: string;
  score: number;
  onIncrement: () => void;
  onDecrement: () => void;
  gameState: GameStateEnum;
  isWinner: boolean;
}

export function ScoreBoard({
  color,
  score,
  onIncrement,
  onDecrement,
  gameState,
  isWinner,
}: Props) {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => {
      return Math.abs(gesture.dy) > 20;
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dy > 30) {
        onDecrement();
      }
    },
  });

  const getBackgroundColor = (): string => {
    if (gameState === 'ON_DISPUTE') return '#FF8C00';
    if (gameState === 'FINISHED') {
      return isWinner ? '#4CAF50' : '#444';
    }
    return color;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: getBackgroundColor() }]}
      {...panResponder.panHandlers}
    >
      <Pressable style={styles.pressArea} onPress={onIncrement}>
        <Text style={styles.score}>{score}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  score: {
    fontSize: 380,
    color: 'white',
    fontFamily: Platform.select({
      ios: 'Rajdhani-Bold',
      android: 'Rajdhani-Bold',
      default: 'sans-serif',
    }),
    fontWeight: Platform.select({
      ios: 'bold',
      android: 'normal', // Remove fontWeight for Android when using bold font file
      default: 'bold',
    }),
    textShadowColor: 'rgba(0, 0, 0, 0.7)', // cor da sombra (preta com transparência)
    textShadowOffset: { width: 4, height: 4 }, // deslocamento da sombra
    textShadowRadius: 3,
  },
});
