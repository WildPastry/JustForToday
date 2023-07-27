/* eslint-disable no-unused-vars */
export interface IExternalLink {
  children: JSX.Element;
  href: string;
  style: {};
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
