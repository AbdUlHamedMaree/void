import { MaterialCommunityIcon } from '$components/icons';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, CardProps, Divider, IconButton, Text } from 'react-native-paper';
import { format } from 'date-fns';
import { useAppTheme } from '$theme/hook';
import { TripCardModel } from '$fragments/trip-card';

export type TripProps = TripCardModel & {
  disableJoinButton?: boolean | null;

  onJoin?: () => void;
  onShowMore?: () => void;
  onClose?: () => void;
} & Omit<CardProps, 'children' | 'mode' | 'elevation' | 'id'>;

export const Trip = memo<TripProps>(function Trip({
  capacity,
  occupiedSeats,
  plannedAt,
  pickupAddress,
  dropoffAddress,

  disableJoinButton,
  onJoin,
  onShowMore,
  onClose,
  ...props
}) {
  const time = useMemo(() => new Date(plannedAt), [plannedAt]);

  const formattedTime = useMemo(
    () => (time ? format(time, 'Pp') : 'Unknown Time'),
    [time]
  );

  const emptySeatsCount = (capacity ?? 1) - (occupiedSeats ?? 1);

  const theme = useAppTheme();

  return (
    <Card {...props}>
      <Card.Content style={styles.cardContent}>
        <Text variant='titleMedium'>
          {pickupAddress.addressLineOne ?? 'Unknown Source'}
        </Text>

        <MaterialCommunityIcon
          name='arrow-down'
          color={theme.colors.text}
          size={24}
          style={commonStyles.textCenter}
        />

        <Text variant='titleMedium'>
          {dropoffAddress.addressLineOne ?? 'Unknown Destination'}
        </Text>

        {onClose && (
          <IconButton
            icon='close'
            style={{ position: 'absolute', top: 0, right: 0 }}
            size={18}
            onPress={onClose}
          />
        )}

        <Divider />

        <Text variant='titleMedium'>{formattedTime}</Text>

        <Text variant='titleMedium'>{emptySeatsCount} Seats left</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onJoin} disabled={!!disableJoinButton || emptySeatsCount === 0}>
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
