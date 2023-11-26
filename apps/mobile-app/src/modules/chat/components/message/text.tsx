import { Image, StyleSheet, View } from 'react-native';
import { TextMessageModel } from '$modules/chat/models/message';
import { useAppTheme } from '$theme/hook';
import { Text } from 'react-native-paper';
import { useMemo } from 'react';
import { BaseMessageProps } from '.';
import Animated, { FadeIn } from 'react-native-reanimated';

export type TextMessageProps = TextMessageModel & BaseMessageProps;

export const TextMessage: React.FC<TextMessageProps> = ({ wrapperProps, ...message }) => {
  const theme = useAppTheme();

  const backgroundColor = useMemo(
    () =>
      message.sended ? theme.colors.secondaryContainer : theme.colors.tertiaryContainer,
    [message.sended, theme.colors.secondaryContainer, theme.colors.tertiaryContainer]
  );

  const color = useMemo(
    () =>
      message.sended
        ? theme.colors.onSecondaryContainer
        : theme.colors.onTertiaryContainer,
    [message.sended, theme.colors.onSecondaryContainer, theme.colors.onTertiaryContainer]
  );

  const flexDirection = message.sended ? 'row-reverse' : 'row';

  const hideProfilePicture = message.sended;

  return (
    <Animated.View
      entering={FadeIn}
      {...wrapperProps}
      style={[
        styles.wrapper,
        {
          flexDirection,
        },
        wrapperProps?.style,
      ]}
    >
      {!hideProfilePicture && (
        <Image source={{ uri: message.senderPicture }} style={styles.profilePicture} />
      )}
      <View
        style={[
          styles.messageTextWrapper,
          {
            backgroundColor,
          },
        ]}
      >
        <Text
          variant='bodyLarge'
          style={{
            color,
          }}
        >
          {message.content}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    gap: 8,
  },
  profilePicture: {
    width: 44,
    height: 44,
    borderRadius: 24,
    flex: 0,
  },
  messageTextWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 22,

    minHeight: 44,
    flexShrink: 1,

    justifyContent: 'center',
  },
});
