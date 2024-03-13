import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { EDateFormat, IDate } from '../types/date.types';
import { Text, View } from './styles/Themed';
import { add, format } from 'date-fns';
import { setSelectedDate, setSelectedDay } from '../redux/slices/dateSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import Fonts from '../constants/Fonts';
import { IDeviceSize } from '../types/generic.types';
import { IReflection } from '../types/data.types';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

const Reflection: React.FC = (): JSX.Element => {
  // Component settings
  const dispatch = useAppDispatch();
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const [reflection, setReflection] = useState<IReflection>({
    id: '',
    date: '',
    title: '',
    quote: '',
    source: '',
    reflection: ''
  });

  // Data from store
  const reflections: IReflection[] = useAppSelector(
    (state: AppState): IReflection[] => {
      return state.data.reflections;
    }
  );

  const dates: IDate = useAppSelector((state: AppState): IDate => {
    return state.date;
  });

  // Effect for setting the current reflection based on date
  useEffect(() => {
    selectReflection(dates.selectedDay, reflections);
  }, [reflections]);

  const getPrevDay = (): string => {
    // Calculate previous day
    const currentDate = new Date(dates.selectedDate);
    const prevDate = add(currentDate, { days: -1 });
    const prevDay = format(prevDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(prevDate.getTime()));
    dispatch(setSelectedDay(prevDay));
    return prevDay;
  };

  const getNextDay = (): string => {
    // Calculate next day
    const currentDate = new Date(dates.selectedDate);
    const nextDate = add(currentDate, { days: 1 });
    const nextDay = format(nextDate, EDateFormat.ddMM);
    // Update store
    dispatch(setSelectedDate(nextDate.getTime()));
    dispatch(setSelectedDay(nextDay));
    return nextDay;
  };

  // Select the reflection from the data
  const selectReflection = (id: string, reflections: IReflection[]): void => {
    const currentReflection = reflections.find((reflection) => {
      return reflection.id === id;
    });
    // If a matching reflection is found - set with matched data
    if (currentReflection) {
      setReflection({
        id: currentReflection.id,
        date: currentReflection.date,
        title: currentReflection.title,
        quote: currentReflection.quote,
        source: currentReflection.source,
        reflection: verifyData(currentReflection.reflection)
      });
      // Set a blank reflection otherwise
    } else {
      setReflection({
        id: '',
        date: '',
        title: 'No data available',
        quote: '',
        source: '',
        reflection: ''
      });
    }
  };

  // Verify if the data needs new lines inserted
  const verifyData = (data: string): string => {
    // Create pattern to find new line symbol {}
    const newLineSymbol = /\{(?<DATA>.*?)\}/gu;
    // Replace symbols with new lines
    const verifiedData = data.replace(newLineSymbol, '\n\n');
    return verifiedData;
  };

  return (
    <View>
      {/* Controls */}
      <View style={styles.controls}>
        {/* Left chevron */}
        <Pressable
          style={styles.icon}
          onPress={() => selectReflection(getPrevDay(), reflections)}>
          <FontAwesome
            name='chevron-circle-left'
            size={Fonts[deviceSize].icon}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={[styles.date, Fonts[deviceSize].date]}>
            {reflection.date}
          </Text>
        </View>
        {/* Right chevron */}
        <Pressable
          style={styles.icon}
          onPress={() => selectReflection(getNextDay(), reflections)}>
          <FontAwesome
            style={styles.textRight}
            name='chevron-circle-right'
            size={Fonts[deviceSize].icon}
            color={Colours[colorScheme].icon}
          />
        </Pressable>
      </View>
      {/* Reflection */}
      <Text style={[styles.boldTitle, Fonts[deviceSize].boldTitle]}>
        {reflection.title}
      </Text>
      <Text style={[styles.quote, Fonts[deviceSize].quote]}>
        {reflection.quote}
      </Text>
      <Text style={[styles.text, Fonts[deviceSize].text]}>
        {reflection.reflection}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10
  },
  icon: {
    justifyContent: 'center',
    paddingVertical: 10,
    width: '25%'
  },
  dateContainer: {
    justifyContent: 'center',
    paddingVertical: 10
  },
  date: {
    textAlignVertical: 'center'
  },
  text: {
    marginBottom: 20,
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  boldTitle: {
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 20,
    textAlign: 'center'
  },
  quote: {
    fontWeight: '200',
    marginBottom: 20,
    textAlign: 'left'
  }
});

export default Reflection;
