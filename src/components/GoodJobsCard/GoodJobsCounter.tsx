import { StyleSheet, Text } from 'react-native';
import Logo from '../logo.svg';

export default function GoodJobsCounter({ gj }: { gj: number }) {
  return (
    <>
      <Logo width={150} height={150} color={'#ffffff'} />
      <Text style={styles.gj_text}>{gj}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  gj_text: {
    marginTop: 20,
    fontWeight: '600',
    color: '#ffffff',
    fontSize: 50,
  },
});
