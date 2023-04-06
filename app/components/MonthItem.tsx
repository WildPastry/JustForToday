/* eslint-disable */
import { IMonthItems } from '../types/date.types';
import { Pressable } from 'react-native';
import { IDayItems } from '../types/date.types';
import { Text } from './Themed';
import DayItem from '../components/DayItem';
import { useState } from 'react';

const MonthItem: React.FC<IMonthItems> = (props: IMonthItems): JSX.Element => {
  // Data local state
  const [days, setDays] = useState<IDayItems[]>([]);

  const handleDayClick = (day: IDayItems): void => {
    console.log(day);
  };
  return (
    <Pressable onPress={props.onPress}>
      <Text>{props.id}</Text>
      {days.map((day, index) => (
        <DayItem
          key={index}
          id={day.id}
          name={day.name}
          onPress={() => handleDayClick(day)}
        />
      ))}
    </Pressable>
  );
};

export default MonthItem;
