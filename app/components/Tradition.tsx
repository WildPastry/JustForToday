import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { ITradition } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './styles/Themed';
import getDeviceSize from '../constants/Layout';

const TraditionItem: React.FC<ITradition> = (
  props: ITradition
): JSX.Element => {
  // Component settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    // Tradition
    <Text style={styles.tradtion}>
      <Text style={[styles.number, Control[deviceSize].text]}>
        {props.id}&nbsp;&nbsp;
      </Text>
      <Text style={[styles.text, Control[deviceSize].text]}>
        {props.tradition}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  tradtion: {
    flexDirection: 'row',
    marginTop: 20
  },
  text: {
    textAlign: 'left'
  },
  number: {
    fontWeight: '200',
    marginRight: 10
  }
});

export default TraditionItem;
