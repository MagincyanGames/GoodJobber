import { StyleSheet, Text, View } from 'react-native';
import GoodJobsCard from '../components/GoodJobsCard/GoodJobsCard';

export default function Main() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 260,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>GOOD</Text>
        <Text style={styles.title}>
          JOBB<Text style={styles.titleAccent}>ER</Text>
        </Text>
      </View>
      <GoodJobsCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },

  titleAccent: {
    fontSize: 40,
    color: '#3498db', // color principal
  },
  title: {
    margin: -10,
    textAlignVertical: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
});
