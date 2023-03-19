import {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import {useFocusRing} from "@react-aria/focus";
import {accordionItem} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, ReactRef, callAllHandlers, dataAttr} from "@nextui-org/shared-utils";
import {NodeWithProps, useAccordionItem as useBaseAccordion} from "@nextui-org/aria-utils";
import {useCallback, useMemo} from "react";
import {mergeProps} from "@react-aria/utils";

import {AccordionItemBaseProps} from "./base/accordion-item-base";
import {useAccordionContext} from "./accordion-context";

export interface Props<T extends object> extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * The item node.
   */
  item: NodeWithProps<T, AccordionItemBaseProps<T>>;
}

export type UseAccordionItemProps<T extends object = {}> = Props<T> & AccordionItemBaseProps;

export function useAccordionItem<T extends object = {}>(props: UseAccordionItemProps<T>) {
  const groupContext = useAccordionContext();

  const {ref, as, item, onFocusChange} = props;

  const {
    styles,
    className,
    indicator,
    children,
    title,
    subtitle,
    leftIndicator,
    motionProps = groupContext?.motionProps,
    isCompact = groupContext?.isCompact ?? false,
    isDisabled: isDisabledProp = groupContext?.isDisabled ?? false,
    hideDivider = groupContext.hideDivider ?? false,
    hideIndicator = groupContext.hideIndicator ?? false,
    disableAnimation = groupContext.disableAnimation ?? false,
    disableIndicatorAnimation = groupContext.disableIndicatorAnimation ?? false,
    ...otherProps
  } = item.props as AccordionItemBaseProps<T>;

  const Component = as || "div";

  const domRef = useDOMRef<HTMLButtonElement>(ref);

  const state = groupContext?.state;
  const isDisabled = state.disabledKeys.has(item.key) || isDisabledProp || groupContext?.isDisabled;
  const isOpen = state.selectionManager.isSelected(item.key);

  const {buttonProps: buttonCompleteProps, regionProps} = useBaseAccordion(
    {item, isDisabled},
    {...state, focusedKey: groupContext.focusedKey},
    domRef,
  );

  const {onFocus: onFocusButton, onBlur: onBlurButton, ...buttonProps} = buttonCompleteProps;

  const {isFocused, isFocusVisible, focusProps} = useFocusRing({
    autoFocus: item.props?.autoFocus,
  });

  const handleFocus = () => {
    onFocusChange?.(true);
  };

  const handleBlur = () => {
    onFocusChange?.(false);
  };

  const slots = useMemo(
    () =>
      accordionItem({
        isCompact,
        isDisabled,
        hideDivider,
        hideIndicator,
        isFocusVisible,
        disableAnimation,
        disableIndicatorAnimation,
      }),
    [
      isCompact,
      isDisabled,
      hideDivider,
      hideIndicator,
      isFocusVisible,
      disableAnimation,
      disableIndicatorAnimation,
    ],
  );

  const baseStyles = clsx(styles?.base, className);

  const getBaseProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.base({class: baseStyles}),
        ...mergeProps(otherProps, props),
      };
    },
    [baseStyles, otherProps, slots, item.props, isOpen, isDisabled],
  );

  const getButtonProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        ref: domRef,
        "data-open": dataAttr(isOpen),
        "data-focus-visible": dataAttr(isFocusVisible),
        "data-focused": dataAttr(isFocused),
        "data-disabled": dataAttr(isDisabled),
        className: slots.trigger({class: styles?.trigger}),
        onFocus: callAllHandlers(
          handleFocus,
          onFocusButton,
          focusProps.onFocus,
          otherProps.onFocus,
          item.props?.onFocus,
        ),
        onBlur: callAllHandlers(
          handleBlur,
          onBlurButton,
          focusProps.onBlur,
          otherProps.onBlur,
          item.props?.onBlur,
        ),
        ...mergeProps(buttonProps, props),
      };
    },
    [domRef, isOpen, isFocusVisible, isDisabled, isFocused, buttonProps, focusProps, slots, styles],
  );

  const getContentProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.content({class: styles?.content}),
        ...mergeProps(regionProps, props),
      };
    },
    [slots, styles, regionProps, isOpen, isDisabled],
  );

  const getIndicatorProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "aria-hidden": dataAttr(true),
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.indicator({class: styles?.indicator}),
        ...props,
      };
    },
    [slots, styles, isOpen, isDisabled],
  );

  const getHeadingProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.heading({class: styles?.heading}),
        ...props,
      };
    },
    [slots, styles, isOpen, isDisabled],
  );

  const getTitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.title({class: styles?.title}),
        ...props,
      };
    },
    [slots, styles, isOpen, isDisabled],
  );

  const getSubtitleProps = useCallback<PropGetter>(
    (props = {}) => {
      return {
        "data-open": dataAttr(isOpen),
        "data-disabled": dataAttr(isDisabled),
        className: slots.subtitle({class: styles?.subtitle}),
        ...props,
      };
    },
    [slots, styles, isOpen, isDisabled],
  );

  return {
    Component,
    item,
    slots,
    styles,
    domRef,
    indicator,
    children,
    title,
    subtitle,
    leftIndicator,
    isOpen,
    isDisabled,
    disableAnimation,
    motionProps,
    getBaseProps,
    getHeadingProps,
    getButtonProps,
    getContentProps,
    getIndicatorProps,
    getTitleProps,
    getSubtitleProps,
  };
}

export type UseAccordionItemReturn = ReturnType<typeof useAccordionItem>;
