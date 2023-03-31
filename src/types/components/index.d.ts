import { type ButtonProps } from 'react-native';

export interface IButtonProps extends Omit<ButtonProps, 'style'> {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large'; // or you can use `number` if you prefer
  style?: StyleProp<ViewStyle>; // import { StyleProp, ViewStyle } from 'react-native';
  variant?: 'text' | 'contained' | 'outlined' | undefined;
  onClick?: () => void;
  onPress?: () => void;
}

export interface IHeaderProps {
  title?: string;
  subtitle?: string;
}

interface IDrawerLeftProps {
  openLogoutModal: () => void;
}

export interface IDrawerLeftItemProps {
  key?: string;
  to: string | undefined;
  title: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: (value: string) => void;
  openLogoutModal: () => void;
}

export interface IDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  classes?: Record<string, string>;
  screenWidth?: false | Breakpoint | undefined;
}

export interface IDialogTitleProps {
  id?: string;
  children?: React.ReactNode;
  onClose: () => void;
  screenWidth?: string;
}
