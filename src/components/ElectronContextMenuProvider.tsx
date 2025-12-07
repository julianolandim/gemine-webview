import { lazy, Suspense } from "react";
import { useElectronContextMenu } from "@/hooks/useElectronContextMenu";

const WritingToolsModal = lazy(() => import("./WritingToolsModal"));
const SummarizeModal = lazy(() => import("./SummarizeModal"));

const ElectronContextMenuProvider = () => {
  const {
    writingToolsOpen,
    summarizeOpen,
    selectedText,
    closeWritingTools,
    closeSummarize,
  } = useElectronContextMenu();

  return (
    <Suspense fallback={null}>
      {writingToolsOpen && (
        <WritingToolsModal
          isOpen={writingToolsOpen}
          onClose={closeWritingTools}
          text={selectedText}
        />
      )}
      {summarizeOpen && (
        <SummarizeModal
          isOpen={summarizeOpen}
          onClose={closeSummarize}
          text={selectedText}
        />
      )}
    </Suspense>
  );
};

export default ElectronContextMenuProvider;
