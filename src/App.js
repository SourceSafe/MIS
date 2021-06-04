import React, { useState, useEffect } from "react";
import "./styles.css";
import Workspace from "./components/dataVisual/Workspace";
import { toggleLink } from "./linkUtils";
import {
  closeComponent,
  mergeSplitter,
  createComponent,
  createSplitter
} from "./splitterUtils";
import { VscTools } from "react-icons/vsc";
import { Downloader } from "ag-grid-community";

export default function App() {
  const [isDesignModeOn, setIsDesignModeOn] = useState(true);
  const [metaData, setMetaData] = useState([]);
  const [idToInvalidateMap, SetIdToInvalidateMap] = useState([]);

  useEffect(() => {
    getMetaDataFromApi();
  }, []);

  const [workspaceBlock, setWorkspaceBlock] = useState([
    { id: "0", type: "workspace", properties: {}, children: ["1"] },
    {
      id: "1",
      type: "splitterPanel",
      properties: {
        orientation: "vertical",
        percentage: false,
        primaryIndex: 1,
        secondaryInitialSize: 150
      },
      children: ["2", "3"],
      upLinks: [],
      downLinks: []
    },
    {
      id: "2",
      type: "timeBar",
      title: "timeBar",
      isLinkable: true,
      properties: { dataSource: 1 },
      upLinks: [],
      downLinks: []
    },
    {
      id: "3",
      type: "launcher",
      properties: { title: "Launcher" },
      upLinks: [],
      downLinks: []
    }
  ]);

  const [api, setApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  function onGridReady(params) {
    setApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }

  const getMetaDataFromApi = () => {
    console.log(
      "https://u0i4ez1dk4.execute-api.eu-west-2.amazonaws.com/Production/metadata"
    );
    fetch(
      "https://u0i4ez1dk4.execute-api.eu-west-2.amazonaws.com/Production/metadata"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.Results);
        setMetaData(data.Results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onUpdateink = (receiveLinkId, sendLinkId, onInvalidate) => {
    toggleLink(
      workspaceBlock,
      receiveLinkId,
      sendLinkId,
      setWorkspaceBlock,
      onInvalidate
    );
  };

  const onMergeSplitter = (content) => {
    mergeSplitter(workspaceBlock, content, setWorkspaceBlock);
  };

  const onCreateComponent = (content, type) => {
    createComponent(workspaceBlock, content, type, setWorkspaceBlock);
  };

  const onCloseComponent = (content) => {
    closeComponent(workspaceBlock, content, setWorkspaceBlock);
  };

  const onCreateSplitter = (action, content) => {
    createSplitter(workspaceBlock, action, content, setWorkspaceBlock);
  };

  const onDesignModeToggle = () => {
    setIsDesignModeOn(!isDesignModeOn);
  };

  const registerInvalidate = (id, invalidateFunction) => {
    const newEntry = { id: id, cb: invalidateFunction };
    const copy = [...idToInvalidateMap];
    copy.push(newEntry);
    SetIdToInvalidateMap(copy);
  };

  const onRaiseLinkEvent = (source, event) => {
    console.log(source);
    //Get the downlinks and invalidate
    const downlinks = source.downLinks;
    if (downlinks !== undefined) {
      downlinks.forEach((idToInvalidate) => {
        const componentFunctionToCall = idToInvalidateMap.find(
          (item) => item.id === idToInvalidate
        );

        if (componentFunctionToCall !== undefined) {
          componentFunctionToCall.cb(event.data);
        }
      });

      //console.log(idToInvalidate)
    }
  };

  let designModeClass = "chromeWorkspaceEditButton";
  designModeClass = isDesignModeOn
    ? (designModeClass = designModeClass + " chromeWorkspaceEditButtonOn")
    : (designModeClass = designModeClass + " chromeWorkspaceEditButtonOff");

  /*
    <div style={{ textAlign: "left", marginRight: "27px", flex: "0" }}>
    <VscTools className={designModeClass} onClick={onDesignModeToggle} />
  </div>
  */

  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ textAlign: "left", marginRight: "27px", flex: "0" }}>
        <VscTools className={designModeClass} onClick={onDesignModeToggle} />
      </div>

      <div
        style={{
          flex: "1 1 auto",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Workspace
          workspaceBlock={workspaceBlock}
          onCreateSpliter={onCreateSplitter}
          onMergeSplitter={onMergeSplitter}
          onCreateComponent={onCreateComponent}
          onClose={onCloseComponent}
          onUpdateLink={onUpdateink}
          isDesignModeOn={isDesignModeOn}
          metaData={metaData}
          onGridReady={onGridReady}
          onRaiseLinkEvent={onRaiseLinkEvent}
          registerInvalidate={registerInvalidate}
        ></Workspace>
      </div>
    </div>
  );
}
