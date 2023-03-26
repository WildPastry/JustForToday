import Reflections from '../Reflections';
import renderer from 'react-test-renderer';

describe('<Reflections />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Reflections />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
