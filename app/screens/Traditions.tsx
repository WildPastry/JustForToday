import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ETraditionTypes, ITraditions } from '../types/data.types';
import ForwardedScrollView, { Text, View } from '../components/Themed';
import React, { useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Tradition from '../components/Tradition';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Traditions: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
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
      contentContainerStyle={styles.container}
      ref={scrollViewRef}>
      <View style={styles.logoContainer}>
        {/* Logo */}
        <FontAwesome
          style={styles.text}
          name='book'
          size={25}
          color={Colours[colorScheme].text}
        />
        {/* Title */}
        <MonoText style={styles.title}>Traditions</MonoText>
      </View>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours[colorScheme].seperator}
        darkColor={Colours[colorScheme].seperator}
      />
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
  container: {
    padding: 15
  },
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  title: {
    fontSize: 20,
    marginLeft: 10
  },
  text: {
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '70%'
  }
});

export default Traditions;
