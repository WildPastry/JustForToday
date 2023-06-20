import { FontBold, FontRegular } from '../styles/StyledText';
import { ITradition } from '../../types/data.types';
import { StyleSheet } from 'react-native';
import { View } from '../../components/styles/Themed';
import globlStyles from './../../constants/styles';

const TraditionItem: React.FC<ITradition> = (
  props: ITradition
): JSX.Element => {
  return (
    // Tradition
    <View style={styles.stepContainer}>
      <FontBold style={globlStyles.number}>{props.id}</FontBold>
      <FontRegular style={globlStyles.body}>{props.tradition}</FontRegular>
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

export default TraditionItem;
