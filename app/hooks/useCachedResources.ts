/* eslint-disable max-len */
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { setData, setError } from '../redux/slices/dataSlice';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useAppDispatch } from '../redux/hooks';

export default function useCachedResources(): boolean {
  // Function settings
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const dispatch = useAppDispatch();

  // Load any resources or data that we need prior to rendering the app
  useEffect((): void => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'font-display': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'font-display-bold': require('../assets/fonts/SpaceMono-Bold.ttf')
        });

        // Load data
        await dispatch(setData());
      } catch (e) {
        // Set error screen if failed
        dispatch(setError(true));
      } finally {
        setLoadingComplete(true);
        // Hide splash
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
