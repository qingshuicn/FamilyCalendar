import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <View style={styles.container}>
      {events.map((event) => (
        <View key={event.id} style={styles.eventItem}>
          <Text style={styles.eventTime}>{event.time}</Text>
          <Text style={styles.eventTitle}>{event.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  eventItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  eventTime: {
    width: 50,
    fontWeight: 'bold',
  },
  eventTitle: {
    flex: 1,
  },
});

export default Timeline;