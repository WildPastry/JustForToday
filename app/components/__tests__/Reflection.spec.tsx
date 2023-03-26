import Reflection from '../Reflection';
import renderer from 'react-test-renderer';

describe('<Reflection />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Reflection />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
