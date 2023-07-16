import React, { useEffect, useRef } from 'react';
import { AppState } from '../redux/store';
import ForwardedScrollView from '../components/styles/Themed';
import { IStep } from '../types/data.types';
import Step from '../components/layout/Step';
import globalStyles from '../constants/globalStyles';
import { useAppSelector } from '../redux/hooks';
import { useIsFocused } from '@react-navigation/native';

const Steps: React.FC = (): JSX.Element => {
  // Screen settings
  const scrollViewRef: React.MutableRefObject<any> = useRef<any>(null);
  const isFocused = useIsFocused();

  // Data from store
  const steps: IStep[] = useAppSelector((state: AppState): IStep[] => {
    return state.data.steps;
  });

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

  return (
    <ForwardedScrollView
      contentContainerStyle={globalStyles.mainContainer}
      ref={scrollViewRef}>
      {/* Steps */}
      {steps.map((step, index) => (
        <Step key={index} id={step.id} step={step.step} />
      ))}
    </ForwardedScrollView>
  );
};

export default Steps;
