import { useMeQuery } from '$apis/user';
import { meDocument } from '$apis/user/queries/me';
import { PaperButton } from '$components/dumb/paper-button';
import { DropdownInput } from '$components/inputs/dropdown';
import { ListItem } from '$components/inputs/select/types';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { storage } from '$libs/mmkv';
import { queryClient } from '$libs/react-query/client';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { ObjectTypeDefinitionNode } from 'graphql';
import { useCallback } from 'react';
import { View } from 'react-native';
import { Divider, IconButton, List, Text } from 'react-native-paper';

const languages: ListItem[] = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'ar',
    label: 'العربية',
  },
];

export type MainProfileAccountMainProps = {
  //
};

export const MainProfileAccountMainScreen: React.FC<MainProfileAccountMainProps> = () => {
  const { data } = useMeQuery();
  const user = data?.me;

  const { navigate } = useNavigation();

  const handleLogout = useCallback(() => {
    storage.accessToken.delete();
    storage.refreshToken.delete();

    queryClient.invalidateQueries({
      queryKey: [(meDocument.definitions[0] as ObjectTypeDefinitionNode).name],
    });

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
        {user.name}
      </Text>
      <Text style={{ textAlign: 'center', marginTop: spacing.sm }}>{user.phone}</Text>
      <View style={{ marginTop: spacing.xl }}>
        <List.Item
          title='My Trips'
          onPress={() =>
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'Account', params: { screen: 'MyTrips' } },
            })
          }
        />
        <Divider style={{ marginVertical: spacing.md }} />
        <DropdownInput mode='outlined' label='Language' items={languages} />
        <PaperButton onPress={handleLogout} style={{ marginTop: spacing.lg }}>
          Logout
        </PaperButton>
      </View>
    </ScreenWrapper>
  );
};
