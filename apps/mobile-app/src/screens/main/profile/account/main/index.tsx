import { useMeQuery } from '$apis/user';
import { meDocument } from '$apis/user/queries/me';
import { PaperButton } from '$components/dumb/paper-button';
import { DropdownInput } from '$components/inputs/dropdown';
import { ListItem } from '$components/inputs/select/types';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { useMMKVState } from '$hooks/use-mmkv-state';
import { useShowRootTabs } from '$hooks/use-show-root-tabs';
import { storage } from '$libs/mmkv';
import { queryClient } from '$libs/react-query/client';
import { AvailableLanguagesUnion } from '$models/available-languages';
import { AccountStackParamList } from '$navigation/main/profile/account/model';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ObjectTypeDefinitionNode } from 'graphql';
import { useCallback, useMemo } from 'react';
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

export type MainProfileAccountMainProps = NativeStackScreenProps<
  AccountStackParamList,
  'AccountMain'
>;

export const MainProfileAccountMainScreen: React.FC<MainProfileAccountMainProps> = () => {
  useShowRootTabs();

  const { data } = useMeQuery();
  const user = data?.me;
  const { navigate } = useNavigation();

  const [lang, setLang] = useMMKVState(storage.lang);

  const selectedItem = useMemo(() => {
    const selectedLanguage = languages.find(language => language.value === lang);

    if (!selectedLanguage) return [];

    return [selectedLanguage];
  }, [lang]);

  const handleLogout = useCallback(() => {
    storage.accessToken.delete();
    storage.refreshToken.delete();

    queryClient.invalidateQueries({
      queryKey: [(meDocument.definitions[0] as ObjectTypeDefinitionNode).name],
    });

    navigate('Main', { screen: 'Profile', params: { screen: 'Login', params: {} } });
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
      <View style={{ marginTop: spacing.xl, flex: 1 }}>
        <List.Item
          title='My Trips'
          onPress={() =>
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'Account', params: { screen: 'MyTrips', params: {} } },
            })
          }
        />
        <Divider style={{ marginVertical: spacing.md }} />
        <DropdownInput
          mode='outlined'
          label='Language'
          items={languages}
          selected={selectedItem}
          onSelectFinish={selected =>
            setLang(selected[0].value as AvailableLanguagesUnion)
          }
        />
        <View style={{ flex: 1 }} />
        <PaperButton onPress={handleLogout} style={{ marginTop: spacing.lg }}>
          Logout
        </PaperButton>
      </View>
    </ScreenWrapper>
  );
};
