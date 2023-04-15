export const checkDataQuality = (data: string): string => {
  // Create pattern
  const REGEX = /\{(?<REGEX>.*?)\}/gu;

  // Convert data
  const convertedData = data.replace(REGEX, '\n\n');
  return convertedData;
};
