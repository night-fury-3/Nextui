import React, { useMemo } from 'react';
import useTheme from '../../hooks/use-theme';
import withDefaults from '../../utils/with-defaults';
import {
  NormalSizes,
  NormalColors,
  NormalWeights,
} from '../../utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { getButtonRadius, getGroupBorder } from './styles';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  bordered?: boolean;
  light?: boolean;
  flat?: boolean;
  loading?: boolean;
  shadow?: boolean;
  auto?: boolean;
  animated?: boolean;
  rounded?: boolean;
  ghost?: boolean;
  weight?: NormalWeights;
  size?: NormalSizes;
  color?: NormalColors;
  className?: string;
}

const defaultProps = {
  disabled: false,
  vertical: false,
  bordered: false,
  light: false,
  flat: false,
  loading: false,
  shadow: false,
  auto: false,
  animated: false,
  rounded: false,
  ghost: false,
  weight: 'normal' as NormalWeights,
  size: 'medium' as NormalSizes,
  color: 'default' as NormalColors,
  className: '',
};

type NativeAttrs = Omit<React.HTMLAttributes<unknown>, keyof Props>;
export type ButtonGroupProps = Props & typeof defaultProps & NativeAttrs;

const ButtonGroup: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (
  groupProps
) => {
  const theme = useTheme();
  const {
    disabled,
    size,
    color,
    bordered,
    ghost,
    light,
    flat,
    loading,
    shadow,
    auto,
    animated,
    rounded,
    vertical,
    children,
    className,
    ...props
  } = groupProps;
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      size,
      color,
      bordered,
      light,
      ghost,
      flat,
      loading,
      shadow,
      auto,
      animated,
      rounded,
      isButtonGroup: true,
    }),
    [disabled, size, color, bordered, light, ghost, flat]
  );

  const { color: borderColor, width: borderWidth } = useMemo(() => {
    return getGroupBorder(theme.palette, groupProps);
  }, [theme, disabled, bordered]);

  const radius = useMemo(() => getButtonRadius(size, rounded), [size, rounded]);

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div
        className={`button-group ${
          vertical ? 'vertical' : 'horizontal'
        } ${className}`}
        {...props}
      >
        {children}
        <style jsx>{`
          .button-group {
            display: inline-flex;
            border-radius: ${radius};
            margin: ${theme.layout.gapQuarter};
            border: ${borderWidth} solid ${borderColor};
            background-color: transparent;
            overflow: hidden;
            height: min-content;
          }
          .vertical {
            flex-direction: column;
          }
          .button-group :global(.button .text) {
            top: 0;
          }
          .button-group :global(.button) {
            border: none;
          }
          .horizontal :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: ${borderWidth} solid ${borderColor};
          }
          .horizontal :global(.button:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.button:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: ${borderWidth} solid ${borderColor};
          }
          .vertical :global(.button:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  );
};

const MemoButtonGroup = React.memo(ButtonGroup);

export default withDefaults(MemoButtonGroup, defaultProps);
