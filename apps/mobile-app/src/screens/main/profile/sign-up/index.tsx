import { useSendOtpMutation } from '$apis/otp';
import { useSignUpMutation } from '$apis/user';
import { PaperButton } from '$components/dumb/paper-button';
import { MaskedTextField } from '$components/fields/masked-text';
import { TextField } from '$components/fields/text';
import { useShowRootTabs } from '$hooks/use-show-root-tabs';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { object, string } from 'zod';

const validationSchema = object({
  phone: string({ required_error: 'Phone is required field' }).regex(
    /^(50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/,
    'Phone should be a valid UAE number'
  ),
  password: string({ required_error: 'Password is required field' }).min(
    8,
    'Password should be at least 8 characters'
  ),
  repeatPassword: string({ required_error: 'Repeat password is required field' }),
}).refine(({ password, repeatPassword }) => password === repeatPassword, {
  message: 'Repeat password should be same as password',
  path: ['repeatPassword'],
});

export type MainProfileSignUpScreenProps = {
  //
};

export const MainProfileSignUpScreen: React.FC<MainProfileSignUpScreenProps> = () => {
  useShowRootTabs();

  const { navigate } = useNavigation();
  const theme = useAppTheme();

  const signUpMutation = useSignUpMutation();
  const sendOTPMutation = useSendOtpMutation();

  const methods = useForm({
    defaultValues: {
      phone: '',
      password: '',
      repeatPassword: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const handleSubmit = methods.handleSubmit(async values => {
    const phoneWithCountryCode = '+971' + values.phone;

    try {
      await signUpMutation.mutateAsync({
        signUpPayload: {
          phone: phoneWithCountryCode,
          email: 'a@a.com',
          name: 'hmid',
          password: values.password,
          role: 'user',
        },
      });

      const {
        sendOtp: { message },
      } = await sendOTPMutation.mutateAsync({
        sendOTPPayload: {
          phone: phoneWithCountryCode,
        },
      });

      // *(1234)*
      const otp = message.substring(message.indexOf('(') + 1, message.indexOf(')'));

      console.log('otp:', otp);

      navigate('Main', {
        screen: 'Profile',
        params: { screen: 'OTP', params: { phone: phoneWithCountryCode, otp } },
      });
    } catch (err) {
      console.error(err);
    }
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
        Sign Up Now
      </Text>
      <Text
        variant='bodyLarge'
        style={[commonStyles.textCenter, { paddingTop: spacing.md }]}
      >
        Please fill the details and create an account
      </Text>
      <FormProvider {...methods}>
        <MaskedTextField
          left={<TextInput.Affix text='+971' />}
          name='phone'
          label='Phone'
          mask='999999999'
          style={{ marginTop: spacing.xxl }}
        />
        <TextField
          name='password'
          label='Password'
          secureTextEntry
          style={{ marginTop: spacing.lg }}
        />
        <TextField
          name='repeatPassword'
          label='Repeat Password'
          secureTextEntry
          style={{ marginTop: spacing.lg }}
        />
      </FormProvider>

      <PaperButton
        onPress={handleSubmit}
        style={{
          borderRadius: theme.roundness,
          padding: spacing.sm,
          marginTop: spacing.xl,
        }}
      >
        Sign Up
      </PaperButton>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: spacing.lg,
        }}
      >
        <Text>Already have an account?</Text>
        <Button
          onPress={() =>
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'Login', params: {} },
            })
          }
        >
          Login
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
        <IconButton icon='google' mode='outlined' size={36} onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
};
