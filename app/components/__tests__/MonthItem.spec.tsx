import MonthItem from '../MonthItem';
import renderer from 'react-test-renderer';

describe('<MonthItem />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MonthItem id={''} name={''} days={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
