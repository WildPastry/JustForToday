import { FontBold, FontRegular } from '../styles/StyledText';
import { Text, View } from '../../components/styles/Themed';
import { IStep } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import globlStyles from './../../constants/styles';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <View style={styles.stepContainer}>
      <FontBold style={globlStyles.number}>{props.id}</FontBold>
      <FontRegular style={globlStyles.body}>{props.step}</FontRegular>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '90%'
  }
});

export default StepItem;
