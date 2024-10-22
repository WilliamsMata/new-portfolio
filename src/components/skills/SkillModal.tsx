"use client";
import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import Image from "next/image";
import { SkillData } from "@/interfaces";
import { buttonVariants } from "../ui/button";
import { Modal, ModalBody, ModalContent, useModal } from "../ui/animated-modal";
import { cn } from "@/lib/utils";
import { BoxArrowUp } from "../icons";
import { BackgroundGradient } from "../ui/background-gradient";

interface SkillModalContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeSkill: SkillData | null;
  setActiveSkill: (skill: SkillData) => void;
}

const SkillModalContext = createContext<SkillModalContextType | undefined>(
  undefined,
);

export const SkillModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeSkill, setActiveSkill] = useState<SkillData | null>(null);
  const { open, setOpen } = useModal();

  return (
    <SkillModalContext.Provider
      value={{ open, setOpen, activeSkill, setActiveSkill }}
    >
      {children}
    </SkillModalContext.Provider>
  );
};

interface SkillModalProps {
  children: React.ReactNode;
  learnMoreText: string;
}

export const SkillModal: FC<SkillModalProps> = ({
  children,
  learnMoreText,
}) => {
  return (
    <Modal>
      <SkillModalProvider>
        {children}
        <SkillModalBody>
          <SkillModalContent learnMoreText={learnMoreText} />
        </SkillModalBody>
      </SkillModalProvider>
    </Modal>
  );
};

interface SkillModalTriggerProps extends PropsWithChildren {
  skill: SkillData;
  className?: string;
}

export const SkillModalTrigger: FC<SkillModalTriggerProps> = ({
  skill,
  className,
  children,
}) => {
  const setActiveSkill = useContextSelector(
    SkillModalContext,
    (context) => context?.setActiveSkill,
  );

  const setOpen = useContextSelector(
    SkillModalContext,
    (context) => context?.setOpen,
  );

  return (
    <div
      className={cn(className)}
      onClick={() => {
        setActiveSkill?.(skill);
        setOpen?.(true);
      }}
    >
      {children}
    </div>
  );
};

export const SkillModalBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ModalBody className="overflow-y-auto rounded-3xl border-none md:rounded-3xl">
      <BackgroundGradient>{children}</BackgroundGradient>
    </ModalBody>
  );
};

interface SkillModalContentProps {
  learnMoreText: string;
}

export const SkillModalContent: FC<SkillModalContentProps> = ({
  learnMoreText,
}) => {
  const activeSkill = useContextSelector(
    SkillModalContext,
    (context) => context?.activeSkill,
  );
  return (
    <ModalContent className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-background">
      {activeSkill && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={cn(
              "relative aspect-square w-6/12",
              activeSkill.needInvertColor && "dark:invert",
            )}
          >
            <Image src={activeSkill.iconPath} alt={activeSkill.title} fill />
          </div>

          <div>
            <h3 className="text-start text-4xl font-bold">
              {activeSkill.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {activeSkill.description}
            </p>
          </div>

          <a
            href={activeSkill.url}
            target="_blank"
            className={cn(
              buttonVariants({ size: "sm" }),
              "flex items-center self-end transition-transform active:scale-90",
            )}
          >
            {learnMoreText} <BoxArrowUp className="mb-1 ml-2 h-4 w-4" />
          </a>
        </div>
      )}
    </ModalContent>
  );
};
