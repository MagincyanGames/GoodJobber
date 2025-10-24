import { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

export default function LoginCard() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonIsHover, setButtonIsHover] = useState(false);

  function handleChangePassword(pass: string) {
    setPassword(pass);
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
      <View
        style={buttonIsHover ? styles.button_hover : styles.button}
        onTouchStart={() => {
          setButtonIsHover(true);
        }}
        onTouchEnd={() => {
          setButtonIsHover(false);
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            textAlignVertical: 'center',
          }}
        >
          Submit
        </Text>
      </View>
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
  button: {
    margin: 20,
    width: 150,
    height: 70,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  button_hover: {
    margin: 20,
    width: 150,
    height: 70,
    borderRadius: 20,
    backgroundColor: '#dddddd',
  },
});
