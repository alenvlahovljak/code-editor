import type { CSSProperties } from 'react';

export interface ILangPicker {
  name?: string;
  value: unknown;
}

export interface IFrame {
  title: string;
  sandbox: string;
  srcDoc: string;
}

export interface IPrimaryButton {
  style: CSSProperties;
  onClick: () => void;
}
