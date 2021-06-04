import Timebar from "./Timebar";
import Blotter from "./Blotter";
import FilterStrip from "./FilterStrip";
import PivotTable from "./PivotTable";
import SplitterPanel from "./SplitterPanel";
import Launcher from "./Launcher";

const dashboardComponents = {
  launcher: Launcher,
  splitterPanel: SplitterPanel,
  blotter: Blotter,
  timeBar: Timebar,
  filterStrip: FilterStrip,
  pivotTable: PivotTable
};

export const getDashBoardComponent = (componentType) => {
  let MyComponent = dashboardComponents[componentType];

  return MyComponent;
};
