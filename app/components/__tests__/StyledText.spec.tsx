import { DisplayRegular } from '../styles/StyledText';
import renderer from 'react-test-renderer';

describe('<StyledText />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DisplayRegular>Snapshot</DisplayRegular>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
