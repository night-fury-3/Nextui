/**
 * Based on the tw-colors by L-Blondy
 * @see https://github.com/L-Blondy/tw-colors
 */

import Color from "color";
import plugin from "tailwindcss/plugin.js";
import forEach from "lodash.foreach";
import flatten from "flat";
import get from "lodash.get";
import omit from "lodash.omit";
import deepMerge from "deepmerge";

import {semanticColors, commonColors} from "./colors";
import {animations} from "./animations";
import {utilities} from "./utilities";
import {removeDefaultKeys} from "./utils/object";
import {baseStyles} from "./utils/classes";

interface MaybeNested<K extends keyof any = string, V = string> {
  [key: string]: V | MaybeNested<K, V>;
}

const SCHEME = Symbol("color-scheme");
const DEFAULT_PREFIX = "nextui";

export type Colors = MaybeNested<string, string>;

export interface ColorsWithScheme<T> extends Colors {
  [SCHEME]?: T;
}

interface FlatColorsWithScheme<T> extends Record<string, string> {
  [SCHEME]?: T;
}

type SchemerFn<T> = (colors: Colors) => ColorsWithScheme<T>;

const dark: SchemerFn<"dark"> = (colors) => {
  return {
    [SCHEME]: "dark",
    ...colors,
  };
};

const light: SchemerFn<"light"> = (colors) => {
  return {
    [SCHEME]: "light",
    ...colors,
  };
};

export type DefaultThemeType = "light" | "dark";

export type ConfigObject = Record<string, ColorsWithScheme<"light" | "dark">>;

export type ConfigFunction = ({
  light,
  dark,
}: {
  light: SchemerFn<"light">;
  dark: SchemerFn<"dark">;
}) => ConfigObject;

export type NextUIConfig = {
  /**
   * The prefix for the css variables.
   * @default "nextui"
   */
  prefix?: string;
  /**
   * If true, the common nextui colors (e.g. "blue", "green", "purple") will not be extended on the theme.
   */
  omitCommonColors?: boolean;
  /**
   * The theme definitions.
   */
  themes?: ConfigObject | ConfigFunction;
  /**
   * The default theme to use.
   * @default "light"
   */
  defaultTheme?: DefaultThemeType;
};

