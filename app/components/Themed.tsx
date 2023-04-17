import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView
} from 'react-native';
import React, { forwardRef } from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
interface IScrollViewProps extends ScrollViewProps {
  ref?: React.Ref<DefaultScrollView>;
}
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // Colour settings
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  // Logic for selecting theme
  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

// Export props
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

// Exporting components with the correct colour theme added

const ForwardedScrollView = forwardRef<DefaultScrollView, IScrollViewProps>(
  (props, ref) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      'background'
    );
    return (
      <DefaultScrollView
        style={[{ backgroundColor }, style]}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

export default ForwardedScrollView;

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <DefaultScrollView style={[{ backgroundColor }, style]} {...otherProps} />
  );
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
