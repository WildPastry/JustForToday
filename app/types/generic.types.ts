import { StyleProp, ViewStyle } from 'react-native';

/* eslint-disable no-unused-vars */
export interface IExternalLink {
  children: JSX.Element;
  href: string;
  style: StyleProp<ViewStyle>;
}

export interface IEditScreenInfo {
  path: string;
}

export enum EItemStates {
  ITEM = 'Item',
  CURRENT = 'Current',
  SELECTED = 'Selected',
  COMBINED = 'Combined'
}
