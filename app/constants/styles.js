import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  mainContainer: {
    padding: 20
  },
  body: {
    fontSize: 17,
    letterSpacing: 0.3,
    lineHeight: 22
  },
  numberContainer: {
    backgroundColor: 'pink',
    alignItems: 'flex-start',
    marginRight: 10,
    width: 32
  },
  number: {
    fontSize: 35,
    lineHeight: 35
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
    marginLeft: 10
  }
});

export default globalStyles;
