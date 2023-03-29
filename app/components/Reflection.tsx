import { Text, View } from './Themed';
import { AppState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

const Reflection: React.FC = (): JSX.Element => {
  const dailyReflection = useAppSelector((state: AppState): DailyReflection[] => {
    return state.setReflections;
  });

  // const [current, setCurrent] = useState(null);

  useEffect((): void => {
    const data = dailyReflection;
    console.log(data)
  }, []);

  return (
    <View>
      <Text>REFLECTION</Text>
    </View>
  );
};

export default Reflection;
