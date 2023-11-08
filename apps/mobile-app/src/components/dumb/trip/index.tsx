import { MaterialCommunityIcon } from '$components/icons';
import { spacing } from '$theme/spacing';
import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, CardProps, Divider, IconButton, Text } from 'react-native-paper';
import { format } from 'date-fns';
import { useAppTheme } from '$theme/hook';
import { TripCardModel } from '$fragments/trip-card';

export type TripProps = TripCardModel & {
  joined?: boolean | null;

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

  joined,
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
    <Card {...props} id={undefined}>
      <Card.Content style={styles.cardContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcon name='car' size={24} color={theme.colors.primary} />
          <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
            {pickupAddress.addressLineOne ?? 'Unknown Destination'}
          </Text>
        </View>

        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg }}
        >
          <MaterialCommunityIcon
            name='flag-checkered'
            size={24}
            color={theme.colors.primary}
          />
          <Text variant='titleMedium' style={{ marginLeft: spacing.md, flex: 1 }}>
            {dropoffAddress.addressLineOne ?? 'Unknown Destination'}
          </Text>
        </View>

        {onClose && (
          <IconButton
            icon='close'
            style={{ position: 'absolute', top: 0, right: 0 }}
            size={18}
            onPress={onClose}
          />
        )}

        <Divider style={{ marginVertical: spacing.sm }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon
              name='clock-time-four-outline'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md }}>
              {formattedTime}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon
              name='car-seat'
              size={24}
              color={theme.colors.primary}
            />
            <Text variant='titleMedium' style={{ marginLeft: spacing.md }}>
              {emptySeatsCount} Seats left
            </Text>
          </View>
        </View>
      </Card.Content>
      <Card.Actions style={{ marginTop: spacing.lg }}>
        <Button mode='text' onPress={onJoin} disabled={!!joined || emptySeatsCount === 0}>
          {joined ? 'Joined' : 'Join'}
        </Button>
        <Button mode='outlined' onPress={onShowMore}>
          Show More
        </Button>
      </Card.Actions>
    </Card>
  );
});

const styles = StyleSheet.create({
  cardContent: {
    rowGap: spacing.md,
  },
});
