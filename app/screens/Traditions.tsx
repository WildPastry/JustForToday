import { ETraditionTypes, ITraditions } from '../types/data.types';
import ForwardedScrollView, { Text, View } from '../components/styles/Themed';
import { Pressable, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Tradition from '../components/layout/Tradition';
import globlStyles from './../constants/styles';
import { useAppSelector } from '../redux/hooks';
import { useFocusEffect } from '@react-navigation/native';

const Traditions: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const [traditionType, setTraditionType] = useState(ETraditionTypes.short);

  // Data from store
  const traditions: ITraditions = useAppSelector(
    (state: AppState): ITraditions => {
      return state.data.traditions;
    }
  );

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      return () => null;
    }, [scrollViewRef])
  );

  return (
    <ForwardedScrollView
      contentContainerStyle={globlStyles.mainContainer}
      ref={scrollViewRef}>
      {/* Controls */}
      <View style={styles.controls}>
        <Pressable onPress={() => setTraditionType(ETraditionTypes.short)}>
          <Text>SHORT</Text>
        </Pressable>
        <Pressable onPress={() => setTraditionType(ETraditionTypes.long)}>
          <Text>LONG</Text>
        </Pressable>
      </View>
      {/* Traditions */}
      {traditions[traditionType].map((tradition, index) => (
        <Tradition
          key={index}
          id={tradition.id}
          tradition={tradition.tradition}
        />
      ))}
    </ForwardedScrollView>
  );
};

const styles = StyleSheet.create({
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});

export default Traditions;
