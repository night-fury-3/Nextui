import type {GridNode} from "@react-types/grid";

import {forwardRef, HTMLNextUIProps} from "@nextui-org/system";
import {useDOMRef} from "@nextui-org/react-utils";
import {clsx, dataAttr} from "@nextui-org/shared-utils";
import {useTableColumnHeader} from "@react-aria/table";
import {filterDOMProps, mergeProps} from "@react-aria/utils";
import {ChevronDownIcon} from "@nextui-org/shared-icons";
import {useFocusRing} from "@react-aria/focus";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {useHover} from "@react-aria/interactions";

import {useTableContext} from "./table-context";

export interface TableColumnHeaderProps<T = object> extends HTMLNextUIProps<"th"> {
  /**
   * The table node to render.
   */
  node: GridNode<T>;
}

const TableColumnHeader = forwardRef<TableColumnHeaderProps, "th">((props, ref) => {
  const {as, className, node, ...otherProps} = props;

  const Component = as || "th";
  const domRef = useDOMRef(ref);

  const {slots, state, classNames} = useTableContext();

  const {columnHeaderProps} = useTableColumnHeader({node}, state, domRef);

  const thStyles = clsx(classNames?.th, className, node.props?.className);

  const {isFocusVisible, focusProps} = useFocusRing();
  const {isHovered, hoverProps} = useHover({});
  const {hideHeader, ...columnProps} = node.props;

  const allowsSorting = columnProps.allowsSorting;

  return (
    <Component
      ref={domRef}
      colSpan={node.colspan}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-sortable={dataAttr(allowsSorting)}
      {...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(columnProps, {labelable: true}),
        allowsSorting ? hoverProps : {},
        otherProps,
      )}
      className={slots.th?.({class: thStyles})}
    >
      {hideHeader ? <VisuallyHidden>{node.rendered}</VisuallyHidden> : node.rendered}
      {allowsSorting && (
        <ChevronDownIcon
          aria-hidden="true"
          className={slots.sortIcon?.({class: classNames?.sortIcon})}
          data-direction={state.sortDescriptor?.direction}
          data-visible={dataAttr(state.sortDescriptor?.column === node.key)}
          strokeWidth={3}
        />
      )}
    </Component>
  );
});

TableColumnHeader.displayName = "NextUI.TableColumnHeader";

export default TableColumnHeader;
