import { ETraditionTypes, ITraditions } from '../types/data.types';
import { Pressable, StyleSheet } from 'react-native';
import { ScrollView, ScrollViewProps, Text } from '../components/Themed';
import { AppState } from '../redux/store';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import Tradition from '../components/Tradition';
import { useAppSelector } from '../redux/hooks';
import useColorScheme from '../hooks/useColorScheme';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import { useIsFocused } from '@react-navigation/native';
const Traditions: React.FC = (): JSX.Element => {
  // Selectors for store
  const traditions = useAppSelector((state: AppState): ITraditions => {
    return state.data.traditions;
  });

  // Try forward ref
  interface ScrollViewWithScrollToProps extends ScrollViewProps {
    scrollTo: (params: { x?: number; y?: number; animated?: boolean }) => void;
  }
  const MyScrollView = forwardRef<ScrollViewWithScrollToProps, ScrollViewProps>(
    (props, ref) => {
      const scrollViewRef = useRef<ScrollViewWithScrollToProps>(null);

      useImperativeHandle(ref, () => ({
        scrollTo: (params) => scrollViewRef.current?.scrollTo(params)
      }));

      useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0 });
      }, []);

      return <ScrollView {...props} ref={scrollViewRef} />;
    }
  );

  // interface ScrollViewWithScrollToProps extends ScrollViewProps {
  //   scrollTo: (params: { x?: number; y?: number; animated?: boolean }) => void;
  // }
  // const scrollViewRef = useRef<ScrollViewWithScrollToProps>(null);
  // Colour settings
  const colorScheme = useColorScheme();

  // Tradition types local state
  const [traditionType, setTraditionType] = useState(ETraditionTypes.short);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      scrollViewRef.current?.scrollTo({ y: 0 });
    }
  }, [isFocused]);

  const scrollViewRef = useRef<ScrollViewWithScrollToProps>(null);

  return (
    <MyScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
      {/* Logo */}
      <FontAwesome
        style={styles.text}
        name='book'
        size={50}
        color={Colors[colorScheme].text}
      />
      {/* Title */}
      <MonoText style={styles.title}>Traditions</MonoText>
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
    </MyScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  text: {
    textAlign: 'center'
  }
});

export default Traditions;
