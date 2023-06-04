import { Text, TextProps } from './Themed';

export function FontDisplay(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-display' }]}
    />
  );
}

export function FontLight(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-light' }]}
    />
  );
}
export function FontRegular(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-regular' }]}
    />
  );
}
export function FontBold(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'font-bold' }]}
    />
  );
}
