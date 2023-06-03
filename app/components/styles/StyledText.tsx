import { Text, TextProps } from './Themed';

export function DisplayRegular(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'space-mono' }]}
    />
  );
}

export function BodyRegular(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'montserrat-regular' }]}
    />
  );
}
