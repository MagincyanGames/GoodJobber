/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { JwtProvider, useJwt } from './contexts/JwtContext';
import Main from './pages/Main';
import Login from './pages/Login';
import TransferPage from './pages/Transfer';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Transfer: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const { isLoading, jwt } = useJwt();

  if (isLoading) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#000000' : '#ffffff'}
      />
      <NavigationContainer
        theme={{
          dark: isDarkMode,
          colors: {
            primary: '#3498db',
            background: isDarkMode ? '#000000' : '#ffffff',
            card: isDarkMode ? '#1a1a1a' : '#ffffff',
            text: isDarkMode ? '#ffffff' : '#000000',
            border: isDarkMode ? '#333333' : '#e0e0e0',
            notification: '#3498db',
          },
          fonts: {
            regular: {
              fontFamily: 'System',
              fontWeight: '400',
            },
            medium: {
              fontFamily: 'System',
              fontWeight: '500',
            },
            bold: {
              fontFamily: 'System',
              fontWeight: '700',
            },
            heavy: {
              fontFamily: 'System',
              fontWeight: '900',
            },
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'none',
            cardStyle: { backgroundColor: isDarkMode ? '#000000' : '#ffffff' },
          }}
          initialRouteName={jwt ? 'Main' : 'Login'}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Transfer" component={TransferPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function App() {
  return (
    <SafeAreaProvider>
      <JwtProvider>
        <AppContent />
      </JwtProvider>
    </SafeAreaProvider>
  );
}

export default App;
