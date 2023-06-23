import {tv} from "tailwind-variants";

import {dataFocusVisibleClasses} from "../utils";

/**
 * User wrapper **Tailwind Variants** component
 *
 * const {base, wrapper, name, description} = user({...})
 *
 * @example
 * <div className={base())}>
 *   // avatar element @see avatar
 *  <div className={wrapper())}>
 *    <span className={name())}>user name</span>
 *    <span className={description())}>user description</span>
 *  </div>
 * </div>
 */
const user = tv({
  slots: {
    base: [
      "inline-flex items-center justify-center gap-2 rounded-sm outline-none",
      // focus ring
      ...dataFocusVisibleClasses,
    ],
    wrapper: "inline-flex flex-col items-start",
    name: "text-sm text-inherit",
    description: "text-xs text-foreground-400",
  },
});

export type UserSlots = keyof ReturnType<typeof user>;

export {user};
