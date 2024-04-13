import React, { useRef } from 'react';

import { AppState } from '../redux/store';
import Control from '../constants/Control';
import ErrorScreen from './ErrorScreen';
import { ForwardedScrollView } from '../components/styles/Themed';
import { IDeviceSize } from '../types/generic.types';
import Reflection from '../components/Reflection';
import { StyleSheet } from 'react-native';
import getDeviceSize from '../constants/Layout';
import { useAppSelector } from '../redux/hooks';
import { useFocusEffect } from '@react-navigation/native';

const Home: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollToTop();
    }, [])
  );

  const scrollToTop = (): void => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  };

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  // Render app
  const renderApp = () => {
    return (
      <ForwardedScrollView
        contentContainerStyle={[
          styles.container,
          Control[deviceSize].container
        ]}
        ref={scrollViewRef}>
        <Reflection handleScrollPosition={scrollToTop} />
      </ForwardedScrollView>
    );
  };
  // Check for error state
  return appError ? errorScreen() : renderApp();
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  }
});

export default Home;
