import { EDeviceSizes, IDeviceSize } from '../types/generic.types';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const getDeviceSize = (): IDeviceSize[keyof IDeviceSize] => {
  if (width < 600) {
    return EDeviceSizes.SML;
  } else if (width >= 600 && width < 800) {
    return EDeviceSizes.MED;
  }
  return EDeviceSizes.LRG;
};

export default getDeviceSize;
