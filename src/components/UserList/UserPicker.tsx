import { useTheme } from '@react-navigation/native';
import useApiInterval from '../../hooks/UseApiInterval';
import { View, Text } from 'react-native';

interface UserPickerProps {
  excludedId: number[];
  onUserPick: (user: any) => void;
}

export default function UserPicker({
  onUserPick,
  excludedId,
}: UserPickerProps) {
  const [users] = useApiInterval<{ users: any[] }>('/users', 5000, {});
  const { colors } = useTheme();
  const usersListView = users?.users
    .filter(u => !excludedId.includes(u.id) && !u.isAdmin)
    .map(u => (
      <View
        key={u.id}
        style={{
          backgroundColor: colors.card,
          padding: 10,
          alignItems: 'center',
        }}
        onTouchEnd={() => onUserPick(u)}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 30,
          }}
        >
          {u.name}
        </Text>
      </View>
    ));

  return <View style={{ gap: 20, display: 'flex' }}>{usersListView}</View>;
}
