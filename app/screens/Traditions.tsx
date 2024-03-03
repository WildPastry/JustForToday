import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ETraditionTypes, ITraditions } from '../types/data.types';
import { ForwardedScrollView, Text, View } from '../components/styles/Themed';
import React, { useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import { FontAwesome } from '@expo/vector-icons';
import { FontDisplay } from '../components/styles/StyledText';
import Tradition from '../components/layout/Tradition';
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

  const isSelected = (activeTraditionType: ETraditionTypes): boolean => {
    return activeTraditionType === traditionType;
  };

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
        <FontDisplay style={styles.title}>Traditions</FontDisplay>
      </View>
      {/* Divider */}
      <View
        style={styles.divider}
        lightColor={Colours.light.seperator}
        darkColor={Colours.dark.seperator}
      />
      {/* Controls */}
      <View style={styles.controls}>
        <Pressable
          style={[
            styles.traditionBtn,
            isSelected(ETraditionTypes.short)
              ? { backgroundColor: Colours[colorScheme].currentBtn }
              : { backgroundColor: Colours[colorScheme].btn }
          ]}
          onPress={() => setTraditionType(ETraditionTypes.short)}>
          <Text
            style={[
              styles.text,
              isSelected(ETraditionTypes.short)
                ? { color: Colours[colorScheme].currentBtnText }
                : null
            ]}>
            SHORT
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.traditionBtn,
            isSelected(ETraditionTypes.long)
              ? { backgroundColor: Colours[colorScheme].currentBtn }
              : { backgroundColor: Colours[colorScheme].btn }
          ]}
          onPress={() => setTraditionType(ETraditionTypes.long)}>
          <Text
            style={[
              styles.text,
              isSelected(ETraditionTypes.long)
                ? { color: Colours[colorScheme].currentBtnText }
                : null
            ]}>
            LONG
          </Text>
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
    gap: 20,
    marginBottom: 20,
    marginTop: 10
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
  },
  traditionBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12
  }
});

export default Traditions;
