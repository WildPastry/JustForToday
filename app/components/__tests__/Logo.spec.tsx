import Logo from '../Logo';
import renderer from 'react-test-renderer';

describe('<Logo />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
