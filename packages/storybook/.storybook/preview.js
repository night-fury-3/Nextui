import React from "react";
import {themes} from "@storybook/theming";
import Style from "./style";
import {Analytics} from "@vercel/analytics/react";

export const decorators = [
  (Story) => (
    <>
      <div className="bg-dark">
        <Style />
        <Story />
      </div>
      <Analytics />
    </>
  ),
];

export const parameters = {
  actions: {argTypesRegex: "^on[A-Z].*"},
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Foundations", "Components"],
    },
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: "dark",
    stylePreview: true,
    darkClass: "dark",
    lightClass: "light",
    classTarget: "html",
    dark: {
      ...themes.dark,
      appBg: "#161616",
      barBg: "black",
      background: "black",
      appContentBg: "black",
      appBorderRadius: 14,
    },
    light: {
      ...themes.light,
      appBorderRadius: 14,
    },
  },
};
