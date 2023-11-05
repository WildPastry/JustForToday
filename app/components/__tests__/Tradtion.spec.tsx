import Calendar from '../layout/Calendar';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Calendar />', () => {
  it('renders correctly', () => {
    const store = makeStore();

    const mockFunction = (): void => {
      true;
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <Calendar handleCalendarChange={mockFunction} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
