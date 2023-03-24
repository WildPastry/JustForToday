import Home from './Home';
import { render } from '@testing-library/react';

describe('<Home />', () => {
  it('renders the component', () => {
    render(<Home />);
  });
});
