import { EDeviceSizes, IDeviceSize } from '../types/generic.types';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;

const getDeviceSize = (): IDeviceSize[keyof IDeviceSize] => {
  console.log(width);
  if (width < 375) {
    return EDeviceSizes.SML;
  } else if (width >= 375 && width < 700) {
    return EDeviceSizes.MED;
  }
  return EDeviceSizes.LRG;
};

export default getDeviceSize;
