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
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Logo from './logo.svg';
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 250,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>GOOD</Text>
        <Text style={styles.title}>JOBBER</Text>
      </View>
      <View style={styles.card}>
        <Logo width={150} height={150} color={'#fffffff'} />
        <Text style={styles.gj_text}>{100}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  card: {
    paddingVertical: 50,
    paddingHorizontal: 60,
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
});

export default App;
