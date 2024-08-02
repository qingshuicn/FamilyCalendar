import React from 'react';
import { SafeAreaView } from 'react-native';
import FamilyCalendar from './src/components/FamilyCalendar';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FamilyCalendar />
    </SafeAreaView>
  );
};

export default App;