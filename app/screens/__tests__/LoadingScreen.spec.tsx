import LoadingScreen from '../LoadingScreen';
import renderer from 'react-test-renderer';

describe('<LoadingScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<LoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
