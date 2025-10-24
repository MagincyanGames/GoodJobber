import { StyleSheet, View } from 'react-native';
import LoginCard from '../components/AuthCard/LoginCard';

export default function Login() {
  return (
    <View style={styles.container}>
      <LoginCard />
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
