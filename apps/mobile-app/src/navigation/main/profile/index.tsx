import React from 'react';
import { ProfileStackNavigator } from './navigator';
import { MainProfileLoginScreen } from '$screens/main/profile/login';
import { MainProfileSignUpScreen } from '$screens/main/profile/sign-up';
import { MainProfileOTPScreen } from '$screens/main/profile/otp';
import { useMeQuery } from '$apis/user';
import { LoadingSection } from '$components/dumb/loading-section';
import { MainProfileAccountStackNavigation } from './account';

export const ProfileStackNavigation: React.FC = () => {
  const { data, isLoading } = useMeQuery();

  if (isLoading) return <LoadingSection loading />;

  return (
    <ProfileStackNavigator.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={data ? 'Account' : 'Login'}
    >
      <ProfileStackNavigator.Screen name='Login' component={MainProfileLoginScreen} />
      <ProfileStackNavigator.Screen name='SignUp' component={MainProfileSignUpScreen} />
      <ProfileStackNavigator.Screen
        name='Account'
        component={MainProfileAccountStackNavigation}
      />
      <ProfileStackNavigator.Screen name='OTP' component={MainProfileOTPScreen} />
    </ProfileStackNavigator.Navigator>
  );
};
