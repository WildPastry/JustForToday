import React, { useEffect, useRef } from 'react';
import { AppState } from '../redux/store';
import ErrorScreen from './ErrorScreen';
import ForwardedScrollView from '../components/styles/Themed';
import Reflection from '../components/layout/Reflection';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';
import { useIsFocused } from '@react-navigation/native';

const Home: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const isFocused = useIsFocused();

  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  // Scroll to top function
  const scrollTop = () => {
    scrollViewRef.current.scrollTo({ y: 0, animated: false });
  };

  // Scroll to top on focus
  useEffect(() => {
    if (isFocused) {
      scrollTop();
    }
  }, [isFocused]);

  // Render app
  const renderApp = () => {
    return (
      <ForwardedScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}>
        <Reflection handleScrollTop={scrollTop} />
      </ForwardedScrollView>
    );
  };

  // Check for error state
  return appError ? errorScreen() : renderApp();
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    padding: 15
  }
});

export default Home;
