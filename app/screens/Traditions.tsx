import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ETraditionTypes, ITraditions } from '../types/data.types';
import ForwardedScrollView, { Text, View } from '../components/styles/Themed';
import React, { useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Tradition from '../components/layout/Tradition';
import globalStyles from '../constants/globalStyles';
import itemStates from '../constants/itemStates';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Traditions: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const [traditionType, setTraditionType] = useState(ETraditionTypes.short);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const activeButtonTheme = itemStates[`${colorScheme}ActiveItem`];

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

  const isActiveButton = (currentTraditionType: ETraditionTypes): boolean => {
    return currentTraditionType === traditionType;
  };

  return (
    <View>
      {/* Controls */}
      <View style={styles.controls}>
        <Pressable
          style={[
            styles.button,
            isActiveButton(ETraditionTypes.short)
              ? activeButtonTheme
              : itemStates[`${colorScheme}Item`]
          ]}
          onPress={() => setTraditionType(ETraditionTypes.short)}>
          <Text
            style={[
              styles.text,
              isActiveButton(ETraditionTypes.short) ? styles.textWhite : null
            ]}>
            SHORT
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            isActiveButton(ETraditionTypes.long)
              ? activeButtonTheme
              : itemStates[`${colorScheme}Item`]
          ]}
          onPress={() => setTraditionType(ETraditionTypes.long)}>
          <Text
            style={[
              styles.text,
              isActiveButton(ETraditionTypes.long) ? styles.textWhite : null
            ]}>
            LONG
          </Text>
        </Pressable>
      </View>
      <ForwardedScrollView
        contentContainerStyle={globalStyles.mainContainer}
        ref={scrollViewRef}>
        {/* Traditions */}
        {traditions[traditionType].map((tradition, index) => (
          <Tradition
            key={index}
            id={tradition.id}
            tradition={tradition.tradition}
          />
        ))}
      </ForwardedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  textWhite: {
    color: '#fff'
  },
  button: {
    paddingVertical: 12,
    width: '50%'
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Traditions;
