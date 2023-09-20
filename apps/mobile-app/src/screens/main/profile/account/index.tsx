import { userAtom } from '$atoms/user';
import { PaperButton } from '$components/dumb/paper-button';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { IconButton, Text } from 'react-native-paper';

export type MainProfileAccountScreenProps = {
  //
};

export const MainProfileAccountScreen: React.FC<MainProfileAccountScreenProps> = () => {
  const [user, setUser] = useAtom(userAtom);

  const { navigate } = useNavigation();

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate('Main', { screen: 'Profile', params: { screen: 'Login' } });
  }, [navigate, setUser]);

  if (!user) return null;

  return (
    <ScreenWrapper>
      <IconButton
        icon='account'
        mode='contained'
        onPress={() => {}}
        size={128}
        style={{ alignSelf: 'center' }}
      />
      <Text variant='displaySmall' style={{ textAlign: 'center', marginTop: spacing.lg }}>
        {user?.fullName}
      </Text>
      <PaperButton onPress={handleLogout} style={{ marginTop: spacing.xl }}>
        Logout
      </PaperButton>
    </ScreenWrapper>
  );
};
