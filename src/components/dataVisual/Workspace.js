import React, { useState } from "react";
import { getDashBoardComponent } from "./DataVisualFactory";
import "../../styles.css";

export default function Workspace(props) {
  const {
    workspaceBlock,
    onCreateSpliter,
    onMergeSplitter,
    onClose,
    onCreateComponent,
    onUpdateLink,
    isDesignModeOn,
    metaData,
    onRaiseLinkEvent,
    registerInvalidate
  } = props;

  let wsComponent = workspaceBlock.find(
    (element) => element.type === "workspace"
  );
  let wsChildContentId = wsComponent.children[0];
  let wsChildContent = workspaceBlock.find(
    (element) => element.id === wsChildContentId
  );

  let MyComponent = getDashBoardComponent(wsChildContent.type);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      <div style={{ flex: 1 }}>
        <MyComponent
          workspaceBlock={workspaceBlock}
          componentBlock={wsChildContent}
          onCreateSpliter={onCreateSpliter}
          onMergeSplitter={onMergeSplitter}
          onClose={onClose}
          onCreateComponent={onCreateComponent}
          isDesignModeOn={isDesignModeOn}
          onUpdateLink={onUpdateLink}
          metaData={metaData}
          onRaiseLinkEvent={onRaiseLinkEvent}
          registerInvalidate={registerInvalidate}
        ></MyComponent>
      </div>
    </div>
  );
}
