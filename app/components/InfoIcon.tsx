import { ColorSchemeName, Pressable } from 'react-native';
import Colours from '../constants/Colours';
import Control from '../constants/Control';
import { FontAwesome } from '@expo/vector-icons';
import { IDeviceSize } from '../types/generic.types';
import { INavigation } from '../types/navigation.types';
import getDeviceSize from '../constants/Layout';
import useColorScheme from '../hooks/useColorScheme';

const InfoIcon: React.FC<INavigation> = ({
  navigation
}: INavigation): JSX.Element => {
  // Colour settings
  const colorScheme: NonNullable<ColorSchemeName> = useColorScheme();
  // Font settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    <Pressable
      onPress={() => navigation.navigate('About')}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1
      })}>
      <FontAwesome
        name='info-circle'
        size={Control[deviceSize].icon}
        color={Colours[colorScheme].text}
        style={{ marginRight: Control[deviceSize].container.padding }}
      />
    </Pressable>
  );
};

export default InfoIcon;
