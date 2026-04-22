"use client";

import { Modal } from "@/components/ui/animated-modal";
import { ChatDialog } from "./ChatDialog";
import { ChatLauncher } from "./ChatLauncher";
import {
  usePortfolioChat,
  type PortfolioChatProps,
} from "./usePortfolioChat";

export default function PortfolioChat(props: PortfolioChatProps) {
  const chat = usePortfolioChat(props);

  return (
    <Modal>
      <ChatLauncher dictionary={props.dictionary} />
      <ChatDialog
        dictionary={props.dictionary}
        messages={chat.messages}
        isLoading={chat.isLoading}
        errorMessage={chat.errorMessage}
        hasOnlyWelcomeMessage={chat.hasOnlyWelcomeMessage}
        onSubmit={chat.submitMessage}
        onReset={chat.resetChat}
        onStop={chat.stop}
      />
    </Modal>
  );
}
