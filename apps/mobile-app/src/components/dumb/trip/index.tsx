import { MaterialCommunityIcon } from '$components/icons';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, CardProps, Divider, IconButton, Text } from 'react-native-paper';
import { format } from 'date-fns';
import { useAppTheme } from '$theme/hook';

export type TripProps = {
  source?: string | null;
  dest?: string | null;
  time?: Date | null;
  emptySeatsCount?: number | null;

  disableJoinButton?: boolean | null;

  onJoin?: () => void;
  onShowMore?: () => void;
  onClose?: () => void;
} & Omit<CardProps, 'children' | 'mode' | 'elevation' | 'id'>;

export const Trip = memo<TripProps>(function Trip({
  source,
  dest,
  time,
  emptySeatsCount,
  disableJoinButton,
  onJoin,
  onShowMore,
  onClose,
  ...props
}) {
  const formatedTime = useMemo(
    () => (time ? format(time, 'Pp') : 'Unknown Time'),
    [time]
  );

  const theme = useAppTheme();

  return (
    <Card {...props}>
      <Card.Content style={styles.cardContent}>
        <Text variant='titleMedium'>{source ?? 'Unknown Source'}</Text>

        <MaterialCommunityIcon
          name='arrow-down'
          color={theme.colors.text}
          size={24}
          style={commonStyles.textCenter}
        />

        <Text variant='titleMedium'>{dest ?? 'Unknown Destination'}</Text>

        {onClose && (
          <IconButton
            icon='close'
            style={{ position: 'absolute', top: 0, right: 0 }}
            size={18}
            onPress={onClose}
          />
        )}

        <Divider />

        <Text variant='titleMedium'>{formatedTime}</Text>

        <Text variant='titleMedium'>{emptySeatsCount} Seats left</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onJoin} disabled={!!disableJoinButton}>
          Join
        </Button>
        <Button onPress={onShowMore}>Show More</Button>
      </Card.Actions>
    </Card>
  );
});

const styles = StyleSheet.create({
  cardContent: {
    rowGap: spacing.md,
  },
});
