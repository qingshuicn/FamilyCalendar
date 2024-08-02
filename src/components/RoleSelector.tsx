import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/FamilyCalendarStyles';

interface RoleSelectorProps {
  activeRole: string;
  onRoleChange: (role: string) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ activeRole, onRoleChange }) => {
  const roles = ['全家', '爸爸', '妈妈', '哥哥', '弟弟', '阿姨'];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.roleSelector}>
      {roles.map((role) => (
        <TouchableOpacity
          key={role}
          style={[styles.roleCard, activeRole === role && styles.activeRoleCard]}
          onPress={() => onRoleChange(role)}
        >
          <Text style={[styles.roleText, activeRole === role && styles.activeRoleText]}>{role}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default RoleSelector;