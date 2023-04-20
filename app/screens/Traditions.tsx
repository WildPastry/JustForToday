import { ETraditionTypes, ITraditions } from '../types/data.types';
import ForwardedScrollView, { Text, View } from '../components/Themed';
import { Pressable, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Tradition from '../components/Tradition';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import { useIsFocused } from '@react-navigation/native';

const Traditions: React.FC = (): JSX.Element => {
  // Create ref for functional scroll view
  const scrollViewRef = useRef<any>(null);

  // Set up isFocused hook for tracking component
  const isFocused = useIsFocused();

  // Selectors for store
  const traditions = useAppSelector((state: AppState): ITraditions => {
    return state.data.traditions;
  });

  // Colour settings
  const colorScheme = useColorScheme();

  // Tradition types local state
  const [traditionType, setTraditionType] = useState(ETraditionTypes.short);

  useEffect(() => {
    if (isFocused) {
      // Re-render component when focused to reset scroll view
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [isFocused]);

  return (
    <ForwardedScrollView
      contentContainerStyle={styles.container}
      ref={scrollViewRef}>
      {/* Logo */}
      <FontAwesome
        style={styles.text}
        name='book'
        size={50}
        color={Colors[colorScheme].text}
      />
      {/* Title */}
      <MonoText style={styles.title}>Traditions</MonoText>
      {/* Divider */}
      <View
        style={styles.separator}
        lightColor={Colors[colorScheme].seperator}
        darkColor={Colors[colorScheme].seperator}
      />
      {/* Controls */}
      <Pressable onPress={() => setTraditionType(ETraditionTypes.short)}>
        <Text>SHORT</Text>
      </Pressable>
      <Pressable onPress={() => setTraditionType(ETraditionTypes.long)}>
        <Text>LONG</Text>
      </Pressable>
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
    padding: 20
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center'
  },
  separator: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '80%'
  }
});

export default Traditions;
