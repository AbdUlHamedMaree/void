import { useMeQuery } from '$apis/user';
import { PaperButton } from '$components/dumb/paper-button';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { storage } from '$libs/mmkv';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { IconButton, Text } from 'react-native-paper';

export type MainProfileAccountScreenProps = {
  //
};

export const MainProfileAccountScreen: React.FC<MainProfileAccountScreenProps> = () => {
  const { data } = useMeQuery();
  const user = data?.me;

  const { navigate } = useNavigation();

  const handleLogout = useCallback(() => {
    storage.accessToken.delete();
    storage.refreshToken.delete();

    navigate('Main', { screen: 'Profile', params: { screen: 'Login' } });
  }, [navigate]);

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
        {user?.phone}
      </Text>
      <PaperButton onPress={handleLogout} style={{ marginTop: spacing.xl }}>
        Logout
      </PaperButton>
    </ScreenWrapper>
  );
};
