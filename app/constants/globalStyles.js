import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  mainContainer: {
    padding: 20
  },
  body: {
    fontSize: 18,
    letterSpacing: 0.4,
    lineHeight: 22
  },
  number: {
    fontSize: 22,
    letterSpacing: 0.4,
    lineHeight: 22,
    marginRight: 10
  },
  divider: {
    alignSelf: 'center',
    height: 1,
    marginVertical: 25,
    width: '70%'
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 7
  },
  headerSteps: {
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 3
  }
});

export default globalStyles;
