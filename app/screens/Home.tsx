import { AppState } from '../redux/store';
import ErrorScreen from './ErrorScreen';
import React from 'react';
import Reflection from '../components/layout/Reflection';
import { useAppSelector } from '../redux/hooks';

const Home: React.FC = (): JSX.Element => {
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
    return <Reflection />;
  };

  // Check for error state
  return appError ? errorScreen() : renderApp();
};

export default Home;
