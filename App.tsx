import React, {useEffect, useRef, useState} from 'react';

import {SafeAreaView, StyleSheet, ViewStyle} from 'react-native';
import {DetectedRectangleModel} from './scan-retangle-model';
import ScanRetangle, {ScanRetangleProps} from './ScanRetangle';

const App = () => {
  const [position, setPosition] = useState<DetectedRectangleModel>();

  const camera = useRef<ScanRetangleProps>(null);

  useEffect(() => {
    console.log('position = ', JSON.stringify(position));
  }, [position]);

  return (
    <SafeAreaView style={styles.container}>
      <ScanRetangle ref={camera} setPositionScan={setPosition} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
