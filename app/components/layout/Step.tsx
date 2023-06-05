import { FontBold, FontRegular } from '../styles/StyledText';
import { IStep } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { View } from '../../components/styles/Themed';
import globlStyles from './../../constants/styles';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <View style={styles.stepContainer}>
      <View style={globlStyles.numberContainer}>
        <FontBold style={globlStyles.number}>{props.id}</FontBold>
      </View>
      <View style={styles.bodyContainer}>
        <FontRegular style={globlStyles.body}>{props.step}</FontRegular>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  bodyContainer: {
    backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    width: '88%'
  }
});

export default StepItem;
