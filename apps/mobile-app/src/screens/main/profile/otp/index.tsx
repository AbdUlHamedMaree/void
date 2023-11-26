import { PaperButton } from '$components/dumb/paper-button';
import { MaskedTextField } from '$components/fields/masked-text';
import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { storage } from '$libs/mmkv';
import { ProfileStackScreenProps } from '$navigation/main/profile/model';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import { object, string } from 'zod';
import { useVerifyOTPMutation } from '$apis/otp';
import { useQueryClient } from '@tanstack/react-query';
import { useShowRootTabs } from '$hooks/use-show-root-tabs';

const validationSchema = object({
  otp: string({ required_error: 'Code is required field' }).length(
    4,
    'should be 4 digits'
  ),
});

export type MainProfileOTPScreenProps = {
  //
};

export const MainProfileOTPScreen: React.FC<MainProfileOTPScreenProps> = () => {
  useShowRootTabs();

  const { navigate } = useNavigation();
  const queryClient = useQueryClient();

  const verifyOTPMutation = useVerifyOTPMutation();

  const methods = useForm({
    defaultValues: {
      otp: '',
    },
    resolver: zodResolver(validationSchema),
  });

  const {
    params: { phone, otp },
  } = useRoute<ProfileStackScreenProps<'OTP'>['route']>();

  const theme = useAppTheme();

  const handleSubmit = methods.handleSubmit(async value => {
    try {
      const {
        verifyOtp: { accessToken, refreshToken },
        // TODO: user values.otp later
      } = await verifyOTPMutation.mutateAsync({
        verifyOTPPayload: { otp, phoneNumber: phone },
      });

      storage.accessToken.set(accessToken);
      storage.refreshToken.set(refreshToken);

      queryClient.invalidateQueries({ queryKey: ['MeQuery'] });

      navigate('Main', {
        screen: 'Profile',
        params: {
          screen: 'Account',
          params: {
            screen: 'AccountMain',
            params: {},
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
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
            navigate('Main', {
              screen: 'Profile',
              params: { screen: 'SignUp', params: {} },
            });
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
