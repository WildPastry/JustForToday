import { Text, View } from './Themed';
import { AppState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { useState, useEffect } from 'react';

const Reflection: React.FC = (): JSX.Element => {
  // const dailyReflection = useAppSelector((state: AppState): DailyReflections => {
  //   return state.data;
  // });

  // const [current, setCurrent] = useState(null);

  // useEffect((): void => {
  //   const data = dailyReflection;
  //   setCurrent(data.dailyReflections[1]);
  //   console.log(data.dailyReflections[1])
  // }, []);

  return (
    <View>
      <Text>REFLECTION</Text>
    </View>
  );
};

export default Reflection;
