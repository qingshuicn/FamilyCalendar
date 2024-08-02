import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { SERVER_URL } from 'react-native-dotenv';

// 定义事件接口
interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
}

// 定义组件属性接口
interface AddEventProps {
  onEventAdded: (event: Event) => void;
}

const AddEvent: React.FC<AddEventProps> = ({ onEventAdded }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // 处理添加事件
  const handleAddEvent = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          date,
          time,
        }),
      });

      if (response.ok) {
        const newEvent = await response.json();
        onEventAdded(newEvent);
        setTitle('');
        setDate('');
        setTime('');
      } else {
        console.error('添加事件失败');
      }
    } catch (error) {
      console.error('添加事件时出错:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="事件标题"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="日期 (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="时间 (HH:MM)"
        value={time}
        onChangeText={setTime}
      />
      <Button title="添加事件" onPress={handleAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddEvent;