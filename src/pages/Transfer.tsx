import { StackNavigationProp } from '@react-navigation/stack';
import UserPicker from '../components/UserList/UserPicker';
import { RootStackParamList } from '../App';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import Button from '../components/Utils/Button';
import api from '../hooks/Api';
import { useJwt } from '../contexts/JwtContext';
import { useNavigation } from '@react-navigation/native';

type TransferScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Transfer'
>;

export default function TransferPage() {
  const [selectedUser, setSelectedUser] = useState<any>();
  const { jwt, user } = useJwt();
  const navigation = useNavigation<TransferScreenNavigationProp>();

  async function handleMakeTransaction() {
    await api('/goodjobs/transfer', {
      body: {
        toUserId: selectedUser.id,
      },
      JWT: jwt,
    });
  }

  const { colors } = useTheme();
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      {!selectedUser && user && (
        <UserPicker onUserPick={setSelectedUser} excludedId={[user.id]} />
      )}

      {selectedUser && (
        <View style={styles.confirmationContainer}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: colors.text,
              }}
            >
              Transfere to
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: colors.text,
                fontWeight: '800',
              }}
            >
              {selectedUser.name}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              gap: 20,
            }}
          >
            <Button text="OK" OnTouchEnd={handleMakeTransaction} />
            <Button text="CANCEL" OnTouchEnd={() => navigation.goBack()} />
          </View>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 80,
  },
  confirmationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 80,
  },
});
