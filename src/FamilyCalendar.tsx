import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import styles from './FamilyCalendarStyles';

const MonthView: React.FC<{ currentDate: Date; onDateSelect: (date: Date) => void }> = ({ currentDate, onDateSelect }) => {
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

const FamilyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeRole, setActiveRole] = useState('全家');

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const roles = ['全家', '爸爸', '妈妈', '哥哥', '弟弟', '阿姨'];

  return (
    <View style={styles.container}>
      <View style={styles.leftSidebar}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={() => changeDate(-1)}>
            <Text style={styles.navigationButton}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
            <Text style={styles.todayButton}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeDate(1)}>
            <Text style={styles.navigationButton}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <MonthView currentDate={currentDate} onDateSelect={setCurrentDate} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="搜索日程..." 
          placeholderTextColor="#000" 
        />
      </View>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.headerText}>家庭日程</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.roleSelector}
          >
            {roles.map((role) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleCard, 
                  activeRole === role && styles.activeRoleCard
                ]}
                onPress={() => setActiveRole(role)}
              >
                <Text style={[
                  styles.roleText, 
                  activeRole === role && styles.activeRoleText
                ]}>{role}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ 添加日程</Text>
          </TouchableOpacity>
        </View>
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
      </View>
    </View>
  );
};

export default FamilyCalendar;