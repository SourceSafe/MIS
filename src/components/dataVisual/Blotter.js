import React, { useState, useEffect } from "react";
import Chrome from "./Chrome";
import "../../styles.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export default function Blotter(props) {
  const {
    isDesignModeOn,
    metaData,
    onRaiseLinkEvent,
    componentBlock,
    registerInvalidate
  } = props;

  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const [downLinks, setDownLinks] = useState([]);
  const [selectedLayoutId, setSelectedLayoutId] = useState({});

  const [api, setApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);

  function onGridReady(params) {
    console.log("onGridReady");
    console.log(params);
    console.log(params.api);
    setApi(params.api);
    setColumnApi(params.columnApi);
  }
  useEffect(() => {
    getQueryResults(selectedLayoutId);
  }, [selectedLayoutId]);

  useEffect(() => {
    console.log("Calling reg");
    registerInvalidate(componentBlock.id, onFilterInvalidated);
  }, []);

  useEffect(() => {
    console.log("API SET!!");
    console.log(api);
  }, [api]);

  const getQueryResults = (layoutId) => {
    console.log("get " + layoutId);

    fetch(
      "https://u0i4ez1dk4.execute-api.eu-west-2.amazonaws.com/Production/queryresults?LayoutId=" +
        selectedLayoutId
    )
      .then((response) => response.json())
      .then((data) => {
        setColumnDefs(JSON.parse(data.ColumnDefs));
        setRowData(JSON.parse(data.RowData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLayoutClick = (e) => {
    setSelectedLayoutId(e.target.id);
  };

  const onFilterInvalidated = (e) => {
    console.log("Recieved Invalidate from from Parent " + e);

    setFilter();
  };

  const setFilter = (keyValue) => {
    console.log(api);
    //const instance = api.getFilterInstance("TradeId");

    //console.log(instance);
    //instance.setModel({ values: ["1"] });
    //api.onFilterChanged();

    // get filter instance
    //const countryFilterComponent = api.getFilterInstance("RfqId");

    // get filter model
    //const model = countryFilterComponent.getModel();

    // set filter model and update
    //countryFilterComponent.setModel({ values: ["3"] });

    // refresh rows based on the filter (not automatic to allow for batching multiple filters)
    ///api.onFilterChanged();
  };

  const layoutButtons = metaData
    .filter((item) => item.ComponentId === 1)
    .map((layout) => (
      <button
        className="ag-theme-balham"
        id={layout.LayoutId}
        key={layout.LayoutId}
        onClick={onLayoutClick}
      >
        {layout.LayoutName}
      </button>
    ));

  const defaultColDef = {
    resizable: true,
    width: 75,
    skipHeaderOnAutoSize: true,
    filter: "agTextColumnFilter"
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column"
      }}
    >
      <div>{isDesignModeOn && <Chrome {...props} />}</div>
      <div style={{ margin: "5px", display: "flex", flexDirection: "row" }}>
        {layoutButtons}
      </div>

      <div
        className="ag-theme-balham"
        style={{
          flex: 1
        }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onRowSelected={(event) => {
            onRaiseLinkEvent(componentBlock, event);
          }}
          columnDefs={columnDefs}
          rowData={rowData}
          rowSelection={"single"}
        />
      </div>
    </div>
  );
}
