import {styled, VariantProps} from "../theme/stitches.config";

const itemColors = {
  default: {
    $$navbarItemActiveColor: "$colors$link",
    $$navbarItemHighlightBackgroundColor: "$colors$primaryLight",
    $$navbarItemHighlightTextColor: "$colors$primaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$primary",
    $$navbarItemHighlightSolidTextColor: "$colors$primarySolidContrast",
  },
  neutral: {
    $$navbarItemActiveColor: "$colors$neutral",
    $$navbarItemHighlightBackgroundColor: "$colors$neutralLight",
    $$navbarItemHighlightTextColor: "$colors$text",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$neutral",
    $$navbarItemHighlightSolidTextColor: "$colors$neutralSolidContrast",
  },
  primary: {
    $$navbarItemActiveColor: "$colors$primary",
    $$navbarItemHighlightBackgroundColor: "$colors$primaryLight",
    $$navbarItemHighlightTextColor: "$colors$primaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$primary",
    $$navbarItemHighlightSolidTextColor: "$colors$primarySolidContrast",
  },
  secondary: {
    $$navbarItemActiveColor: "$colors$secondary",
    $$navbarItemHighlightBackgroundColor: "$colors$secondaryLight",
    $$navbarItemHighlightTextColor: "$colors$secondaryLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$secondary",
    $$navbarItemHighlightSolidTextColor: "$colors$secondarySolidContrast",
  },
  success: {
    $$navbarItemActiveColor: "$colors$success",
    $$navbarItemHighlightBackgroundColor: "$colors$successLight",
    $$navbarItemHighlightTextColor: "$colors$successLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$success",
    $$navbarItemHighlightSolidTextColor: "$colors$successSolidContrast",
  },
  warning: {
    $$navbarItemActiveColor: "$colors$warning",
    $$navbarItemHighlightBackgroundColor: "$colors$warningLight",
    $$navbarItemHighlightTextColor: "$colors$warningLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$warning",
    $$navbarItemHighlightSolidTextColor: "$colors$warningSolidContrast",
  },
  error: {
    $$navbarItemActiveColor: "$colors$error",
    $$navbarItemHighlightBackgroundColor: "$colors$errorLight",
    $$navbarItemHighlightTextColor: "$colors$errorLightContrast",
    $$navbarItemHighlightSolidBackgroundColor: "$colors$error",
    $$navbarItemHighlightSolidTextColor: "$colors$errorSolidContrast",
  },
};

export const StyledBaseNavbarItem = styled("li", {
  mb: 0,
  display: "flex",
  alignItems: "center",
  listStyleType: "none",
  lineHeight: "inherit",
});

export const StyledBaseNavbarList = styled("ul", {
  m: 0,
  listStyle: "none",
  lineHeight: "$xs",
  li: {
    mb: 0,
  },
});

export const StyledNavbarBrand = styled("span", {
  display: "flex",
  flexWrap: "nowrap",
  flexDirection: "row",
  justifyContent: "flex-start",
  bg: "transparent",
  alignItems: "center",
  textDecoration: "none",
  fontSize: "$base",
  whiteSpace: "nowrap",
  boxSizing: "border-box",
});

