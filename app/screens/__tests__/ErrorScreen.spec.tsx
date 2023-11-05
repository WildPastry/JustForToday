import ErrorScreen from '../ErrorScreen';
import renderer from 'react-test-renderer';

describe('<ErrorScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ErrorScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
