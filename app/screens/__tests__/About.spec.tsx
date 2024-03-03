import About from '../About';
import { NavigationContainer } from '@react-navigation/native';
import renderer from 'react-test-renderer';

describe('<About />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <NavigationContainer>
          <About />
        </NavigationContainer>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
