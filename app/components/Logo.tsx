import { ColorSchemeName, Image } from 'react-native';
import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

const Logo: React.FC = (): JSX.Element => {
  // Component settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();

  const logo =
    colorScheme === 'dark'
      ? require('../assets/jft-dark.png')
      : require('../assets/jft-light.png');

  return (
    // Logo
    <Image
      style={[Control[deviceSize].logo]}
      source={logo}
      resizeMode='contain'
    />
  );
};

export default Logo;
