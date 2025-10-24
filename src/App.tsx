/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Main from './pages/Main';
import useJwt from './hooks/useJwt';
import Login from './pages/Login';
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [jwt] = useJwt();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {jwt && <Main />}
        {!jwt && <Login />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
