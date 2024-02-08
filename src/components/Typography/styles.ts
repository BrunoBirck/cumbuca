import styled, {css} from 'styled-components/native';
import {ITypographyStylesProps} from './types';

export const Typography = styled.Text<ITypographyStylesProps>`
  ${({variant, semibold, color, theme, textAlign = 'left'}) => {
    const fontFamily = semibold
      ? theme.fontFamilies.semibold
      : theme.fontFamilies.regular;

    switch (variant) {
      case 'sm':
        return css`
          font-family: ${fontFamily};
          color: ${color};
          text-decoration-color: ${color};
          text-align: ${textAlign};
          font-size: ${theme.fontSizes.sm};
          font-weight: ${semibold
            ? theme.fontWeights.semibold
            : theme.fontWeights.regular};
        `;
      case 'md':
        return css`
          font-family: ${fontFamily};
          color: ${color};
          text-decoration-color: ${color};
          text-align: ${textAlign};
          font-size: ${theme.fontSizes.md};
          font-weight: ${semibold
            ? theme.fontWeights.semibold
            : theme.fontWeights.regular};
        `;
      case 'lg':
        return css`
          font-family: ${fontFamily};
          color: ${color};
          text-decoration-color: ${color};
          text-align: ${textAlign};
          font-size: ${theme.fontSizes.lg};
          font-weight: ${semibold
            ? theme.fontWeights.semibold
            : theme.fontWeights.regular};
        `;
      case 'xl':
        return css`
          font-family: ${fontFamily};
          color: ${color};
          text-decoration-color: ${color};
          text-align: ${textAlign};
          font-size: ${theme.fontSizes.xl};
          font-weight: ${semibold
            ? theme.fontWeights.semibold
            : theme.fontWeights.regular};
        `;
      default:
        return css`
          font-family: ${fontFamily};
          color: ${color};
          text-decoration-color: ${color};
          text-align: ${textAlign};
          font-size: ${theme.fontSizes.md};
          font-weight: ${semibold
            ? theme.fontWeights.semibold
            : theme.fontWeights.regular};
        `;
    }
  }}
`;
