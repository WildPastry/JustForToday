/* eslint-disable no-unused-vars */
export interface IExternalLink {
  children: JSX.Element;
  href: string;
  style: {};
}

export interface IEditScreenInfo {
  path: string;
}

export interface IDeviceSize {
  small: 'small';
  medium: 'medium';
  large: 'large';
}

export enum EDeviceSizes {
  SML = 'small',
  MED = 'medium',
  LRG = 'large'
}
