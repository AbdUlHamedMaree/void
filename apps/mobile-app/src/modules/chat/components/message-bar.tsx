import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { toast } from '$modules/react-native-paper-toast';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { spacing } from '$theme/spacing';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

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

  const [test, setTest] = useState('');

  const [isPressed, setIsPressed] = useState(false);
  const [recordInput, setRecordInput] = useState(false);
  const [playerStatus, setPlayerStatus] = useState<'paused' | 'playing'>('paused');
  const [meters, setMeters] = useState<number[]>([]);

  const showSendIcon = useMemo(() => {
    if (recordInput && !isPressed) return true;

    return !!messageBoxText?.trim();
  }, [isPressed, messageBoxText, recordInput]);

  const textInputAnimatedStyle = useAnimatedStyle(() => ({
    left: withTiming(showSendIcon ? 0 : 60),
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isPressed ? 2 : 1) }],
  }));

  const onRecordStart = useCallback(async () => {
    setIsPressed(true);
    try {
      const result = await request(PERMISSIONS.ANDROID.RECORD_AUDIO);

      if (result !== RESULTS.GRANTED) {
        toast.warning('Permission required');
        return;
      }

      setRecordInput(true);

      const toLog = await audioRecorderPlayer.startRecorder(undefined, undefined, true);

      audioRecorderPlayer.addRecordBackListener(e => {
        setTest(audioRecorderPlayer.mmss(Math.floor(e.currentPosition)));
        setMeters(v => [...v, e.currentMetering!]);
        console.log(e.currentMetering);
        return;
      });
      console.log(toLog);
    } catch (err) {
      setIsPressed(false);
      console.error(err);
    }
  }, []);

  const onRecordEnd = useCallback(async () => {
    const result = await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();

    console.log(result);
    setIsPressed(false);
  }, []);

  return (
    <View
      style={[
        styles.wrapper,
        commonStyles.screenVerticalPadding,
        commonStyles.screenHorizontalPadding,
        { paddingTop: 8 },
      ]}
    >
      <AnimatedIconButton
        icon='microphone'
        onPress={!showSendIcon ? onVoiceClick : undefined}
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        onPressIn={onRecordStart}
        onPressOut={onRecordEnd}
        style={[styles.voiceIconButton, animatedStyles]}
      />
      <Animated.View
        style={[textInputAnimatedStyle, styles.textInputWrapper, { height: 44 }]}
      >
        {recordInput ? (
          <View
            style={{
              flex: 1,
              borderRadius: 28,
              flexDirection: 'row',
              backgroundColor: theme.colors.elevation.level3,
              alignItems: 'center',
              paddingVertical: 22 + spacing.sm,
              paddingHorizontal: spacing.sm,
            }}
          >
            {!isPressed && (
              <>
                <IconButton
                  icon={playerStatus !== 'playing' ? 'play' : 'pause'}
                  onPress={async () => {
                    if (playerStatus !== 'playing') {
                      setPlayerStatus('playing');
                      await audioRecorderPlayer.startPlayer();
                      audioRecorderPlayer.addPlayBackListener(e => {});

                      return;
                    }

                    setPlayerStatus('paused');
                    await audioRecorderPlayer.pausePlayer();
                    audioRecorderPlayer.removePlayBackListener();
                  }}
                  style={{
                    margin: 0,
                  }}
                />
                <View style={{ flex: 1 }} />
                <IconButton
                  icon='close'
                  onPress={() => {
                    setRecordInput(false);
                  }}
                  style={{
                    margin: 0,
                  }}
                />
              </>
            )}
            {isPressed && (
              <>
                <Text>{test}</Text>
                {meters.map((meter, i) => (
                  <View
                    key={i}
                    style={{
                      height: 44 + meter,
                      backgroundColor: theme.colors.elevation.level1,
                      width: 5,
                    }}
                  />
                ))}
              </>
            )}
          </View>
        ) : (
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
        )}
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
