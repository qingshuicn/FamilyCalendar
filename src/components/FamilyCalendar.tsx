import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import io from 'socket.io-client';
import { SERVER_URL } from 'react-native-dotenv';
import styles from '../styles/FamilyCalendarStyles';
import MonthView from './MonthView';
import RoleSelector from './RoleSelector';
import Timeline from './Timeline';
import AddEvent from './AddEvent';
import { formatDate } from '../utils/dateUtils';

// 定义事件接口
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

const FamilyCalendar: React.FC = () => {
  // 状态定义
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeRole, setActiveRole] = useState('全家');
  const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on('connect', () => {
      console.log('已连接到服务器');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('与服务器断开连接');
      setIsConnected(false);
    });

    socket.on('initialEvents', (initialEvents: Event[]) => {
      setEvents(initialEvents);
    });

    socket.on('newEvent', (newEvent: Event) => {
      setEvents(prevEvents => [...prevEvents, newEvent]);
    });

    // 添加测试事件监听
    socket.on('testEvent', (data) => {
      console.log('收到测试事件:', data);
      setTestMessage(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // 日期变更处理函数
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // 事件添加处理函数
  const handleEventAdded = (newEvent: Event) => {
    setIsAddEventModalVisible(false);
    // 这里可以添加其他逻辑，比如刷新事件列表
  };

  // 触发测试事件
  const triggerTestEvent = () => {
    const socket = io(SERVER_URL);
    socket.emit('requestTestEvent');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSidebar}>
        <View style={styles.dateNavigation}>
          <TouchableOpacity onPress={() => changeDate(-1)}>
            <Text style={styles.navigationButton}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCurrentDate(new Date())}>
            <Text style={styles.todayButton}>今天</Text>
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
          <Text style={styles.connectionStatus}>
            {isConnected ? '已连接' : '未连接'}
          </Text>
          {testMessage && (
            <Text style={styles.testMessage}>测试消息: {testMessage}</Text>
          )}
          <RoleSelector activeRole={activeRole} onRoleChange={setActiveRole} />
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setIsAddEventModalVisible(true)}
          >
            <Text style={styles.addButtonText}>+ 添加日程</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.testButton}
            onPress={triggerTestEvent}
          >
            <Text style={styles.testButtonText}>触发测试事件</Text>
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
            <AddEvent onEventAdded={handleEventAdded} />
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