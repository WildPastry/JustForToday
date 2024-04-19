import Control from '../constants/Control';
import { IDeviceSize } from '../types/generic.types';
import { IStep } from '../types/data.types';
import { StyleSheet } from 'react-native';
import { Text } from './styles/Themed';
import getDeviceSize from '../constants/Layout';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  // Component settings
  const deviceSize: IDeviceSize[keyof IDeviceSize] = getDeviceSize();

  return (
    // Step
    <Text style={styles.step}>
      <Text style={[styles.number, Control[deviceSize].text]}>
        {props.id}&nbsp;&nbsp;
      </Text>
      <Text style={[styles.text, Control[deviceSize].text]}>{props.step}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  step: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30
  },
  text: {
    textAlign: 'left'
  },
  number: {
    fontWeight: '200'
  }
});

export default StepItem;
