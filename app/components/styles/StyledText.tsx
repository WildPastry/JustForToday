import { Text, TextProps } from './Themed';

export function FontDisplay(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-display' }]}
    />
  );
}

export function FontDisplayBold(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-display-bold' }]}
    />
  );
}
