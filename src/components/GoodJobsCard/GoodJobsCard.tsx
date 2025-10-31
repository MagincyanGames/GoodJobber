import {
  StyleSheet,
  View,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import GoodJobsCounter from './GoodJobsCounter';
import { useState, useRef } from 'react';
import GoodJobsAnalysis from './GoodJobsAnalysis';
import { useTheme } from '@react-navigation/native';

export interface gjHistoryEntry {
  date: Date;
  amount: number;
}

interface GoodJobsCard {
  user: any;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function GoodJobsCard({
  user,
  containerStyle = {},
}: GoodJobsCard) {
  const { colors } = useTheme();
  const [view, setView] = useState<'COUNTER' | 'ANALYSIS'>('COUNTER');
  const flipAnimation = useRef(new Animated.Value(0)).current;

  // Generar historial de GoodJobs desde las transacciones del usuario
  const gjReg: gjHistoryEntry[] = (() => {
    if (
      !user.transactions?.received ||
      user.transactions.received.length === 0
    ) {
      return [];
    }

    // Obtener todas las fechas de transacciones
    const transactions = user.transactions.received.map((transaction: any) => ({
      date: new Date(transaction.createdAt || transaction.date),
      amount: transaction.amount || 1,
    }));

    // Ordenar por fecha
    transactions.sort((a: any, b: any) => a.date.getTime() - b.date.getTime());

    // Obtener la fecha de la primera transacción (día 0)
    const firstDate = new Date(transactions[0].date);
    firstDate.setHours(0, 0, 0, 0);

    // Crear un Map para acumular transacciones por día
    const historyMap = new Map<number, number>();

    transactions.forEach((transaction: any) => {
      const transactionDate = new Date(transaction.date);
      transactionDate.setHours(0, 0, 0, 0);

      // Calcular días desde la primera transacción
      const daysSinceFirst = Math.floor(
        (transactionDate.getTime() - firstDate.getTime()) /
          (1000 * 60 * 60 * 24),
      );

      const currentAmount = historyMap.get(daysSinceFirst) || 0;
      historyMap.set(daysSinceFirst, currentAmount + 1);
    });

    // Convertir a array con fecha y cantidad
    return Array.from(historyMap.entries())
      .map(([dayNumber, _amount]) => {
        const date = new Date(firstDate);
        date.setDate(date.getDate() + dayNumber);
        return {
          date,
          amount: dayNumber, // El valor es el número de días desde la primera transacción
        };
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  })();

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
    <View style={{ ...styles.container, ...containerStyle }}>
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: colors.primary,
            transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            position: 'absolute',
          },
        ]}
        onTouchEnd={handleOnClick}
      >
        <GoodJobsCounter gj={user.goodJobsCount} />
      </Animated.View>

      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: colors.primary,
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
  },
  card: {
    width: 250,
    height: 325,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
});
