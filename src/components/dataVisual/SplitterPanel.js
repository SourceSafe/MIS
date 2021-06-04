import "./splitterPanel.css";
import { getDashBoardComponent } from "./DataVisualFactory";
import SplitterLayout from "react-splitter-layout";
export default function SplitterPanel(props) {
  const {
    workspaceBlock,
    componentBlock,
    onCreateSpliter,
    onMergeSplitter,
    onClose,
    onCreateComponent,
    isDesignModeOn,
    onUpdateLink,
    metaData,
    onRaiseLinkEvent,
    registerInvalidate
  } = props;

  const isVertical =
    componentBlock.properties.orientation === "vertical" ? true : false;
  const percentage = componentBlock.properties.percentage;
  const primaryIndex = componentBlock.properties.primaryIndex;
  const secondaryInitialSize = componentBlock.properties.secondaryInitialSize;

  let child1Block = workspaceBlock.find(
    (element) => element.id === componentBlock.children[0]
  );
  let child2Block = workspaceBlock.find(
    (element) => element.id === componentBlock.children[1]
  );

  const Child1 = getDashBoardComponent(child1Block.type);
  const Child2 = getDashBoardComponent(child2Block.type);

  return (
    <SplitterLayout
      vertical={isVertical}
      percentage={percentage}
      primaryIndex={primaryIndex}
      secondaryInitialSize={secondaryInitialSize}
      onMergeSplitter={onMergeSplitter}
    >
      <div className="containerClass">
        <Child1
          workspaceBlock={workspaceBlock}
          componentBlock={child1Block}
          onCreateSpliter={onCreateSpliter}
          onMergeSplitter={onMergeSplitter}
          onClose={onClose}
          onCreateComponent={onCreateComponent}
          parentBlock={componentBlock}
          isDesignModeOn={isDesignModeOn}
          onUpdateLink={onUpdateLink}
          metaData={metaData}
          onRaiseLinkEvent={onRaiseLinkEvent}
          registerInvalidate={registerInvalidate}
        ></Child1>
      </div>

      <div className="containerClass">
        <Child2
          workspaceBlock={workspaceBlock}
          componentBlock={child2Block}
          onCreateSpliter={onCreateSpliter}
          onMergeSplitter={onMergeSplitter}
          onClose={onClose}
          parentBlock={componentBlock}
          onCreateComponent={onCreateComponent}
          isDesignModeOn={isDesignModeOn}
          onUpdateLink={onUpdateLink}
          metaData={metaData}
          onRaiseLinkEvent={onRaiseLinkEvent}
          registerInvalidate={registerInvalidate}
        ></Child2>
      </div>
    </SplitterLayout>
  );
}
