import About from '../About';
import renderer from 'react-test-renderer';

describe('<About />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<About />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
