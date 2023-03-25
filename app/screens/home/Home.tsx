import { StyleSheet, Text, View } from 'react-native';

const Home: React.FC = (): JSX.Element => {
  return (
    <View>
      <Text style={styles.title}>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#f7f1e3',
    fontSize: 25
  }
});

export default Home;
