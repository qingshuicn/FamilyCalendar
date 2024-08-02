import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/FamilyCalendarStyles';

interface MonthViewProps {
  currentDate: Date;
  onDateSelect: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, onDateSelect }) => {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = ['日', '一', '二', '三', '四', '五', '六'];

  const renderCalendar = () => {
    const calendar = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(<View key={`empty-${j}`} style={styles.calendarDay} />);
        } else if (day > daysInMonth) {
          week.push(<View key={`empty-${day}`} style={styles.calendarDay} />);
        } else {
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          week.push(
            <TouchableOpacity
              key={day}
              style={[
                styles.calendarDay,
                date.getDate() === currentDate.getDate() ? styles.currentDay : null
              ]}
              onPress={() => onDateSelect(date)}
            >
              <Text style={[
                styles.calendarDayText,
                date.getDate() === currentDate.getDate() ? styles.currentDayText : null
              ]}>{day}</Text>
            </TouchableOpacity>
          );
          day++;
        }
      }
      calendar.push(<View key={i} style={styles.calendarWeek}>{week}</View>);
      if (day > daysInMonth) break;
    }
    return calendar;
  };

  return (
    <View style={styles.monthView}>
      <View style={styles.calendarHeader}>
        {days.map(day => (
          <Text key={day} style={styles.calendarHeaderText}>{day}</Text>
        ))}
      </View>
      {renderCalendar()}
    </View>
  );
};

export default MonthView;