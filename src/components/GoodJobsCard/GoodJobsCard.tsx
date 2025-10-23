import { StyleSheet, View, Animated, Easing } from 'react-native';
import GoodJobsCounter from './GoodJobsCounter';
import { useState, useRef } from 'react';
import GoodJobsAnalysis from './GoodJobsAnalysis';

export interface gjHistoryEntry {
  date: Date;
  amount: number;
}

export default function GoodJobsCard() {
  const [view, setView] = useState<'COUNTER' | 'ANALYSIS'>('COUNTER');
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const gjReg: gjHistoryEntry[] = [
    { date: new Date('2024-10-20'), amount: 0 },
    { date: new Date('2024-10-21'), amount: 1 },
    { date: new Date('2024-10-22'), amount: 0 },
    { date: new Date('2024-10-23'), amount: 3 },
    { date: new Date('2024-10-24'), amount: 4 },
  ];

  function handleOnClick() {
    setView(view === 'COUNTER' ? 'ANALYSIS' : 'COUNTER');
    Animated.timing(flipAnimation, {
      toValue: view === 'COUNTER' ? 180 : 0,
      duration: 300,
      easing: Easing.bezier(0.75, 0.5, 0.5, 0.75),
      useNativeDriver: true,
    }).start();
  }

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          styles.card_counter,
          {
            transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            position: 'absolute',
          },
        ]}
        onTouchEnd={handleOnClick}
      >
        <GoodJobsCounter gj={gjReg[gjReg.length - 1].amount} />
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          styles.card_analysis,
          {
            transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
          },
        ]}
        onTouchEnd={handleOnClick}
      >
        <GoodJobsAnalysis rawData={gjReg} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 325, // Altura de la carta
    width: 250, // Ancho de la carta
  },
  card: {
    width: 250,
    height: 325,
    borderRadius: 25,
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  card_counter: {
    backgroundColor: '#3498db',
  },
  card_analysis: {
    backgroundColor: '#3498db',
  },
});
