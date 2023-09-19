import { TextField } from '$components/fields/text';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { useNavigation } from '@react-navigation/native';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Button, Divider, IconButton, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export type MainProfileSignUpScreenProps = {
  //
};

export const MainProfileSignUpScreen: React.FC<MainProfileSignUpScreenProps> = () => {
  const methods = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const { navigate } = useNavigation();

  const theme = useTheme();

  const handleSubmit = methods.handleSubmit(values => {
    console.log(values);
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
        <TextField
          name='fullName'
          label='Full Name'
          rules={{ required: 'Full Name is required' }}
          style={{ marginTop: spacing.xxl }}
        />
        <TextField
          name='email'
          label='Email'
          rules={{ required: 'Email is required' }}
          style={{ marginTop: spacing.lg }}
        />
        <TextField
          name='password'
          label='Password'
          rules={{ required: 'Email is required' }}
          style={{ marginTop: spacing.lg }}
        />
      </FormProvider>

      <Button
        mode='contained'
        onPress={handleSubmit}
        style={{
          borderRadius: theme.roundness,
          padding: spacing.sm,
          marginTop: spacing.xl,
        }}
      >
        <Text variant='bodyLarge' style={{ color: theme.colors.onPrimary }}>
          Sign Up
        </Text>
      </Button>
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
            navigate('Main', { screen: 'Profile', params: { screen: 'Login' } })
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
