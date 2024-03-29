import {
  ScrollView as DefaultScrollView,
  Text as DefaultText,
  View as DefaultView
} from 'react-native';
import React, { forwardRef } from 'react';
import Colours from '../../constants/Colours';
import useColorScheme from '../../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colours.light & keyof typeof Colours.dark
) {
  // Colour settings
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  // Logic for theme selection
  if (colorFromProps) {
    return colorFromProps;
  }
  return Colours[theme][colorName];
}

// Export props
interface IScrollViewProps extends ScrollViewProps {
  ref?: React.Ref<DefaultScrollView>;
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

// Exporting components with the correct colour theme added
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

export const ForwardedScrollView = forwardRef<
  DefaultScrollView,
  IScrollViewProps
>((props: IScrollViewProps, ref: React.ForwardedRef<DefaultScrollView>) => {
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
});

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
