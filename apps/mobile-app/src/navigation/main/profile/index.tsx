import React from 'react';
import { ProfileStackNavigator } from './navigator';
import { MainProfileLoginScreen } from '$screens/main/profile/login';
import { MainProfileSignUpScreen } from '$screens/main/profile/sign-up';
import { MainProfileAccountScreen } from '$screens/main/profile/account';
import { MainProfileOTPScreen } from '$screens/main/profile/otp';
import { useMeQuery } from '$apis/user';

export const ProfileStackNavigation: React.FC = () => {
  const { data, status } = useMeQuery();

  if (status === 'loading') return null;

  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={data ? 'Account' : 'Login'}
    >
      <ProfileStackNavigator.Screen name='Login' component={MainProfileLoginScreen} />
      <ProfileStackNavigator.Screen name='SignUp' component={MainProfileSignUpScreen} />
      <ProfileStackNavigator.Screen name='Account' component={MainProfileAccountScreen} />
      <ProfileStackNavigator.Screen name='OTP' component={MainProfileOTPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};
