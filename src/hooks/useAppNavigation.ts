import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

export function useAppNavigation() {
  return useNavigation<NavigationProp<RootStackParamList>>();
}

export default useAppNavigation;
