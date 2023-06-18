import React, { useRef } from 'react';
import { AppState } from '../redux/store';
import ForwardedScrollView from '../components/styles/Themed';
import { IStep } from '../types/data.types';
import Step from '../components/layout/Step';
import globlStyles from './../constants/styles';
import { useAppSelector } from '../redux/hooks';
import { useFocusEffect } from '@react-navigation/native';

const Steps: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);

  // Data from store
  const steps: IStep[] = useAppSelector((state: AppState): IStep[] => {
    return state.data.steps;
  });

  useFocusEffect(
    React.useCallback(() => {
      // Scroll to top on focus
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      return () => null;
    }, [scrollViewRef])
  );

  return (
    <ForwardedScrollView
      contentContainerStyle={globlStyles.mainContainer}
      ref={scrollViewRef}>
      {/* Steps */}
      {steps.map((step, index) => (
        <Step key={index} id={step.id} step={step.step} />
      ))}
    </ForwardedScrollView>
  );
};

export default Steps;
