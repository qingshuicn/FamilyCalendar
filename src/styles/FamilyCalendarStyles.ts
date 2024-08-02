import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // 主容器样式
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  // 左侧栏样式
  leftSidebar: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    padding: 10,
  },

  // 日期导航样式
  dateNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  navigationButton: {
    fontSize: 24,
    color: '#000000',
  },
  todayButton: {
    fontSize: 16,
    color: '#4A0E4E',
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
  },

  // 月视图日历样式
  monthView: {
    marginBottom: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 5,
  },
  calendarHeaderText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calendarDay: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayText: {
    color: '#000000',
  },
  currentDay: {
    backgroundColor: '#4A0E4E',
    borderRadius: 12.5,
  },
  currentDayText: {
    color: '#FFFFFF',
  },

  // 搜索输入框样式
  searchInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
    color: '#000000',
  },

  // 主内容区样式
  mainContent: {
    flex: 1,
  },
  header: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },

  // 角色选择器样式
  roleSelector: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  roleCard: {
    paddingHorizontal: 15,
    height: 28,
    paddingVertical: 4,
    borderRadius: 10, // 只有上左和上右圆角为20
    borderBottomLeftRadius: 0, // 下左圆角为0
    borderBottomRightRadius: 0, // 下右圆角为0
    marginRight: 10,
    backgroundColor: '#F0F0F0',
    // 卡片阴影效果
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  activeRoleCard: {
    backgroundColor: '#4A0E4E',
  },
  roleText: {
    color: '#000000',
    fontWeight: '500',
  },
  activeRoleText: {
    color: '#FFFFFF',
  },

  // 添加日程按钮样式
  addButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#4A0E4E',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#FFFFFF',
  },

  // 时间线样式
  timeline: {
    flex: 1,
  },
  timeSlot: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  timeText: {
    width: 50,
    textAlign: 'right',
    marginRight: 10,
    color: '#000000',
  },
  eventContainer: {
    flex: 1,
  },
});

export default styles;