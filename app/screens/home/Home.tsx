import { StyleSheet, Text } from 'react-native';

const Home: React.FC = (): JSX.Element => {
  return <Text style={styles.title}>Home</Text>;
};

const styles = StyleSheet.create({
  title: {
    color: '#f7f1e3',
    fontSize: 25
  }
});

export default Home;
