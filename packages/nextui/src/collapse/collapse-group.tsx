import React, { useMemo } from 'react';
import withDefaults from '../utils/with-defaults';
import useTheme from '../use-theme';
import { NormalWeights } from '../utils/prop-types';
import { CollapseContext, CollapseConfig } from './collapse-context';
import useCurrentState from '../use-current-state';
import { setChildrenIndex } from '../utils/collections';
import { getNormalWeight } from '../utils/dimensions';
import clsx from '../utils/clsx';
import Collapse from './collapse';

interface Props {
  accordion?: boolean;
  className?: string;
  animated?: boolean;
  bordered?: boolean;
  splitted?: boolean;
  shadow?: boolean;
  divider?: boolean;
  borderWeight?: NormalWeights;
}

const defaultProps = {
  accordion: true,
  shadow: false,
  bordered: false,
  splitted: false,
  borderWeight: 'light' as NormalWeights,
  className: ''
};

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type CollapseGroupProps = Props & typeof defaultProps & NativeAttrs;

const CollapseGroup: React.FC<React.PropsWithChildren<CollapseGroupProps>> = ({
  children,
  accordion,
  shadow,
  className,
  animated,
  bordered,
  splitted,
  divider,
  borderWeight: borderWeightProp,
  ...props
}) => {
  const theme = useTheme();
  const [state, setState, stateRef] = useCurrentState<Array<number>>([]);

  const updateValues = (currentIndex: number, nextState: boolean) => {
    const hasChild = stateRef.current.find((val) => val === currentIndex);
    if (accordion) {
      if (nextState) return setState([currentIndex]);
      return setState([]);
    }
    if (nextState) {
      // In a few cases, the user will set Collapse Component state manually.
      // If the user incorrectly set the state, Group component should ignore it.
      /* istanbul ignore if */
      if (hasChild) return;
      return setState([...stateRef.current, currentIndex]);
    }
    setState(stateRef.current.filter((item) => item !== currentIndex));
  };

  const initialValue = useMemo<CollapseConfig>(
    () => ({
      values: state,
      updateValues,
      divider,
      animated
    }),
    [state.join(',')]
  );

  const hasIndexChildren = useMemo(
    () => setChildrenIndex(children, [Collapse]),
    [children]
  );

  const borderWeight = useMemo(() => {
    return bordered ? getNormalWeight(borderWeightProp) : '0px';
  }, [bordered, borderWeightProp]);

  return (
    <CollapseContext.Provider value={initialValue}>
      <div
        className={clsx(
          'collapse-group',
          { shadow, bordered, splitted },
          className
        )}
        {...props}
      >
        {hasIndexChildren}
        <style jsx>{`
          .collapse-group {
            width: auto;
            padding: 0 ${theme.layout.gapHalf};
          }
          .collapse-group > :global(div + div) {
            border-top: none;
          }
          .shadow,
          .bordered,
          .collapse-group.splitted :global(.collapse) {
            border-radius: ${theme.layout.radius};
            padding: 0 ${theme.layout.gap};
          }
          .shadow {
            border: none;
            box-shadow: ${theme.expressiveness.shadowSmall};
          }
          .collapse-group.splitted :global(.collapse) {
            box-shadow: ${theme.expressiveness.shadowSmall};
            margin: ${theme.layout.gapHalf} 0;
          }
          .bordered {
            border: ${borderWeight} solid ${theme.palette.border};
          }
          .collapse-group :global(.collapse:last-child) {
            border-bottom: none;
          }
          .collapse-group :global(.collapse:first-child) {
            border-top: none;
          }
          .gradient.vertical
            :global(.button:not(:last-child):not(:first-child)) {
            padding-top: 0 !important;
          }
        `}</style>
      </div>
    </CollapseContext.Provider>
  );
};

export default withDefaults(CollapseGroup, defaultProps);
