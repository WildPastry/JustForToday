import { Animated, PanResponder, View } from 'react-native';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSwipeRight: () => void;
  onSwipeLeft: () => void;
};

const SWIPE_THRESHOLD = 200;

export const SwipeView: FC<Props> = ({
  children,
  onSwipeLeft,
  onSwipeRight
}) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (_evt, gestureState) => {
      const { dx } = gestureState;
      if (dx > SWIPE_THRESHOLD) {
        onSwipeRight();
      }
      if (dx < -SWIPE_THRESHOLD) {
        onSwipeLeft();
      }
    }
  });

  return (
    <Animated.View {...panResponder.panHandlers}>
      <View>{children}</View>
    </Animated.View>
  );
};
