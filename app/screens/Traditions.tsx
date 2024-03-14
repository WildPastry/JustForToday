import { ColorSchemeName, Pressable, StyleSheet } from 'react-native';
import { ETraditionTypes, ITraditions } from '../types/data.types';
import { ForwardedScrollView, Text, View } from '../components/styles/Themed';
import React, { useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import { FontAwesome } from '@expo/vector-icons';
import { FontDisplay } from '../components/styles/StyledText';
import { IDeviceSize } from '../types/generic.types';
import Tradition from '../components/Tradition';
import getDeviceSize from '../constants/Layout';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useFocusEffect } from '@react-navigation/native';

const Traditions: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  const [traditionType, setTraditionType] = useState(ETraditionTypes.short);
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

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
      contentContainerStyle={Control[deviceSize].container}
      ref={scrollViewRef}>
      <View style={styles.logoContainer}>
        {/* Logo */}
        <FontAwesome
          name='book'
          size={Control[deviceSize].icon}
          color={Colours[colorScheme].icon}
        />
        {/* Title */}
        <FontDisplay style={[styles.title, Control[deviceSize].title]}>
          Traditions
        </FontDisplay>
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
              Control[deviceSize].text,
              isSelected(ETraditionTypes.short)
                ? { color: Colours[colorScheme].currentBtnText }
                : null
            ]}>
            Short
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
              Control[deviceSize].text,
              isSelected(ETraditionTypes.long)
                ? { color: Colours[colorScheme].currentBtnText }
                : null
            ]}>
            Long
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
  logoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 20
  },
  title: {
    marginLeft: 10
  },
  text: {
    textAlign: 'center'
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    marginBottom: 20,
    marginTop: 30,
    width: '70%'
  },
  traditionBtn: {
    borderRadius: 12,
    flex: 1,
    paddingVertical: 12
  }
});

export default Traditions;
