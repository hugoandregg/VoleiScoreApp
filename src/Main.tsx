import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  TouchableOpacity,
  TextInput,
  DimensionValue,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
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
  const [finishScore, setFinishScore] = useState(15);

  const { height, width } = useWindowDimensions();
  const [gameState, setGameState] = useState<GameStateEnum>(
    GameStateEnum.ON_GOING_GAME,
  );

  const [showDrawer, setShowDrawer] = useState(false);
  const [newFinishScore, setNewFinishScore] = useState(String(finishScore));

  const handleSaveFinishScore = () => {
    const parsed = parseInt(newFinishScore, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setFinishScore(parsed);
    }
    setShowDrawer(false);
  };

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
      if (newScore >= finishScore - 1 && scoreBlue >= finishScore - 1) {
        setGameState(GameStateEnum.ON_DISPUTE);
      } else if (newScore === finishScore) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreBlue + 2) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else {
      if (newScore - scoreBlue < 2) {
        if (newScore >= finishScore - 1 && scoreBlue >= finishScore - 1) {
          if (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_DISPUTE);
          }
        } else {
          if (newScore >= finishScore || scoreBlue >= finishScore) {
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
      if (newScore >= finishScore - 1 && scoreRed >= finishScore - 1) {
        setGameState(GameStateEnum.ON_DISPUTE);
      } else if (newScore === finishScore) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else if (gameState === GameStateEnum.ON_DISPUTE) {
      if (newScore >= scoreRed + 2) {
        setGameState(GameStateEnum.FINISHED);
      }
    } else {
      if (newScore - scoreRed < 2) {
        if (newScore >= finishScore - 1 && scoreRed >= finishScore - 1) {
          if (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) {
            setGameState(GameStateEnum.FINISHED);
          } else {
            setGameState(GameStateEnum.ON_DISPUTE);
          }
        } else {
          if (newScore >= finishScore || scoreRed >= finishScore) {
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
      } else if (newScore < finishScore - 1) {
        setGameState(GameStateEnum.ON_GOING_GAME);
      }
    } else if (gameState === GameStateEnum.FINISHED) {
      if (newScore >= finishScore && scoreBlue < finishScore - 1) {
        return;
      } else if (newScore >= finishScore - 1 && scoreBlue >= finishScore - 1) {
        if (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_DISPUTE);
        }
      } else {
        if (
          (newScore >= scoreBlue + 2 || scoreBlue >= newScore + 2) &&
          newScore >= finishScore
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
      } else if (newScore < finishScore - 1) {
        setGameState(GameStateEnum.ON_GOING_GAME);
      }
    } else if (gameState === GameStateEnum.FINISHED) {
      if (newScore >= finishScore && scoreRed < finishScore - 1) {
        return;
      } else if (scoreRed >= finishScore - 1 && newScore >= finishScore - 1) {
        if (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_DISPUTE);
        }
      } else {
        if (
          (newScore >= scoreRed + 2 || scoreRed >= newScore + 2) &&
          newScore >= finishScore
        ) {
          setGameState(GameStateEnum.FINISHED);
        } else {
          setGameState(GameStateEnum.ON_GOING_GAME);
        }
      }
    }
  };

  const centerStyles = getCenterControlsStyle(isLandscape, width, height);

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

      {!showDrawer && (
        <View style={centerStyles.container}>
          <View style={centerStyles.buttons}>
            <TouchableOpacity style={styles.fabButton} onPress={handleReset}>
              <Icon name="cached" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fabButton}
              onPress={() => setShowDrawer(true)}
            >
              <Icon name="edit" size={28} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ScoreBoard
        color="#1B6CA8"
        score={scoreBlue}
        onIncrement={() => handleIncrementBlueScore()}
        onDecrement={() => handleDecrementBlueScore()}
        gameState={gameState}
        isWinner={isBlueWinner}
      />

      {showDrawer && (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.drawer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.drawerContent}
              keyboardShouldPersistTaps="handled"
            >
              <TouchableOpacity
                onPress={() => setShowDrawer(false)}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>

              <Icon name="sports-volleyball" size={40} color="#fff" />
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                placeholder="Pontuação Final"
                placeholderTextColor="#aaa"
                value={newFinishScore}
                onChangeText={setNewFinishScore}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveFinishScore}
              >
                <Icon name="check" size={24} color="#fff" />
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const getDividerStyle = (isLandscape: boolean): ViewStyle => ({
  width: isLandscape ? 2 : '100%',
  height: isLandscape ? '100%' : 2,
  backgroundColor: 'white',
});

const getCenterControlsStyle = (
  isLandscape: boolean,
  width: number,
  height: number,
): {
  container: ViewStyle;
  buttons: ViewStyle;
} => ({
  container: {
    position: 'absolute',
    top: isLandscape ? height / 2 - 60 : '50%',
    left: isLandscape ? width / 2 - 30 : 0,
    width: isLandscape ? undefined : '100%',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isLandscape ? [] : [{ translateY: -30 }], // ajusta verticalmente para ficar centralizado
    zIndex: 2,
  },
  buttons: {
    flexDirection: isLandscape ? 'column' : 'row',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  centerButtonsContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -30 }],
    flexDirection: 'row',
    gap: 16,
    zIndex: 10,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  fabButton: {
    backgroundColor: '#444',
    padding: 12,
    borderRadius: 30,
    elevation: 4,
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '55%',
    backgroundColor: '#222',
    padding: 16,
    elevation: 5,
    zIndex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  drawerContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    width: '80%',
    fontSize: 18,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
  },
});
