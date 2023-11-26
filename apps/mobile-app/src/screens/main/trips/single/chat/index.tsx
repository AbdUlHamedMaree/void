import { ScreenWrapper } from '$components/smart/screen-wrapper';
import { graphql } from '$gql';
import { useHideRootTabs } from '$hooks/use-hide-root-tabs';
import { useGraphQlSubscription } from '$libs/graphql-ws/hook';
import { ChatApp } from '$modules/chat';
import { MessageModel } from '$modules/chat/models/message';
import { useMemo, useRef, useState } from 'react';

const MessageDocument = graphql(`
  subscription Message {
    messageReceivedOnAChat {
      chatId
      tripId
      fromUser {
        id
        name
      }
      message
      createdAt
    }
  }
`);

export type ChatSingleTripsMainScreenProps = {
  //
};

export const ChatSingleTripsMainScreen: React.FC<ChatSingleTripsMainScreenProps> = () => {
  useHideRootTabs();

  const unsubscribe = useGraphQlSubscription(
    MessageDocument,
    useMemo(
      () => ({
        onData: console.log,
        onError: console.error,
        onResult: console.log,
        onUnknownError: console.error,
        onComplete: () => console.log('complete'),
      }),
      []
    )
  );

  const idRef = useRef(1);
  const sendedRef = useRef(false);

  const [messageBoxText, setMessageBoxText] = useState('');

  const [messages, setMessages] = useState<MessageModel[]>([
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: true,
    },
    {
      id: idRef.current++,
      type: 'text',
      content: 'Hey Brother',
      sender: 'Ahmad',
      senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
      sended: false,
    },
  ]);

  return (
    <ScreenWrapper disablePadding>
      <ChatApp
        messages={messages}
        messageBoxText={messageBoxText}
        onMessageBoxChangeText={setMessageBoxText}
        onSend={() => {
          setMessages(v => [
            ...v,
            {
              id: idRef.current++,
              type: 'text',
              content: messageBoxText,
              sended: (sendedRef.current = Math.random() > 0.5),
              sender: 'Ahmad',
              senderPicture: `https://randomuser.me/api/portraits/lego/6.jpg`,
            },
          ]);
          setMessageBoxText('');
        }}
      />
    </ScreenWrapper>
  );
};
