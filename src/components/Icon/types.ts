export enum IconName {
  'arrow-left',
  'eye-close-error',
  'eye-close',
  'less',
  'plus',
  'settings',
}

export interface IIconProps {
  name: keyof typeof IconName;
  width: number;
  height: number;
}
