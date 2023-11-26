import { MessageModel } from './models/message';
import { MessagesScreen } from './components/screens/messages';

export type ChatAppProps = {
  messageBoxText?: string;
  messages?: MessageModel[];

  onSend?: () => void;
  onMessageBoxChangeText?: (text: string) => void;
};

export const ChatApp: React.FC<ChatAppProps> = props => {
  return <MessagesScreen {...props} />;
};
