import { fontDisplay } from '../styles/StyledText';
import renderer from 'react-test-renderer';

describe('<StyledText />', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<fontDisplay>Snapshot</fontDisplay>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
