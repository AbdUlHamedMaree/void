import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

export type MessageBarProps = {
  messageBoxText?: string;

  onSend?: () => void;
  onVoiceClick?: () => void;
  onMessageBoxChangeText?: (text: string) => void;
};

export const MessageBar: React.FC<MessageBarProps> = ({
  messageBoxText,

  onSend,
  onVoiceClick,
  onMessageBoxChangeText,
}) => {
  const theme = useAppTheme();

  const showSendIcon = useMemo(() => !!messageBoxText?.trim(), [messageBoxText]);

  const textInputAnimatedStyle = useAnimatedStyle(() => ({
    left: withTiming(showSendIcon ? 0 : 60),
  }));

  return (
    <View
      style={[
        styles.wrapper,
        commonStyles.screenVerticalPadding,
        commonStyles.screenHorizontalPadding,
        { paddingTop: 8 },
      ]}
    >
      <IconButton
        icon='microphone'
        onPress={!showSendIcon ? onVoiceClick : undefined}
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        style={styles.voiceIconButton}
      />
      <Animated.View style={[textInputAnimatedStyle, styles.textInputWrapper]}>
        <TextInput
          mode='outlined'
          placeholder='Message'
          outlineColor='transparent'
          activeOutlineColor='transparent'
          value={messageBoxText}
          onChangeText={onMessageBoxChangeText}
          returnKeyType='send'
          onSubmitEditing={showSendIcon ? onSend : undefined}
          style={styles.textInput}
          outlineStyle={[
            styles.outlineTextInput,
            {
              backgroundColor: theme.colors.elevation.level3,
            },
          ]}
        />
      </Animated.View>
      <IconButton
        icon='arrow-up'
        onPress={showSendIcon ? onSend : undefined}
        iconColor={theme.colors.onPrimaryContainer}
        containerColor={theme.colors.primaryContainer}
        style={styles.sendIconButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textInputWrapper: {
    flex: 1,
    height: 44,
  },
  textInput: {
    flex: 1,
    height: 44,
  },
  outlineTextInput: {
    borderRadius: 28,
  },
  sendIconButton: {
    margin: 0,
    zIndex: -1,
  },
  voiceIconButton: {
    margin: 0,
    marginRight: -60,
  },
});
