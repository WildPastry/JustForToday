import { IStep } from '../types/data.types';
import { Text } from './Themed';

const StepItem: React.FC<IStep> = (step: IStep): JSX.Element => {
  return (
    // Step
    <Text>
      #{step.id}: {step.step}
    </Text>
  );
};

export default StepItem;
