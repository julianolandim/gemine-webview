import { useElectronContextMenu } from "@/hooks/useElectronContextMenu";
import WritingToolsModal from "./WritingToolsModal";
import SummarizeModal from "./SummarizeModal";

const ElectronContextMenuProvider = () => {
  const {
    writingToolsOpen,
    summarizeOpen,
    selectedText,
    closeWritingTools,
    closeSummarize,
  } = useElectronContextMenu();

  return (
    <>
      <WritingToolsModal
        isOpen={writingToolsOpen}
        onClose={closeWritingTools}
        text={selectedText}
      />
      <SummarizeModal
        isOpen={summarizeOpen}
        onClose={closeSummarize}
        text={selectedText}
      />
    </>
  );
};

export default ElectronContextMenuProvider;
