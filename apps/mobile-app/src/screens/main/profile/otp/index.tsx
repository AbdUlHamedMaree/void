import { userAtom } from '$atoms/user';
import { PaperButton } from '$components/dumb/paper-button';
import { MaskedTextField } from '$components/fields/masked-text';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { ProfileStackScreenProps } from '$navigation/main/profile/model';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text, useTheme } from 'react-native-paper';
import { object, string } from 'zod';

const validationSchema = object({
  otp: string({ required_error: 'Code is required field' }).length(
    6,
    'should be 6 digits'
  ),
});

export type MainProfileOTPScreenProps = {
  //
};

export const MainProfileOTPScreen: React.FC<MainProfileOTPScreenProps> = () => {
  const { navigate } = useNavigation();

  const setUser = useSetAtom(userAtom);
  const methods = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    params: { phone },
  } = useRoute<ProfileStackScreenProps<'OTP'>['route']>();

  const theme = useTheme();

  const handleSubmit = methods.handleSubmit(() => {
    setUser({ id: Date.now() + '', phone });
    navigate('Main', {
      screen: 'Profile',
      params: {
        screen: 'Account',
      },
    });
  });

  return (
    <ScreenWrapper verticalCenter>
      <Text variant='displayMedium' style={commonStyles.textCenter}>
        Verify Your Phone
      </Text>
      <Text
        variant='bodyLarge'
        style={[commonStyles.textCenter, { paddingTop: spacing.md }]}
      >
        Please fill the code you received via SMS to continue
      </Text>
      <FormProvider {...methods}>
        <MaskedTextField
          name='otp'
          label='Code'
          mask='999999'
          style={{ marginTop: spacing.xxl }}
        />
      </FormProvider>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginTop: spacing.lg,
        }}
      >
        <Text>Didn't receive code?</Text>
        <Button onPress={() => {}}>Resend Code</Button>
      </View>

      <PaperButton
        onPress={handleSubmit}
        style={{
          borderRadius: theme.roundness,
          padding: spacing.sm,
          marginTop: spacing.lg,
        }}
      >
        Verify
      </PaperButton>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: spacing.lg,
        }}
      >
        <Text>{phone} isn't your number?</Text>
        <Button
          onPress={() => {
            navigate('Main', { screen: 'Profile', params: { screen: 'SignUp' } });
          }}
        >
          Change Number
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
    </ScreenWrapper>
  );
};
