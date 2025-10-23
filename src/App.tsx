/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GoodJobsCard from './components/GoodJobsCard/GoodJobsCard';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <AppContent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function AppContent() {
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
  card: {
    paddingVertical: 45,
    paddingHorizontal: 55,
    borderRadius: 25,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gj_text: {
    marginTop: 20,
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 50,
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

export default App;
