import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import io from 'socket.io-client';
import styles from '../styles/FamilyCalendarStyles';
import MonthView from './MonthView';
import RoleSelector from './RoleSelector';
import Timeline from './Timeline';
import AddEvent from './AddEvent';
import { formatDate } from '../utils/dateUtils';

const SERVER_URL = 'http://your-server-ip:3000';  // Replace with your server's IP and port

const FamilyCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeRole, setActiveRole] = useState('全家');
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('initialEvents', (initialEvents) => {
      setEvents(initialEvents);
    });

    socket.on('newEvent', (newEvent) => {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  const handleEventAdded = (newEvent) => {
    setIsAddEventModalVisible(false);
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
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAddEventModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ 添加日程</Text>
          </TouchableOpacity>
        </View>
        <Timeline events={events} />
      </View>

      <Modal
        visible={isAddEventModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddEventModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AddEvent onEventAdded={handleEventAdded} serverUrl={SERVER_URL} />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setIsAddEventModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>关闭</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FamilyCalendar;