import {forwardRef} from "@nextui-org/system";

import Thumb from "./slider-thumb";
import {UseSliderProps, useSlider} from "./use-slider";

export interface SliderProps extends UseSliderProps {}

const Slider = forwardRef<"div", SliderProps>((props, ref) => {
  const {
    Component,
    state,
    label,
    stepsCount,
    getStepsProps,
    getBaseProps,
    getLabelWrapperProps,
    getLabelProps,
    getOutputProps,
    getTrackProps,
    getFillerProps,
    getThumbProps,
  } = useSlider({...props, ref});

  return (
    <Component {...getBaseProps()}>
      {label && (
        <div {...getLabelWrapperProps()}>
          <label {...getLabelProps()}>{label}</label>
          <output {...getOutputProps()} />
        </div>
      )}
      <div {...getTrackProps()}>
        <div {...getFillerProps()} />
        {Array.from({length: stepsCount}, (_, index) => (
          <div key={index} {...getStepsProps(index)} />
        ))}
        {state.values.map((_, index) => (
          <Thumb key={index} {...getThumbProps(index)} />
        ))}
      </div>
    </Component>
  );
});

Slider.displayName = "NextUI.Slider";

export default Slider;