// @internal
const resolveConfig = (
  config: ConfigObject | ConfigFunction = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
) => {
  const resolved: {
    variants: {name: string; definition: string[]}[];
    utilities: Record<string, Record<string, any>>;
    colors: Record<
      string,
      ({opacityValue, opacityVariable}: {opacityValue: string; opacityVariable: string}) => string
    >;
  } = {
    variants: [],
    utilities: {},
    colors: {},
  };
  const configObject = typeof config === "function" ? config({dark, light}) : config;

  forEach(configObject, (colors: ColorsWithScheme<"light" | "dark">, themeName: string) => {
    let cssSelector = `.${themeName},[data-theme="${themeName}"]`;

    // if the theme is the default theme, add the selector to the root element
    if (themeName === defaultTheme) {
      cssSelector = `:root,${cssSelector}`;
    }

    resolved.utilities[cssSelector] = colors[SCHEME]
      ? {
          "color-scheme": colors[SCHEME],
        }
      : {};

    // flatten color definitions
    const flatColors = removeDefaultKeys(
      flatten(colors, {
        safe: true,
        delimiter: "-",
      }) as Object,
    ) as FlatColorsWithScheme<"light" | "dark">;

    // resolved.variants
    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    forEach(flatColors, (colorValue, colorName) => {
      // this case was handled above
      if ((colorName as any) === SCHEME || !colorValue) return;

      try {
        // const [h, s, l, defaultAlphaValue] = parseToHsla(colorValue);
        const [h, s, l, defaultAlphaValue] = Color(colorValue).hsl().round().array();
        const nextuiColorVariable = `--${prefix}-${colorName}`;
        const nextuiOpacityVariable = `--${prefix}-${colorName}-opacity`;

        // set the css variable in "@layer utilities"
        resolved.utilities[cssSelector]![nextuiColorVariable] = `${h} ${s}% ${l}%`;
        // if an alpha value was provided in the color definition, store it in a css variable
        if (typeof defaultAlphaValue === "number") {
          resolved.utilities[cssSelector]![nextuiOpacityVariable] = defaultAlphaValue.toFixed(2);
        }
        // set the dynamic color in tailwind config theme.colors
        resolved.colors[colorName] = ({opacityVariable, opacityValue}) => {
          // if the opacity is set  with a slash (e.g. bg-primary/90), use the provided value
          if (!isNaN(+opacityValue)) {
            return `hsl(var(${nextuiColorVariable}) / ${opacityValue})`;
          }
          // if no opacityValue was provided (=it is not parsable to a number)
          // the nextuiOpacityVariable (opacity defined in the color definition rgb(0, 0, 0, 0.5)) should have the priority
          // over the tw class based opacity(e.g. "bg-opacity-90")
          // This is how tailwind behaves as for v3.2.4
          if (opacityVariable) {
            return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, var(${opacityVariable})))`;
          }

          return `hsl(var(${nextuiColorVariable}) / var(${nextuiOpacityVariable}, 1))`;
        };
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log("error", error?.message);
      }
    });
  });

  return resolved;
};

const corePlugin = (
  config: ConfigObject | ConfigFunction = {},
  defaultTheme: DefaultThemeType,
  prefix: string,
  omitCommonColors: boolean,
) => {
  const resolved = resolveConfig(config, defaultTheme, prefix);

  return plugin(
    ({addBase, addUtilities, addVariant}) => {
      // add base classNames
      addBase({
        [":root, [data-theme]"]: {
          ...baseStyles(prefix),
        },
      });
      // add the css variables to "@layer utilities"
      addUtilities({...resolved.utilities, ...utilities});
      // add the theme as variant e.g. "[theme-name]:text-2xl"
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });
    },
    // extend the colors config
    {
      theme: {
        extend: {
          // @ts-ignore
          colors: {
            ...(omitCommonColors ? {} : commonColors),
            ...resolved.colors,
          },
          fontSize: {
            tiny: "0.625rem",
          },
          borderWidth: {
            1: "1px",
            1.5: "1.5px",
            3: "3px",
            5: "5px",
          },
          minWidth: {
            1: "0.25rem",
            2: "0.5rem",
            3: "0.75rem",
            "3.5": "0.875rem",
            4: "1rem",
            5: "1.25rem",
            6: "1.5rem",
            7: "1.75rem",
            8: "2rem",
          },
          backgroundImage: {
            "stripe-gradient":
              "linear-gradient(45deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.1) 75%, transparent 75%, transparent)",
          },
          transitionDuration: {
            0: "0ms",
            250: "250ms",
            400: "400ms",
          },
          transitionTimingFunction: {
            "soft-spring": "cubic-bezier(0.155, 1.105, 0.295, 1.12)",
          },
          ...animations,
        },
      },
    },
  );
};

export const nextui = (config: NextUIConfig = {}) => {
  const themeObject =
    typeof config.themes === "function" ? config.themes({dark, light}) : config.themes;

  const userLightColors = get(themeObject, "light", {});
  const userDarkColors = get(themeObject, "dark", {});

  const defaultTheme = config.defaultTheme || "light";
  const defaultPrefix = config.prefix || DEFAULT_PREFIX;
  const omitCommonColors = config.omitCommonColors || false;

  // get other themes from the config different from light and dark
  const otherThemes = omit(themeObject, ["light", "dark"]) || {};

  return corePlugin(
    {
      light: deepMerge(semanticColors.light, userLightColors),
      dark: deepMerge(semanticColors.dark, userDarkColors),
      ...otherThemes,
    },
    defaultTheme,
    defaultPrefix,
    omitCommonColors,
  );
};
