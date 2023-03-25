import Home from './Home';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';

describe('<Home />', () => {
  it('renders the component', () => {
    // const container = render(<Home />);
    // expect(container).toBeTruthy();
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
