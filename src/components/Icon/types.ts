export enum IconName {
  'arrow-left',
  'eye-close-error',
  'eye-close',
  'eye-open-error',
  'eye-open',
  less,
  plus,
  settings,
  signout,
  trash,
  warning,
  logo,
}

export interface IIconProps {
  name: keyof typeof IconName;
  width: number;
  height: number;
}
