import Home from './Home';
import { render } from '@testing-library/react-native';

describe('<Home />', () => {
  it('renders the component', () => {
    const container = render(<Home />);
    expect(container).toMatchSnapshot();
    expect(container).toBeTruthy();
  });
});
