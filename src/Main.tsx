import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { ScoreBoard } from './components/ScoreBoard';
import Icon from 'react-native-vector-icons/MaterialIcons';

export enum GameStateEnum {
  ON_GOING_GAME = 'ON_GOING_GAME',
  ON_DISPUTE = 'ON_DISPUTE',
  FINISHED = 'FINISHED',
}

export default function Main() {
  const [scoreRed, setScoreRed] = useState(0);
  const [scoreBlue, setScoreBlue] = useState(0);
  const { height, width } = useWindowDimensions();
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.ON_GOING_GAME,
  );

  const isRedWinner =
    gameState === GameStateEnum.FINISHED && scoreRed > scoreBlue;
  const isBlueWinner =
    gameState === GameStateEnum.FINISHED && scoreBlue > scoreRed;

  const isLandscape = width > height;

  const handleReset = () => {
    setScoreRed(0);
    setScoreBlue(0);
    setGameState(GameStateEnum.ON_GOING_GAME);
  };

  const handleIncrementRedScore = () => {
    const newScore = scoreRed + 1;
    setScoreRed(newScore);
    if (gameState === GameStateEnum.ON_GOING_GAME) {
      if (newScore >= 14 && scoreBlue >= 14) {
        setGameState(GameStateEnum.ON_DISPUTE);
      } else if (newScore === 15) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreBlue + 2) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else {
      if (newScore - scoreBlue < 2) {
        if (newScore >= 14 && scoreBlue >= 14) {
          if (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_DISPUTE);
          }
        } else {
          if (newScore >= 15 || scoreBlue >= 15) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_GOING_GAME);
          }
        }
      } else {
        setGameState(GameStateEnum.FINISHED);
      }
    }
  };

  const handleIncrementBlueScore = () => {
    const newScore = scoreBlue + 1;
    setScoreBlue(newScore);
    if (gameState === GameStateEnum.ON_GOING_GAME) {
      if (newScore >= 14 && scoreRed >= 14) {
        setGameState(GameStateEnum.ON_DISPUTE);
      } else if (newScore === 15) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreRed + 2) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else {
      if (newScore - scoreRed < 2) {
        if (newScore >= 14 && scoreRed >= 14) {
          if (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_DISPUTE);
          }
        } else {
          if (newScore >= 15 || scoreRed >= 15) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_GOING_GAME);
          }
        }
      } else {
        setGameState(GameStateEnum.FINISHED);
      }
    }
  };

  const handleDecrementRedScore = () => {
    const newScore = Math.max(0, scoreRed - 1);
    setScoreRed(newScore);
    if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) {
        setGameState(GameStateEnum.FINISHED);
      } else if (newScore < 14) {
        setGameState(GameStateEnum.ON_GOING_GAME);
      }
    } else if (gameState === GameStateEnum.FINISHED) {
      if (newScore >= 15 && scoreBlue < 14) {
        return;
      } else if (newScore >= 14 && scoreBlue >= 14) {
        if (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_DISPUTE);
        }
      } else {
        if (
          (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) &&
          newScore >= 15
        ) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_GOING_GAME);
        }
      }
    }
  };

  const handleDecrementBlueScore = () => {
    const newScore = Math.max(0, scoreBlue - 1);
    setScoreBlue(newScore);
    if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) {
        setGameState(GameStateEnum.FINISHED);
      } else if (newScore < 14) {
        setGameState(GameStateEnum.ON_GOING_GAME);
      }
    } else if (gameState === GameStateEnum.FINISHED) {
      if (newScore >= 15 && scoreRed < 14) {
        return;
      } else if (scoreRed >= 14 && newScore >= 14) {
        if (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_DISPUTE);
        }
      } else {
        if (
          (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) &&
          newScore >= 15
        ) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_GOING_GAME);
        }
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        { flexDirection: isLandscape ? 'row' : 'column' },
      ]}
    >
      <ScoreBoard
        color="#D72638"
        score={scoreRed}
        onIncrement={() => handleIncrementRedScore()}
        onDecrement={() => handleDecrementRedScore()}
        gameState={gameState}
        isWinner={isRedWinner}
      />

      <View style={getDividerStyle(isLandscape)} />

      <ScoreBoard
        color="#1B6CA8"
        score={scoreBlue}
        onIncrement={() => handleIncrementBlueScore()}
        onDecrement={() => handleDecrementBlueScore()}
        gameState={gameState}
        isWinner={isBlueWinner}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Icon name="cached" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const getDividerStyle = (isLandscape: boolean): ViewStyle => ({
  width: isLandscape ? 2 : '100%',
  height: isLandscape ? '100%' : 2,
  backgroundColor: 'white',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#333',
  },
  resetButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#444',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    borderRadius: 30,
  },
});
