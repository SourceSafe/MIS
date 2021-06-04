import Chrome from "./Chrome";
export default function PivotTable(props) {
  const { componentBlock, isDesignModeOn } = props;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <div>{isDesignModeOn && <Chrome {...props} />}</div>

      <div> {componentBlock.title}</div>

      <div>{JSON.stringify(componentBlock)}</div>

      <div
        style={{
          width: "100%",
          flex: "1 1 auto",
          backgroundColor: "whiteSmoke"
        }}
        className="ag-theme-alpine"
      >
        Body
      </div>
    </div>
  );
}
