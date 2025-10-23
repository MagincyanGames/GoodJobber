import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, G, Line, Polyline } from 'react-native-svg';
import { gjHistoryEntry } from './GoodJobsCard';

const CARD_WIDTH = 250;
const CARD_HEIGHT = 325;

export default function GoodJobsAnalysis({
  rawData,
}: {
  rawData: gjHistoryEntry[];
}) {
  const data: { x: number; y: number }[] = rawData.map((d, i) => ({
    x: i,
    y: d.amount,
  }));

  const padding = 30;
  const graphWidth = CARD_WIDTH - padding * 2;
  const graphHeight = CARD_HEIGHT - padding * 2;

  const maxY = Math.max(...data.map(d => d.y));
  const minY = 0;

  const points = data.map((point, index) => {
    const x = padding + (index / (data.length - 1)) * graphWidth;
    const y =
      padding + graphHeight - ((point.y - minY) / (maxY - minY)) * graphHeight;
    return { x, y, value: point.y };
  });

  // Calcular posición Y para el valor 0 y el último valor
  const zeroY = padding + graphHeight; // Línea en y=0
  const lastValueY = points[points.length - 1].y; // Línea en el último valor

  // Crear string de puntos para polyline (líneas rectas)
  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <View style={styles.container}>
      <Svg width={CARD_WIDTH} height={CARD_HEIGHT}>
        {/* Línea horizontal continua en y=0 */}
        <Line
          x1={padding}
          y1={zeroY}
          x2={CARD_WIDTH - padding}
          y2={zeroY}
          stroke="#ffffff"
          strokeWidth={2}
          opacity={0.5}
        />

        {/* Línea horizontal discontinua en el último valor */}
        <Line
          x1={padding}
          y1={lastValueY}
          x2={CARD_WIDTH - padding}
          y2={lastValueY}
          stroke="#ffffff"
          strokeWidth={2}
          strokeDasharray="5, 5"
          opacity={0.5}
        />

        {/* Líneas rectas entre puntos */}
        <Polyline
          points={pointsString}
          fill="none"
          stroke="#ffffff"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Puntos con valores */}
        {points.map((point, index) => (
          <G key={index}>
            <Circle
              cx={point.x}
              cy={point.y}
              r={6}
              fill="#3498db"
              stroke="#ffffff"
              strokeWidth={2}
            />
          </G>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#ffffff',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
