import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FamilyCalendar from '../src/components/FamilyCalendar';

jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

describe('FamilyCalendar', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<FamilyCalendar />);
    
    expect(getByText('Today')).toBeTruthy();
    expect(getByTestId('date-display')).toBeTruthy();
  });

  it('changes date when arrow buttons are pressed', () => {
    const { getByTestId, getAllByTestId } = render(<FamilyCalendar />);
    
    const dateDisplay = getByTestId('date-display');
    const initialDate = dateDisplay.props.children;
    
    const [leftArrow, rightArrow] = getAllByTestId('arrow-button');
    
    fireEvent.press(rightArrow);
    expect(dateDisplay.props.children).not.toBe(initialDate);
    
    fireEvent.press(leftArrow);
    expect(dateDisplay.props.children).toBe(initialDate);
  });

  it('resets to current date when Today button is pressed', () => {
    const { getByText, getByTestId } = render(<FamilyCalendar />);
    
    const todayButton = getByText('Today');
    fireEvent.press(todayButton);
    
    const currentDate = new Date();
    const expectedDateString = `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`;
    expect(getByTestId('date-display').props.children).toBe(expectedDateString);
  });

  it('renders MonthView component', () => {
    const { getByTestId } = render(<FamilyCalendar />);
    expect(getByTestId('month-view')).toBeTruthy();
  });

  it('renders Timeline component', () => {
    const { getByTestId } = render(<FamilyCalendar />);
    expect(getByTestId('timeline')).toBeTruthy();
  });
});