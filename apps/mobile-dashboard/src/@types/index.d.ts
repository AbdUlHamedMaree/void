import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: Required<typeof Reactotron>;
  }
}
