import { TextField } from '$components/fields/text';
import { PaperToastContainer, toast } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import {
  Button,
  Divider,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { object, string } from 'zod';
import { useSetAtom } from 'jotai';
import { userAtom } from '$atoms/user';
import { MaskedTextField } from '$components/fields/masked-text';
import { PaperButton } from '$components/dumb/paper-button';
import { graphql } from '$gql';
import { useGraphQLMutation } from '$libs/react-query/use-graphql-mutation';
import { storage } from '$libs/mmkv';

const validationSchema = object({
  phone: string({ required_error: 'Phone is required field' }).regex(
    /^(50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/,
    'Phone should be a valid UAE number'
  ),
  password: string({ required_error: 'Password is required field' }).min(
    8,
    'Password should be at least 8 digits'
  ),
});

const loginDocument = graphql(`
  mutation LoginMutation($loginPayload: LoginPayloadIt!) {
    login(payload: $loginPayload) {
      user {
        id
        email
        phone
        role
      }
      accessToken
      refreshToken
    }
  }
`);

export type MainProfileLoginScreenProps = {
  //
};

export const MainProfileLoginScreen: React.FC<MainProfileLoginScreenProps> = () => {
  const loginMutation = useGraphQLMutation(loginDocument);
  const setUser = useSetAtom(userAtom);

  const methods = useForm({
    defaultValues: {
      phone: '',
      password: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const { navigate } = useNavigation();

  const theme = useTheme();

  const handleSubmit = methods.handleSubmit(async values => {
    const phoneWithCountryCode = '971' + values.phone;

    const {
      login: { accessToken, refreshToken, user },
    } = await loginMutation.mutateAsync({
      loginPayload: { username: phoneWithCountryCode, password: values.password },
    });

    storage.accessToken.set(accessToken);
    storage.refreshToken.set(refreshToken);

    setUser({
      phone: user.phone ?? undefined,
      id: user.id + '' ?? Date.now() + '',
    });

    navigate('Main', { screen: 'Profile', params: { screen: 'Account' } });
  });

  return (
    <SafeAreaView
      style={[
        commonStyles.flexFull,
        commonStyles.justifyCenter,
        commonStyles.screenPadding,
      ]}
    >
      <Text variant='displayMedium' style={commonStyles.textCenter}>
        Login Now
      </Text>
      <Text
        variant='bodyLarge'
        style={[commonStyles.textCenter, { paddingTop: spacing.md }]}
      >
        Please login to continue using the app
      </Text>
      <FormProvider {...methods}>
        <MaskedTextField
          name='phone'
          label='Phone'
          mask='999999999'
          left={<TextInput.Affix text='+971' />}
          style={{ marginTop: spacing.xxl }}
        />
        <TextField
          name='password'
          label='Password'
          secureTextEntry
          style={{ marginTop: spacing.lg }}
        />
      </FormProvider>

      <Button
        onPress={() => {}}
        style={{ alignSelf: 'flex-end', paddingTop: spacing.lg }}
      >
        Forgot Password?
      </Button>

      <PaperButton
        onPress={handleSubmit}
        style={{
          borderRadius: theme.roundness,
          padding: spacing.sm,
          marginTop: spacing.xl,
        }}
      >
        Login
      </PaperButton>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: spacing.lg,
        }}
      >
        <Text>Don't have an account?</Text>
        <Button
          onPress={() =>
            navigate('Main', { screen: 'Profile', params: { screen: 'SignUp' } })
          }
        >
          Sign Up
        </Button>
      </View>

      <Divider style={{ marginVertical: spacing.lg }} />

      <Text style={commonStyles.textCenter}>Or connect with</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: spacing.lg,
        }}
      >
        <IconButton
          icon='google'
          mode='outlined'
          size={36}
          onPress={() => toast.info('pizza')}
        />
      </View>
      <PaperToastContainer />
    </SafeAreaView>
  );
};
