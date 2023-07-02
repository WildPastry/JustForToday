import { FontBold, FontRegular } from '../styles/StyledText';
import { IStep } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { View } from '../../components/styles/Themed';
import globalStyles from '../../constants/globalStyles';

const StepItem: React.FC<IStep> = (props: IStep): JSX.Element => {
  return (
    // Step
    <View style={styles.stepContainer}>
      <FontBold style={globalStyles.number}>{props.id}</FontBold>
      <FontRegular style={globalStyles.body}>{props.step}</FontRegular>
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
