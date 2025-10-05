import React, { useEffect } from 'react';
import { StatusBar, Platform } from 'react-native';
import Main from './src/Main';
import ImmersiveMode from 'react-native-immersive-mode';

export default function App() {
  useEffect(() => {
    // Configure status bar for immersive experience
    StatusBar.setHidden(true, 'fade');
    
    if (Platform.OS === 'android') {
      // Enable full immersive mode on Android
      ImmersiveMode.fullLayout(true);
      ImmersiveMode.setBarMode('FullSticky');
    }
    
    return () => {
      // Cleanup if needed
      if (Platform.OS === 'android') {
        StatusBar.setHidden(false, 'fade');
      }
    };
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <Main />
    </>
  );
}
