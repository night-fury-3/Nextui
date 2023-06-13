"use client";

import {FC, useState} from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Link as NextUILink,
  ModalBody,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import {toLower} from "lodash";

import {CodeWindow} from "@/components/code-window";
import {useIsMobile} from "@/hooks/use-media-query";

export interface DemoCodeModalProps {
  isOpen: boolean;
  code: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const DemoCodeModal: FC<DemoCodeModalProps> = ({isOpen, code, title, subtitle, onClose}) => {
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const isMobile = useIsMobile();

  const lowerTitle = toLower(title);
  const fileName = `${toLower(lowerTitle)}.tsx`;

  return (
    <Modal
      classNames={{
        backdrop: "z-[100002]", // to appear above the navbar
        wrapper: "z-[100003]", // to appear above the backdrop
      }}
      isOpen={isOpen}
      motionProps={{
        onAnimationComplete: () => {
          setIsCodeVisible(isOpen);
        },
      }}
      radius={isMobile ? "none" : "2xl"}
      size={isMobile ? "full" : "2xl"}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2">
          <h3>{title} code</h3>
          <p className="text-base font-normal">
            {subtitle || (
              <>
                This is an example of how to use the {lowerTitle} component, for more information
                please visit the&nbsp;
                <NextUILink as={Link} href={`/docs/${lowerTitle}`}>
                  {lowerTitle}
                </NextUILink>
                &nbsp;docs.
              </>
            )}
          </p>
        </ModalHeader>
        <ModalBody>
          <Skeleton className="h-[320px] md:h-[60vh] rounded-xl" isLoaded={isCodeVisible}>
            <CodeWindow
              showCopy
              showWindowIcons
              className="min-h-[320px] max-h-[80vh] md:max-h-[60vh] h-screen"
              language="jsx"
              title={fileName}
              value={code}
            />
          </Skeleton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
