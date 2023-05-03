import type {ImageVariantProps, SlotsToClasses, ImageSlots} from "@nextui-org/theme";

import {ImgHTMLAttributes, useCallback} from "react";
import {HTMLNextUIProps, mapPropsVariants, PropGetter} from "@nextui-org/system";
import {image} from "@nextui-org/theme";
import {useDOMRef} from "@nextui-org/dom-utils";
import {clsx, dataAttr, ReactRef} from "@nextui-org/shared-utils";
import {useImage as useImageBase} from "@nextui-org/use-image";
import {useMemo} from "react";
type NativeImageProps = ImgHTMLAttributes<HTMLImageElement>;

interface Props extends HTMLNextUIProps<"img"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLImageElement | null>;
  /**
   * Whether to add a blurred effect to the image.
   * @default false
   */
  isBlurred?: boolean;
  /**
   * A fallback image.
   */
  fallbackSrc?: React.ReactNode;
  /**
   * Whether to disable the loading skeleton.
   * @default false
   */
  disableSkeleton?: boolean;
  /**
   * A callback for when the image `src` has been loaded
   */
  onLoad?: NativeImageProps["onLoad"];
  /**
   * A loading strategy to use for the image.
   */
  loading?: NativeImageProps["loading"];
  /**
   * Whether to remove the wrapper element. This will cause the image to be rendered as a direct child of the parent element.
   * If you set this prop as `true` neither the skeleton nor the zoom effect will work.
   * @default false
   */
  removeWrapper?: boolean;
  /**
   * Controlled loading state.
   */
  isLoading?: boolean;
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Image classNames={{
   *    base:"base-classes", // wrapper
   *    img: "img-classes",
   *    blurredImg: "blurredImg-classes", // this is a cloned version of the img
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ImageSlots>;
}

export type UseImageProps = Props & ImageVariantProps;

export function useImage(originalProps: UseImageProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, image.variantKeys);

  const {
    ref,
    as,
    src,
    className,
    classNames,
    loading,
    isBlurred,
    fallbackSrc,
    isLoading: isLoadingProp,
    disableSkeleton = !!fallbackSrc,
    removeWrapper = false,
    onError,
    onLoad,
    ...otherProps
  } = props;

  const imageStatus = useImageBase({
    src,
    loading,
    onError,
    onLoad,
    ignoreFallback: false,
  });

  const isImgLoaded = imageStatus === "loaded" && !isLoadingProp;
  const isLoading = imageStatus === "loading" || isLoadingProp;

  const Component = as || "img";

  const domRef = useDOMRef(ref);

  const {w} = useMemo(() => {
    return {
      w: props.width
        ? typeof props.width === "number"
          ? `${props.width}px`
          : props.width
        : "fit-content",
    };
  }, [props?.width]);

  const showFallback = (!src || !isImgLoaded) && !!fallbackSrc;
  const showSkeleton = isLoading && !disableSkeleton;

  const slots = useMemo(
    () =>
      image({
        ...variantProps,
        showSkeleton,
      }),
    [...Object.values(variantProps), showSkeleton],
  );

  const baseStyles = clsx(className, classNames?.base);

  const getImgProps: PropGetter = (props = {}) => {
    return {
      src,
      ref: domRef,
      "data-loaded": dataAttr(isImgLoaded),
      className: slots.img({class: clsx(baseStyles, props?.className)}),
      ...otherProps,
    };
  };

  const getWrapperProps = useCallback<PropGetter>(() => {
    const fallbackStyle = showFallback
      ? {
          backgroundImage: `url(${fallbackSrc})`,
        }
      : {};

    return {
      className: slots.base({class: classNames?.base}),
      style: {
        ...fallbackStyle,
        maxWidth: w,
      },
    };
  }, [slots, showFallback, fallbackSrc, classNames?.base]);

  const getBlurredImgProps = useCallback<PropGetter>(() => {
    return {
      src,
      "aria-hidden": dataAttr(true),
      className: slots.blurredImg({class: classNames?.blurredImg}),
    };
  }, [slots, src, classNames?.blurredImg]);

  return {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    disableSkeleton,
    fallbackSrc,
    removeWrapper,
    isZoomed: originalProps.isZoomed,
    isLoading: originalProps.isLoading,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  };
}

export type UseImageReturn = ReturnType<typeof useImage>;
