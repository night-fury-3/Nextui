import {forwardRef} from "@nextui-org/system";
import {LayoutGroup} from "framer-motion";

import {UseAccordionProps, useAccordion} from "./use-accordion";
import {AccordionProvider} from "./accordion-context";
import AccordionItem from "./accordion-item";

export interface AccordionProps extends Omit<UseAccordionProps, "ref"> {}

const AccordionGroup = forwardRef<AccordionProps, "div">((props, ref) => {
  const {
    Component,
    context,
    state,
    getBaseProps,
    disableAnimation,
    handleFocusChanged,
    itemStyles,
  } = useAccordion({
    ref,
    ...props,
  });

  const content = [...state.collection].map((item) => (
    <AccordionItem
      key={item.key}
      item={item}
      onFocusChange={(isFocused) => handleFocusChanged(isFocused, item.key)}
      {...item.props}
      classNames={{...itemStyles, ...(item.props.classNames || {})}}
    />
  ));

  return (
    <Component {...getBaseProps()}>
      <AccordionProvider value={context}>
        {disableAnimation ? content : <LayoutGroup>{content}</LayoutGroup>}
      </AccordionProvider>
    </Component>
  );
});

AccordionGroup.displayName = "NextUI.Accordion";

export default AccordionGroup;
