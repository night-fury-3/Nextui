import {FC, useRef, useEffect} from "react";
import {clsx} from "@nextui-org/shared-utils";
import {Divider, Spacer} from "@nextui-org/react";
import {ChevronCircleTopLinearIcon} from "@nextui-org/shared-icons";
import scrollIntoView from "scroll-into-view-if-needed";

import {Heading} from "@/libs/docs/utils";
import {useScrollSpy} from "@/hooks/use-scroll-spy";

export interface DocsTocProps {
  headings: Heading[];
}

const paddingLeftByLevel: Record<number, string> = {
  1: "pl-0",
  2: "pl-0",
  3: "pl-3",
  4: "pl-3",
};

export const DocsToc: FC<DocsTocProps> = ({headings}) => {
  const tocRef = useRef<HTMLDivElement>(null);

  const activeId = useScrollSpy(
    headings.map(({id}) => `[id="${id}"]`),
    {
      rootMargin: "0% 0% -80% 0%",
    },
  );

  useEffect(() => {
    if (!activeId) return;
    const anchor = tocRef.current?.querySelector(`li > a[href="#${activeId}"]`);

    if (anchor) {
      scrollIntoView(anchor, {
        behavior: "smooth",
        block: "center",
        inline: "center",
        scrollMode: "always",
        boundary: tocRef.current,
      });
    }
  }, [activeId]);

  const activeIndex = headings.findIndex(({id}) => id == activeId);
  const firstId = headings[0].id;

  return (
    <div
      ref={tocRef}
      className="sticky w-full flex flex-col gap-4 text-left top-20 pb-20 h-[calc(100vh-121px)] scrollbar-hide overflow-y-scroll"
    >
      <p className="text-sm">On this page</p>
      <ul className="scrollbar-hide flex flex-col gap-2">
        {headings.map((heading, i) => (
          <li
            key={i}
            className={clsx(
              "transition-colors",
              "flex items-center text-sm font-normal text-foreground/30",
              "data-[active=true]:text-foreground/80",
              "before:content-['']",
              "before:opacity-0",
              "data-[active=true]:before:opacity-100",
              "before:transition-opacity",
              "before:-ml-3",
              "before:absolute",
              "before:bg-default-400",
              "before:w-1",
              "before:h-1",
              "before:rounded-full",
              paddingLeftByLevel[heading.level],
            )}
            data-active={activeId == heading.id}
          >
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
        <li
          className="mt-2 opacity-0 data-[visible=true]:opacity-100 transition-opacity"
          data-visible={activeIndex >= 2}
        >
          <Divider />
          <Spacer y={2} />
          <a
            className="flex gap-2 items-center text-sm text-foreground/30 hover:text-foreground/80 pl-4 transition-opacity"
            href={`#${firstId}`}
          >
            Back to top
            <ChevronCircleTopLinearIcon />
          </a>
        </li>
      </ul>
    </div>
  );
};
