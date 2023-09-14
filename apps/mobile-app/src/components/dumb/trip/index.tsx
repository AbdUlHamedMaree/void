import { MaterialCommunityIcon } from '$components/icons';
import { commonStyles } from '$styles/common';
import { spacing } from '$theme/spacing';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { format } from 'date-fns';

export type TripProps = {
  source?: string;
  dest?: string;
  time?: Date;
  emptySeatsCount?: number;
};

export const Trip: React.FC<TripProps> = ({ source, dest, time, emptySeatsCount }) => {
  return (
    <Card>
      <Card.Content style={styles.cardContent}>
        <Text variant='titleMedium'>{source ?? 'Unknown Source'}</Text>

        <MaterialCommunityIcon
          name='arrow-down'
          size={24}
          style={commonStyles.textCenter}
        />

        <Text variant='titleMedium'>{dest ?? 'Unknown Destination'}</Text>

        <Divider />

        <Text variant='titleMedium'>{time ? format(time, 'Pp') : 'Unknown Time'}</Text>

        <Text variant='titleMedium'>{emptySeatsCount} Seats left</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => {}}>Join</Button>
        <Button onPress={() => {}}>Show More</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContent: {
    rowGap: spacing.md,
  },
});
