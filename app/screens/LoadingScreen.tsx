import Control from '../constants/Control';
import { FontDisplay } from '../components/styles/StyledText';
import { IDeviceSize } from '../types/generic.types';
import getDeviceSize from '../constants/Layout';

const LoadingScreen: React.FC = (): JSX.Element => {
  // Component settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  // Loading quote
  const selectLoadingQuote = (): string => {
    return 'Loading';
  };

  return (
    <FontDisplay style={Control[deviceSize].text}>
      {selectLoadingQuote()}
    </FontDisplay>
  );
};

export default LoadingScreen;