export const StyledNavbarItem = styled(StyledBaseNavbarItem, {
  $$navbarItemFontSize: "inherit",
  $$navbarItemFontWeight: "$fontWeights$normal",
  fontSize: "$$navbarItemFontSize",
  fontWeight: "$$navbarItemFontWeight",
  position: "relative",
  "*": {
    zIndex: "$2",
  },
  "&:before": {
    opacity: 0,
    zIndex: "$1",
    content: '""',
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "$sm",
  },
  "&:after": {
    opacity: 0,
    zIndex: "$1",
    content: '""',
    display: "block",
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    height: "$$navbarItemUnderlineHeight",
    borderRadius: "0px",
    background: "$$navbarItemActiveColor",
  },
  variants: {
    activeColor: itemColors,
    isActive: {
      true: {
        color: "$$navbarItemActiveColor",
        $$navbarItemFontWeight: "$fontWeights$semibold",
      },
    },
    variant: {
      default: {},
      underline: {
        color: "inherit",
        height: "100%",
      },
      "underline-rounded": {
        color: "inherit",
        height: "100%",
      },
      highlight: {},
      "highlight-solid": {},
      "highlight-rounded": {},
      "highlight-solid-rounded": {},
    },
    underlineHeight: {
      light: {
        $$navbarItemUnderlineHeight: "2px",
      },
      normal: {
        $$navbarItemUnderlineHeight: "4px",
      },
      bold: {
        $$navbarItemUnderlineHeight: "6px",
      },
      extrabold: {
        $$navbarItemUnderlineHeight: "8px",
      },
      black: {
        $$navbarItemUnderlineHeight: "10px",
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: "not-allowed",
      },
    },
  },
  compoundVariants: [
    /**
     * @isActive true
     * @variant underline
     */
    {
      isActive: true,
      variant: "underline",
      css: {
        color: "inherit",
        "&:after": {
          opacity: 1,
        },
      },
    },
    /**
     * @isActive true
     * @variant underline
     */
    {
      isActive: true,
      variant: "underline-rounded",
      css: {
        color: "inherit",
        "&:after": {
          opacity: 1,
          borderRadius: "calc($$navbarItemUnderlineHeight / 2)",
        },
      },
    },
    /**
     * @isActive true
     * @variant highlight
     */
    {
      isActive: true,
      variant: "highlight",
      css: {
        color: "$$navbarItemHighlightTextColor",
        "*:first-child": {
          color: "inherit",
        },
        "&:before": {
          opacity: 1,
          background: "$$navbarItemHighlightBackgroundColor",
        },
      },
    },
    /**
     * @isActive true
     * @variant highlight-solid
     */
    {
      isActive: true,
      variant: "highlight-solid",
      css: {
        color: "$$navbarItemHighlightSolidTextColor",
        "*:first-child": {
          color: "inherit",
        },
        "&:before": {
          opacity: 1,
          background: "$$navbarItemHighlightSolidBackgroundColor",
        },
      },
    },
    /**
     * @isActive true
     * @variant highlight-rounded
     */
    {
      isActive: true,
      variant: "highlight-rounded",
      css: {
        color: "$$navbarItemHighlightTextColor",
        "*:first-child": {
          color: "inherit",
        },
        "&:before": {
          opacity: 1,
          background: "$$navbarItemHighlightBackgroundColor",
        },
      },
    },
    /**
     * @isActive true
     * @variant highlight-solid
     */
    {
      isActive: true,
      variant: "highlight-solid-rounded",
      css: {
        color: "$$navbarItemHighlightSolidTextColor",
        "*:first-child": {
          color: "inherit",
        },
        "&:before": {
          opacity: 1,
          background: "$$navbarItemHighlightSolidBackgroundColor",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "default",
    activeColor: "default",
    underlineHeight: "normal",
  },
});

// @internal
export const StyledCursorHighlight = styled(StyledBaseNavbarItem, {
  position: "absolute",
  top: "calc(50% - $$navbarItemMaxHeight * 0.5)",
  height: "$$navbarItemMaxHeight",
  background: "$neutralLight",
  borderRadius: "$sm",
  transition: "width 0.2s ease 0s, transform 0.2s ease 0s, opacity 0.2s ease 0s",
  variants: {
    color: itemColors,
    isHighlightVariant: {
      true: {
        background: "$$navbarItemHighlightBackgroundColor",
      },
    },
    isHighlightSolidVariant: {
      true: {
        background: "$$navbarItemHighlightSolidBackgroundColor",
      },
    },
    isRounded: {
      true: {
        borderRadius: "$pill",
      },
    },
  },
});

export const StyledNavbarContent = styled(StyledBaseNavbarList, {
  $$navbarContentItemGap: "$space$10",
  $$navbarContentItemHorizontalPadding: "$space$10",
  d: "flex",
  height: "100%",
  flexWrap: "nowrap",
  alignItems: "center",
  gap: "$$navbarContentItemGap",
  variants: {
    enableCursorHighlight: {
      true: {
        zIndex: "$2",
        position: "relative",
      },
    },
  },
});

export const StyledNavbarContainer = styled("div", {
  width: "100%",
  height: "$$navbarHeight",
  minHeight: "$$navbarHeight",
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative",
  boxSizing: "border-box",
  color: "inherit",
  px: "$$navbarPadding",
  bg: "$$navbarBackgroundColor",
  maxW: "$$navbarContainerMaxWidth",
  "@xsMax": {
    $$navbarPadding: "$space$6",
    $$navbarFloatingMargin: "$space$6",
  },
});

export const StyledNavbar = styled("nav", {
  // variables
  $$navbarTextColor: "$colors$text",
  $$navbarBackgroundColor: "$colors$background",
  $$navbarBlurBackgroundColor: "$colors$backgroundAlpha",
  $$navbarHeight: "76px",
  $$navbarItemMaxHeight: "calc($$navbarHeight * 0.5)",
  $$navbarBorderColor: "$colors$border",
  $$navbarBorderRadius: "$radii$lg",
  $$navbarPadding: "$space$10",
  $$navbarFloatingMargin: "$space$10",
  $$navbarContainerMaxWidth: "$breakpoints$lg",
  $$navbarShadow: "$shadows$md",
  $$navbarBlur: "10px",
  // styles
  width: "100%",
  dflex: "center",
  position: "relative",
  height: "auto",
  color: "$$navbarTextColor",
  variants: {
    variant: {
      static: {
        position: "static",
      },
      sticky: {
        top: 0,
        right: 0,
        left: 0,
        position: "sticky",
        zIndex: "$2",
      },
      floating: {
        top: 0,
        right: 0,
        left: 0,
        position: "sticky",
        zIndex: "$2",
        "@safari": {
          top: "-5px",
        },
        [`& ${StyledNavbarContainer}`]: {
          mt: "calc($$navbarFloatingMargin * 0.5)",
          mx: "$$navbarFloatingMargin",
          borderRadius: "$$navbarBorderRadius",
        },
      },
    },
    maxWidth: {
      xs: {
        $$navbarContainerMaxWidth: "$breakpoints$xs",
      },
      sm: {
        $$navbarContainerMaxWidth: "$breakpoints$sm",
      },
      md: {
        $$navbarContainerMaxWidth: "$breakpoints$md",
      },
      lg: {
        $$navbarContainerMaxWidth: "$breakpoints$lg",
      },
      xl: {
        $$navbarContainerMaxWidth: "$breakpoints$xl",
      },
      fluid: {
        $$navbarContainerMaxWidth: "100%",
      },
    },
    isBordered: {
      true: {
        [`& ${StyledNavbarContainer}`]: {
          borderBottom: "$$navbarBorderWeight solid $$navbarBorderColor",
        },
      },
    },
    isCompact: {
      true: {
        $$navbarHeight: "54px",
        $$navbarBorderRadius: "$radii$md",
        $$navbarItemMaxHeight: "calc($$navbarHeight * 0.6)",
      },
    },
    disableShadow: {
      false: {
        boxShadow: "$$navbarShadow",
        clipPath: "inset(0px 0px calc($$navbarHeight*-1) 0px)",
      },
    },
    disableBlur: {
      false: {
        "@supports ((-webkit-backdrop-filter: none) or (backdrop-filter: none))": {
          [`& ${StyledNavbarContainer}`]: {
            bg: "$$navbarBlurBackgroundColor",
            backdropFilter: "saturate(180%) blur($$navbarBlur)",
          },
        },
      },
    },
    borderWeight: {
      light: {
        $$navbarBorderWeight: "$borderWeights$light",
      },
      normal: {
        $$navbarBorderWeight: "$borderWeights$normal",
      },
      bold: {
        $$navbarBorderWeight: "$borderWeights$bold",
      },
      extrabold: {
        $$navbarBorderWeight: "$borderWeights$extrabold",
      },
      black: {
        $$navbarBorderWeight: "$borderWeights$black",
      },
    },
  },
  compoundVariants: [
    /**
     * @isBordered true
     * @variant floating
     */
    {
      isBordered: true,
      variant: "floating",
      css: {
        [`& ${StyledNavbarContainer}`]: {
          border: "$$navbarBorderWeight solid $$navbarBorderColor",
        },
      },
    },
    /**
     * @variant floating
     * @disableShadow true
     */
    {
      variant: "floating",
      disableShadow: false,
      css: {
        boxShadow: "none",
        clipPath: "none",
        [`& ${StyledNavbarContainer}`]: {
          boxShadow: "$$navbarShadow",
        },
      },
    },
  ],
  defaultVariants: {
    variant: "static",
    borderWeight: "light",
    maxWidth: "lg",
    isBordered: false,
    disableShadow: false,
    disableBlur: false,
  },
});

export type NavbarVariantsProps = VariantProps<typeof StyledNavbar>;
export type NavbarContentVariantsProps = VariantProps<typeof StyledNavbarContent>;
export type NavbarItemVariantsProps = VariantProps<typeof StyledNavbarItem>;
