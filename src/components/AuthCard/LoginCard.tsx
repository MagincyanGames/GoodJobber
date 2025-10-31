import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import api from '../../hooks/Api';
import { JWTContextType } from '../../contexts/JwtContext';
import Button from '../Utils/Button';

export default function LoginCard({
  setJwt,
}: {
  setJwt: JWTContextType['setJwt'];
}) {
  const [username, setUsername] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  function handleChangePassword(pass: string) {
    setPassword(pass);
  }

  async function handleSubmit() {
    try {
      const res = await api('/auth/login', {
        body: {
          name: username,
          password,
        },
        init: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      const data = await res.json();

      if (data.success) {
        await setJwt(data.token);
        console.log('JWT LOADED');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <View style={styles.card}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={handleChangePassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />

      <Button text="Submit" OnTouchEnd={handleSubmit} />
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
  input: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    height: 75,
    width: 190,
    margin: 12,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 15,
    padding: 10,
  },
});
