import { StyleSheet, Text, View } from 'react-native';
import GoodJobsCard from '../components/GoodJobsCard/GoodJobsCard';
import { useJwt } from '../contexts/JwtContext';
import Button from '../components/Utils/Button';
import useApiInterval from '../hooks/UseApiInterval';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function Main() {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const { colors } = useTheme();

  const { clearJwt } = useJwt();

  const [userResponse] = useApiInterval<any>(
    '/auth/me?includeGoodJobs=true&includeTransactions=true',
    1000,
    {
      method: 'GET',
    },
  );

  const handleLogout = async () => {
    await clearJwt();
    navigation.replace('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.headerBand}>
        <Text style={[styles.title, { color: colors.text }]}>GOOD</Text>
        <Text style={[styles.title, { color: colors.text }]}>
          JOBB
          <Text style={[styles.titleAccent, { color: colors.primary }]}>
            ER
          </Text>
        </Text>
      </View>

      <View style={styles.cardBand}>
        {userResponse && (
          <>
            <View
              style={{
                alignItems: 'center',
              }}
            >
              <Text style={[styles.titleAccent, { color: colors.text }]}>
                Bienvenido
              </Text>
              <Text style={[styles.titleAccent, { color: colors.primary }]}>
                {userResponse.user.name}
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <GoodJobsCard user={userResponse} />
            </View>
          </>
        )}
      </View>

      <View style={styles.actionBand}>
        <Button
          text="Transfer"
          OnTouchEnd={() => navigation.navigate('Transfer')}
        />
        <Button text="Logout" OnTouchEnd={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'column',
  },

  headerBand: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardBand: {
    flexGrow: 1,
    display: 'flex',
    gap: 20,

    alignItems: 'center',
  },

  actionBand: {
    flexGrow: 1,
    justifyContent: 'center',

    flexDirection: 'row',
    gap: 10,
    paddingBottom: 20,
  },

  titleAccent: {
    fontSize: 40,
  },

  title: {
    margin: -10,
    textAlignVertical: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
