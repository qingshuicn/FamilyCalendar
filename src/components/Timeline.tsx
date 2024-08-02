import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles/FamilyCalendarStyles';

const Timeline: React.FC = () => {
  return (
    <ScrollView style={styles.timeline}>
      {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
        <View key={hour} style={styles.timeSlot}>
          <Text style={styles.timeText}>
            {`${hour.toString().padStart(2, '0')}:00`}
          </Text>
          <View style={styles.eventContainer}>
            {/* 这里可以添加实际的日程内容 */}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Timeline;