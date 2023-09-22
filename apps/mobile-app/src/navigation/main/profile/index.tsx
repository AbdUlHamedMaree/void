import React from 'react';
import { ProfileStackNavigator } from './navigator';
import { useAtomValue } from 'jotai';
import { userAtom } from '$atoms/user';
import { MainProfileLoginScreen } from '$screens/main/profile/login';
import { MainProfileSignUpScreen } from '$screens/main/profile/sign-up';
import { MainProfileAccountScreen } from '$screens/main/profile/account';
import { MainProfileOTPScreen } from '$screens/main/profile/otp';

export const ProfileStackNavigation: React.FC = () => {
  const user = useAtomValue(userAtom);

  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={user ? 'Account' : 'Login'}
    >
      <ProfileStackNavigator.Screen name='Login' component={MainProfileLoginScreen} />
      <ProfileStackNavigator.Screen name='SignUp' component={MainProfileSignUpScreen} />
      <ProfileStackNavigator.Screen name='Account' component={MainProfileAccountScreen} />
      <ProfileStackNavigator.Screen name='OTP' component={MainProfileOTPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};
