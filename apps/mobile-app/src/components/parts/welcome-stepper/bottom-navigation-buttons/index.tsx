import { isWelcomeStepperSkippedAtom } from '$atoms/is-welcome-stepper-skipped';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import { useAtom } from 'jotai/react';
import { View } from 'react-native';
import { Button, Checkbox } from 'react-native-paper';

export type WelcomeStepperBottomNavigationButtonsProps = {
  hidePrevButton?: boolean;
  hideNextButton?: boolean;
  hideSkipButton?: boolean;
  showFinishButton?: boolean;

  onNext?: () => void;
  onPrev?: () => void;
  onSkip?: () => void;
  onFinish?: () => void;
};

export const WelcomeStepperBottomNavigationButtons: React.FC<
  WelcomeStepperBottomNavigationButtonsProps
> = ({
  hidePrevButton,
  hideNextButton,
  hideSkipButton,
  showFinishButton,
  onNext,
  onPrev,
  onSkip,
  onFinish,
}) => {
  const [isWelcomeStepperSkipped, setIsWelcomeStepperSkipped] = useAtom(
    isWelcomeStepperSkippedAtom
  );

  const toggle = () => setIsWelcomeStepperSkipped(v => !v);

  return (
    <>
      <Checkbox.Item
        label="Don't show welcome stepper again"
        status={isWelcomeStepperSkipped ? 'checked' : 'unchecked'}
        onPress={toggle}
      />
      <View style={{ flexDirection: 'row', paddingTop: spacing.lg }}>
        <View style={commonStyles.flexFull}>
          {!hidePrevButton && <Button onPress={onPrev}>Previous</Button>}
        </View>
        <View style={commonStyles.flexFull}>
          {!hideSkipButton && <Button onPress={onSkip}>Skip</Button>}
        </View>

        <View style={commonStyles.flexFull}>
          {!hideNextButton && <Button onPress={onNext}>Next</Button>}
          {showFinishButton && <Button onPress={onFinish}>Finish</Button>}
        </View>
      </View>
    </>
  );
};
