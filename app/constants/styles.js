import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
  mainContainer: {
    padding: 15
  },
  divider: {
    alignSelf: 'center',
    marginVertical: 20,
    height: 1,
    width: '70%'
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  header: {
    fontSize: 20,
    letterSpacing: 1,
    marginLeft: 10
  }
});

export default globalStyles;
