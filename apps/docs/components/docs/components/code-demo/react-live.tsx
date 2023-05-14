import React from "react";
import {LivePreview, LiveProvider, LiveError} from "react-live";
import * as Components from "@nextui-org/react";

import {BgGridContainer} from "@/components/bg-grid-container";

export interface ReactLiveProps {
  code: string;
  height?: string | number;
  noInline?: boolean;
  showWindowActions?: boolean;
  iframeSrc?: string;
  iframeTitle?: string;
  iframeInitialWidth?: number;
  enableResize?: boolean;
  overflow?: "auto" | "visible" | "hidden";
}

export const scope = {
  ...Components,
} as Record<string, unknown>;

export const ReactLive: React.FC<ReactLiveProps> = ({code, noInline}) => {
  return (
    <LiveProvider code={code} noInline={noInline} scope={scope}>
      <BgGridContainer>
        <LivePreview className="live-preview" />
        <LiveError />
      </BgGridContainer>
    </LiveProvider>
  );
};
