import { addEventListener } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

onlineManager.setEventListener(setOnline => {
  return addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});
