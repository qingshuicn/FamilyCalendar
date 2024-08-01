import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FamilyCalendar from './src/FamilyCalendar';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FamilyCalendar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default App;