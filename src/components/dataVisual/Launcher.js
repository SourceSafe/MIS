import Chrome from "./Chrome";
export default function Launcher(props) {
  const { componentBlock, onCreateComponent, isDesignModeOn } = props;

  const data = [
    { type: "blotter", title: "Blotter" },
    { type: "timeBar", title: "Time Bar" },
    { type: "filterStrip", title: "Filter Strip" },
    { type: "pivotTable", title: "Pivot Table" }
  ];

  const onLaunch = (e) => {
    onCreateComponent(componentBlock, e.target.id);
  };

  const listItems = data.map((d) => (
    <li id={d.type} key={d.type} onClick={onLaunch}>
      {d.title}
    </li>
  ));

  /*
  <div>
  {isDesignModeOn && <Chrome {...props}></Chrome>}
  <h1>Launcher</h1>
  {componentBlock.id}
  {listItems}
</div>
*/

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <div>{isDesignModeOn && <Chrome {...props} />}</div>
      <div> Launcher</div>
      <div>{JSON.stringify(componentBlock)}</div>

      <div
        style={{
          width: "100%",
          flex: "1 1 auto",
          backgroundColor: "whiteSmoke"
        }}
        className="ag-theme-alpine"
      >
        {listItems}
      </div>
    </div>
  );
}
