import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import styles from '../styles/FamilyCalendarStyles';
import MonthView from './MonthView';
import RoleSelector from './RoleSelector';
import Timeline from './Timeline';
import { formatDate } from '../utils/dateUtils';

const FamilyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeRole, setActiveRole] = useState('全家');

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

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
          <RoleSelector activeRole={activeRole} onRoleChange={setActiveRole} />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ 添加日程</Text>
          </TouchableOpacity>
        </View>
        <Timeline />
      </View>
    </View>
  );
};

export default FamilyCalendar;