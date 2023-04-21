import { Text, TextProps } from './Themed';

export function MonoText(styledText: TextProps) {
  return (
    <Text
      {...styledText}
      style={[styledText.style, { fontFamily: 'space-mono' }]}
    />
  );
}
