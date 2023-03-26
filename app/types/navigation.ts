import {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TRootStackParamList {}
  }
}

export type TRootStackParamList = {
  Root: NavigatorScreenParams<TRootTabParamList> | undefined;
  Info: undefined;
  NotFound: undefined;
};

export type TRootStackScreenProps<Screen extends keyof TRootStackParamList> =
  NativeStackScreenProps<TRootStackParamList, Screen>;

export type TRootTabParamList = {
  Home: undefined;
  Reflections: undefined;
  Support: undefined;
};

export type TRootTabScreenProps<Screen extends keyof TRootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TRootTabParamList, Screen>,
    NativeStackScreenProps<TRootStackParamList>
  >;
