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
          'font-thin': require('../assets/fonts/Montserrat-Thin.otf'),
          'font-light': require('../assets/fonts/Montserrat-Light.otf'),
          'font-regular': require('../assets/fonts/Montserrat-Regular.otf'),
          'font-bold': require('../assets/fonts/Montserrat-Bold.otf')
        });

        // Load data
        // await dispatch(setData());
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
