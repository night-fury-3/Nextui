import {cloneElement, forwardRef} from "react";

import {UseImageProps, useImage} from "./use-image";

export interface ImageProps extends Omit<UseImageProps, "ref" | "showSkeleton"> {}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isZoomed,
    fallbackSrc,
    removeWrapper,
    disableSkeleton,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  } = useImage({
    ref,
    ...props,
  });

  const img = <Component ref={domRef} {...getImgProps()} />;

  if (removeWrapper) {
    return img;
  }

  const zoomed = (
    <div className={slots.zoomedWrapper({class: classNames?.zoomedWrapper})}>{img}</div>
  );

  if (isBlurred) {
    // clone element to add isBlurred prop to the cloned image
    return (
      <div {...getWrapperProps()}>
        {isZoomed ? zoomed : img}
        {cloneElement(img, getBlurredImgProps())}
      </div>
    );
  }

  // when zoomed or showSkeleton, we need to wrap the image
  if (isZoomed || !disableSkeleton || fallbackSrc) {
    return <div {...getWrapperProps()}> {isZoomed ? zoomed : img}</div>;
  }

  return img;
});

Image.displayName = "NextUI.Image";

export default Image;
