import "../../buttonStyles.css";
import {
  VscSplitHorizontal,
  VscSplitVertical,
  VscChromeClose,
  VscLink,
  VscSettings,
  VscArrowBoth
} from "react-icons/vsc";

import { getBlockById } from "../../stateHelper";

import MultiSelect from "../guiComponents/MultiSelect";

export default function Chrome(props) {
  const {
    workspaceBlock,
    componentBlock,
    parentBlock,
    onCreateSpliter,
    onClose,
    onMergeSplitter,
    onUpdateLink,
    onFilterInvalidated
  } = props;

  console.log(props);

  const close = () => {
    onClose(componentBlock);
  };

  const split = (orientation) => {
    onCreateSpliter(orientation, componentBlock);
  };

  const onSettings = (e) => {};
  const onLink = (e) => {};

  const onMerge = (e) => {
    if (parentBlock && parentBlock.type === "splitterPanel") {
      onMergeSplitter(parentBlock);
    }
  };

  const isDataComponent = (type) => {
    return type !== "launcher" && type !== "splitterPanel";
  };

  const isSplitterChild =
    parentBlock !== undefined && parentBlock.type === "splitterPanel";

  let showMergeSplitter = false;
  let isLauncher =
    componentBlock !== undefined && componentBlock.type === "launcher";

  if (isSplitterChild) {
    let myIndex = componentBlock.id === parentBlock.children[0] ? 0 : 1;
    let otherIndex = myIndex === 0 ? 1 : 0;

    const otherType = getBlockById(
      workspaceBlock,
      parentBlock.children[otherIndex]
    ).type;

    if (
      componentBlock.type === "launcher" &&
      otherType === "launcher" &&
      myIndex === 0
    ) {
      showMergeSplitter = true;
    }

    if (isDataComponent(componentBlock.type) && otherType === "launcher") {
      showMergeSplitter = true;
    }

    if (componentBlock.type === "launcher" && otherType === "splitterPanel") {
      showMergeSplitter = true;
    }
  }

  return (
    <div>
      <div
        className="chromeTitleBar"
        style={{
          textAlign: "right",
          marginRight: "0px"
        }}
      >
        {showMergeSplitter && (
          <VscArrowBoth
            id="horizontal"
            className="chromeButton alignLeft"
            onClick={onMerge}
          />
        )}

        {!isLauncher && (
          <VscSettings
            className="chromeButton"
            id={componentBlock.id}
            onClick={onSettings}
          />
        )}

        {!isLauncher && (
          <MultiSelect
            workspaceBlock={workspaceBlock}
            componentBlock={componentBlock}
            onUpdateLink={onUpdateLink}
            onFilterInvalidated={onFilterInvalidated}
            className="chromeButton"
            style={{ marginRight: "20px" }}
            buttonComponent={
              <VscLink
                style={{ marginRight: "20px" }}
                className="chromeButton"
                id={componentBlock.id}
                onClick={onLink}
              />
            }
          ></MultiSelect>
        )}

        <VscSplitHorizontal
          className="chromeButton"
          onClick={() => {
            split("horizontal");
          }}
        />

        <VscSplitVertical
          className="chromeButton"
          onClick={() => {
            split("vertical");
          }}
        />

        {!isLauncher && (
          <VscChromeClose className="chromeButton" id="close" onClick={close} />
        )}
      </div>
    </div>
  );
}
