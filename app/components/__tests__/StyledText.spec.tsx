import { FontDisplay } from '../styles/StyledText';
import renderer from 'react-test-renderer';

describe('<StyledText />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<FontDisplay>Snapshot</FontDisplay>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
