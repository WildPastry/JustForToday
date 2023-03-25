import Support from './Support';
import renderer from 'react-test-renderer';

describe('<Support />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Support />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
