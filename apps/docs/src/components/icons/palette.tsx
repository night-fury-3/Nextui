import * as React from "react";
import {useTheme} from "@nextui-org/react";

import {IconProps} from "./index";

const Palette: React.FC<IconProps> = ({fill, size, height, width, ...props}) => {
  const {theme} = useTheme();

  return (
    <svg
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        fill="none"
        stroke={fill || theme?.colors?.text?.value}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M10 4.5V18a4.007 4.007 0 01-1.14 2.79l-.04.04a3.149 3.149 0 01-.28.25 3.5 3.5 0 01-.99.6c-.11.05-.22.09-.33.13A3.888 3.888 0 016 22a4.255 4.255 0 01-.8-.08c-.13-.03-.26-.06-.39-.1a3.611 3.611 0 01-.46-.17c0-.01 0-.01-.01 0a5.042 5.042 0 01-.8-.49l-.01-.01a2.744 2.744 0 01-.36-.32c-.11-.12-.22-.24-.33-.37a5.042 5.042 0 01-.49-.8c.01-.01.01-.01 0-.01a.031.031 0 00-.01-.02c-.06-.14-.11-.29-.16-.44-.04-.13-.07-.26-.1-.39A4.255 4.255 0 012 18V4.5A2.362 2.362 0 014.5 2h3A2.362 2.362 0 0110 4.5z" />
        <path d="M22 16.5v3a2.362 2.362 0 01-2.5 2.5H6a3.888 3.888 0 001.22-.19c.11-.04.22-.08.33-.13a3.5 3.5 0 00.99-.6 3.149 3.149 0 00.28-.25l.04-.04 6.8-6.79h3.84a2.362 2.362 0 012.5 2.5zM4.81 21.82a3.835 3.835 0 01-1.64-.99 3.835 3.835 0 01-.99-1.64 4.02 4.02 0 002.63 2.63z" />
        <path d="M18.37 11.29L15.66 14l-6.8 6.79A4.007 4.007 0 0010 18V8.335l2.71-2.705a2.368 2.368 0 013.54 0l2.12 2.12a2.368 2.368 0 010 3.54zM7 18a1 1 0 11-1-1 1 1 0 011 1z" />
      </g>
    </svg>
  );
};

export default Palette;
