import { MonoText } from '../StyledText';
import renderer from 'react-test-renderer';

describe('<StyledText />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<MonoText>Snapshot</MonoText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});