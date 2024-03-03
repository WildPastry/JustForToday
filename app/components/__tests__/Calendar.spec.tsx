import Calendar from '../Calendar';
import { Provider } from 'react-redux';
import { makeStore } from '../../redux/store';
import renderer from 'react-test-renderer';

describe('<Calendar />', () => {
  it('renders correctly', () => {
    const store = makeStore();

    const mockCalendarChange = (): void => {
      true;
    };

    const mockScrollPosition = (): void => {
      true;
    };

    const tree = renderer
      .create(
        <Provider store={store}>
          <Calendar
            handleCalendarChange={mockCalendarChange}
            handleScrollPosition={mockScrollPosition}
          />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
