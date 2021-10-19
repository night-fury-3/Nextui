import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import useTheme from '../use-theme';
import usePortal from '../use-portal';
import useResize from '../use-resize';
import CSSTransition from '../utils/css-transition';
import useClickAnyWhere from '../use-click-anywhere';
import { getColors } from './styles';
import {
  getPlacement,
  TooltipPlacement,
  defaultTooltipPlacement,
  getIconPlacement
} from './placement';
import { Placement, SimpleColors, TooltipColors } from '../utils/prop-types';

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined;
  placement: Placement;
  color: TooltipColors | string;
  contentColor: SimpleColors | string;
  visible: boolean;
  offset: number;
  rounded?: boolean;
  hideArrow?: boolean;
  shadow?: boolean;
  className?: string;
}

interface ReactiveDomReact {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  bottom: -1000,
  width: 0,
  height: 0
};

const getRect = (
  ref: MutableRefObject<HTMLElement | null>
): ReactiveDomReact => {
  if (!ref || !ref.current) return defaultRect;
  const rect = ref.current.getBoundingClientRect();
  return {
    ...rect,
    width: rect.width || rect.right - rect.left,
    height: rect.height || rect.bottom - rect.top,
    top: rect.top + document.documentElement.scrollTop,
    bottom: rect.bottom + document.documentElement.scrollTop,
    left: rect.left + document.documentElement.scrollLeft,
    right: rect.right + document.documentElement.scrollLeft
  };
};

const TooltipContent: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  parent,
  visible,
  offset,
  placement,
  color,
  contentColor,
  rounded,
  className,
  hideArrow,
  shadow,
  ...props
}) => {
  const theme = useTheme();
  const el = usePortal('tooltip');
  const selfRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<TooltipPlacement>(defaultTooltipPlacement);
  const colors = useMemo(
    () => getColors(color, contentColor, theme.palette),
    [color, contentColor, theme.palette]
  );
  if (!parent) return null;
  const updateRect = () => {
    const pos = getPlacement(placement, getRect(parent), offset);
    setRect(pos);
  };

  const { transform, top, left, right, bottom } = useMemo(
    () => getIconPlacement(placement, 5),
    [placement]
  );

  const borderRadius = useMemo(
    () => (rounded ? '20px' : theme.layout.radius),
    [rounded]
  );

  useResize(updateRect);
  useClickAnyWhere(() => updateRect());

  useEffect(() => {
    updateRect();
  }, [visible]);

  const preventHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  if (!el) return null;
  return createPortal(
    <CSSTransition
      name="wrapper"
      visible={visible}
      enterTime={20}
      leaveTime={20}
    >
      <div
        className={`tooltip-content ${className}`}
        ref={selfRef}
        onClick={preventHandler}
        {...props}
      >
        <div role="tooltip" className={`inner ${!hideArrow ? 'arrow' : ''}`}>
          {children}
        </div>
        <style jsx>{`
          .tooltip-content {
            position: absolute;
            width: auto;
            top: calc(${rect.top} + 6px);
            left: ${rect.left};
            transform: ${rect.transform};
            background: ${colors.bgColor};
            color: ${colors.color};
            border-radius: ${borderRadius};
            padding: ${theme.layout.gapQuarter} ${theme.layout.gapHalf};
            opacity: 0;
            z-index: 1000;
            box-shadow: ${shadow ? theme.expressiveness.shadowMedium : 'none'};
            transition: opacity 0.25s ease 0s, top 0.25s ease 0s;
          }
          .inner {
            position: relative;
            font-size: 0.875rem;
            padding: 0;
          }
          .inner.arrow:after {
            content: '';
            width: 10px;
            height: 10px;
            z-index: -2;
            background: ${colors.bgColor};
            border-radius: 0px 0px 2px 0px;
            position: absolute;
            left: ${left};
            top: ${top};
            right: ${right};
            bottom: ${bottom};
            transform: ${transform};
          }
          .wrapper-enter-active {
            opacity: 1;
            top: ${rect.top};
          }
        `}</style>
      </div>
    </CSSTransition>,
    el
  );
};

export default TooltipContent;
