import { StyleSheet, View } from 'react-native';
import LoginCard from '../components/AuthCard/LoginCard';
import { useJwt } from '../contexts/JwtContext';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useEffect } from 'react';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colors } = useTheme();
  const { setJwt, jwt } = useJwt();

  useEffect(() => {
    if (jwt) {
      navigation.replace('Main');
    }
  }, [jwt, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <LoginCard setJwt={setJwt} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
  },
});
