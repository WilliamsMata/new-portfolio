"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import Image from "next/image";
import { SkillData } from "@/data/skills";
import { buttonVariants } from "../ui/button";
import { Modal, ModalBody, ModalContent, useModal } from "../ui/animated-modal";
import { cn } from "@/lib/utils";
import { BoxArrowUp } from "../icons";
import { BackgroundGradient } from "../ui/background-gradient";

interface SkillModalContextType {
  activeSkill: SkillData | null;
  setActiveSkill: (skill: SkillData) => void;
}

const SkillModalContext = createContext<SkillModalContextType | undefined>(
  undefined,
);

export const SkillModalProvider = ({ children }: { children: ReactNode }) => {
  const [activeSkill, setActiveSkill] = useState<SkillData | null>(null);

  return (
    <SkillModalContext.Provider value={{ activeSkill, setActiveSkill }}>
      {children}
    </SkillModalContext.Provider>
  );
};

export const useSkillModal = () => {
  const context = useContext(SkillModalContext);
  if (!context) {
    throw new Error("useModal must be used within a SkillModalProvider");
  }
  return context;
};

export const SkillModal: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SkillModalProvider>
      <Modal>
        {children}
        <SkillModalBody>
          <SkillModalContent />
        </SkillModalBody>
      </Modal>
    </SkillModalProvider>
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
  const { setActiveSkill } = useSkillModal();
  const { setOpen } = useModal();
  return (
    <div
      className={cn(
        "w-6/12 cursor-pointer rounded-xl p-4 transition-all hover:p-2 hover:shadow-2xl hover:shadow-purple-600 active:scale-90 sm:w-4/12 md:w-3/12 md:p-6 lg:w-2/12",
        className,
      )}
      onClick={() => {
        setActiveSkill(skill);
        setOpen(true);
      }}
    >
      {children}
    </div>
  );
};

export const SkillModalBody: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ModalBody className="rounded-3xl border-none md:rounded-3xl">
      <BackgroundGradient>{children}</BackgroundGradient>
    </ModalBody>
  );
};

export const SkillModalContent = () => {
  const { activeSkill } = useSkillModal();
  return (
    <ModalContent className="flex flex-col items-center justify-center gap-4 rounded-3xl bg-white dark:bg-neutral-950">
      {activeSkill && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div
            className={`relative aspect-square w-6/12 ${
              activeSkill.needInvertColor ? "dark:invert" : ""
            }`}
          >
            <Image src={activeSkill.iconPath} alt={activeSkill.title} fill />
          </div>

          <div>
            <h3 className="text-start text-4xl font-bold">
              {activeSkill.title}
            </h3>
            <p className="text-sm text-muted-foreground">
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
            Learn more <BoxArrowUp className="mb-1 ml-2 h-4 w-4" />
          </a>
        </div>
      )}
    </ModalContent>
  );
};
