import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import LinkIcon from './icon';
import { addColorAlpha, getNormalColor } from '../utils/color';
import { DefaultProps } from '../utils/default-props';
import { getSpacingsStyles } from '../utils/styles';
import { SimpleColors } from '../utils/prop-types';
import clsx from '../utils/clsx';
import { __DEV__ } from '../utils/assertion';

export interface Props extends DefaultProps {
  href?: string;
  color?: SimpleColors | boolean | string;
  icon?: boolean;
  underline?: boolean;
  block?: boolean;
  className?: string;
}

const defaultProps = {
  href: '',
  icon: false,
  underline: false,
  block: false,
  className: ''
};

type NativeAttrs = Omit<React.AnchorHTMLAttributes<unknown>, keyof Props>;
export type LinkProps = Props & typeof defaultProps & NativeAttrs;

const preClass = 'nextui-link';

const Link = React.forwardRef<
  HTMLAnchorElement,
  React.PropsWithChildren<LinkProps>
>(
  (
    { href, color, underline, children, className, block, icon, ...props },
    ref: React.Ref<HTMLAnchorElement>
  ) => {
    const theme = useTheme();

    const { stringCss } = getSpacingsStyles(theme, props);

    const linkColor = useMemo(
      () => getNormalColor(color || block, theme.palette, theme.palette.link),
      [color, theme.palette]
    );
    const hoverColor = useMemo(
      () =>
        color || block
          ? addColorAlpha(linkColor, 0.8)
          : addColorAlpha(theme.palette.text, 0.8),
      [color, block, theme, linkColor]
    );

    const padding = block ? theme.spacing.sm : '0';
    const decoration = underline ? 'underline' : 'none';

    return (
      <a className={clsx(preClass, className)} href={href} {...props} ref={ref}>
        {children}
        {icon && <LinkIcon />}
        <style jsx>{`
          .${preClass} {
            display: inline-flex;
            align-items: baseline;
            line-height: inherit;
            color: ${linkColor};
            text-decoration: none;
            padding: calc(${padding} * 0.8) calc(${padding} * 1.7);
            border-radius: ${block ? theme.radius.lg : 0};
            width: fit-content;
            transition: all 0.25s ease;
            ${stringCss};
          }
          .${preClass}:hover, .${preClass}:active, .${preClass}:focus {
            text-decoration: ${decoration};
          }
          .${preClass}:hover {
            background-color: ${block
              ? addColorAlpha(linkColor, 0.2)
              : 'inherit'};
            color: ${hoverColor};
          }
        `}</style>
      </a>
    );
  }
);

if (__DEV__) {
  Link.displayName = 'Link';
}
const MemoLink = React.memo(Link);

export default withDefaults(MemoLink, defaultProps);
