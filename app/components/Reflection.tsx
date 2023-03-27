import { Text, View } from './Themed';
import { AppState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

const Reflection: React.FC = (): JSX.Element => {
  const dailyReflection = useAppSelector((state: AppState): any => {
    return state.data;
  });

  const [current, setCurrent] = useState(null);

  useEffect((): void => {
    const data = dailyReflection;
    setCurrent(data[1]);
    console.log(data[1])
  }, []);

  return (
    <View>
      <Text>{current}</Text>
    </View>
  );
};

export default Reflection;
