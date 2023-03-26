import * as Linking from 'expo-linking';
import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: 'one'
            }
          },
          Reflections: {
            screens: {
              Reflections: 'two'
            }
          },
          Support: {
            screens: {
              Support: 'three'
            }
          }
        }
      },
      Info: 'modal',
      NotFound: '*'
    }
  }
};

export default linking;
