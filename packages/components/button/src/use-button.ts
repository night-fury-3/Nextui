import type {ButtonVariantProps} from "@nextui-org/theme";
import type {AriaButtonProps} from "@react-types/button";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";
import type {ReactNode} from "react";

import {dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {MouseEventHandler, useCallback} from "react";
import {useButton as useAriaButton} from "@react-aria/button";
import {useFocusRing} from "@react-aria/focus";
import {chain, mergeProps} from "@react-aria/utils";
import {useDrip} from "@nextui-org/drip";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx} from "@nextui-org/shared-utils";
import {button} from "@nextui-org/theme";
import {isValidElement, cloneElement, useMemo} from "react";

import {useButtonGroupContext} from "./button-group-context";

export interface UseButtonProps
  extends HTMLNextUIProps<"button", Omit<AriaButtonProps, keyof ButtonVariantProps>>,
    Omit<ButtonVariantProps, "isFocusVisible" | "isInGroup" | "isInVerticalGroup"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLButtonElement | null>;
  /**
   * Whether the button should display a ripple effect on press.
   * @default false
   */
  disableRipple?: boolean;

  /**
   * The button left content.
   */
  leftIcon?: ReactNode;
  /**
   * The button right content.
   */
  rightIcon?: ReactNode;
  /**
   * The native button click event handler.
   * @deprecated - use `onPress` instead.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function useButton(props: UseButtonProps) {
  const groupContext = useButtonGroupContext();
  const isInGroup = !!groupContext;

  const {
    ref,
    as,
    children,
    leftIcon: leftIconProp,
    rightIcon: rightIconProp,
    autoFocus,
    className,
    fullWidth = groupContext?.fullWidth ?? false,
    size = groupContext?.size ?? "md",
    color = groupContext?.color ?? "neutral",
    variant = groupContext?.variant ?? "solid",
    disableAnimation = groupContext?.disableAnimation ?? false,
    radius = groupContext?.radius ?? "lg",
    disableRipple = groupContext?.disableRipple ?? false,
    isDisabled = groupContext?.isDisabled ?? false,
    onPress,
    onClick,
    ...otherProps
  } = props;

  const Component = as || "button";

  const domRef = useDOMRef(ref);

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const styles = useMemo(
    () =>
      button({
        size,
        color,
        variant,
        radius,
        fullWidth,
        isDisabled,
        isInGroup,
        isFocusVisible,
        disableAnimation,
        className,
      }),
    [
      size,
      color,
      variant,
      radius,
      fullWidth,
      isDisabled,
      isInGroup,
      isFocusVisible,
      disableAnimation,
      className,
    ],
  );

  const {onClick: onDripClickHandler, drips} = useDrip();

  const handleDrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disableRipple || isDisabled || disableAnimation) return;
    domRef.current && onDripClickHandler(e);
  };

  const {buttonProps: ariaButtonProps} = useAriaButton(
    {
      elementType: as,
      isDisabled,
      onPress,
      onClick: chain(onClick, handleDrip),
      ...otherProps,
    } as AriaButtonProps,
    domRef,
  );

  const getButtonProps: PropGetter = useCallback(
    () => ({
      "data-disabled": dataAttr(isDisabled),
      "data-focus-visible": dataAttr(isFocusVisible),
      "data-focused": dataAttr(isFocused),
      ...mergeProps(ariaButtonProps, focusProps, otherProps),
    }),
    [ariaButtonProps, focusProps, otherProps],
  );

  const getIconClone = (icon: ReactNode) =>
    isValidElement(icon)
      ? cloneElement(icon, {
          // @ts-ignore
          "aria-hidden": true,
          focusable: false,
          tabIndex: -1,
          width: "70%",
          height: "70%",
          className: clsx("fill-current max-w-[24px]", icon.props.className),
        })
      : null;

  const leftIcon = getIconClone(leftIconProp);
  const rightIcon = getIconClone(rightIconProp);

  return {
    Component,
    children,
    domRef,
    drips,
    styles,
    leftIcon,
    rightIcon,
    disableRipple,
    getButtonProps,
  };
}

export type UseButtonReturn = ReturnType<typeof useButton>;
