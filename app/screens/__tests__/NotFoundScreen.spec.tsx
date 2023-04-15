import NotFoundScreen from '../NotFoundScreen';
import renderer from 'react-test-renderer';

describe('<NotFoundScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NotFoundScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
