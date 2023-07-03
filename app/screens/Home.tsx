import React, { useRef } from 'react';
import { AppState } from '../redux/store';
import ErrorScreen from './ErrorScreen';
import ForwardedScrollView from '../components/styles/Themed';
import Reflection from '../components/layout/Reflection';
import { StyleSheet } from 'react-native';
import { useAppSelector } from '../redux/hooks';

const Home: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);

  // Data from store
  const appError: boolean = useAppSelector((state: AppState): boolean => {
    return state.data.error;
  });

  // Error screen
  const errorScreen = (): JSX.Element => {
    return <ErrorScreen />;
  };

  // Render app
  const renderApp = () => {
    return (
      <ForwardedScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}>
        <Reflection />
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
