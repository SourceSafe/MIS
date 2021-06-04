export const getBlockIndex = (newWorkspaceBlock, content) => {
  return newWorkspaceBlock.findIndex((item) => item.id === content.id);
};

export const getBlockIndexById = (newWorkspaceBlock, id) => {
  return newWorkspaceBlock.findIndex((item) => item.id === id);
};

export const getBlockById = (newWorkspaceBlock, id) => {
  return newWorkspaceBlock.find((item) => item.id === id);
};

export const removeBlockById = (workspace, id) => {
  const index = workspace.findIndex((item) => item.id === id);
  workspace.splice(index, 1);
};

export const removeBlock = (workspace, blockToRemove) => {
  console.log("Remove");
  console.log(workspace);

  const index = workspace.findIndex((item) => item.id === blockToRemove.id);

  workspace.splice(index, 1);
};

//Preserve id
export const updateBlock = (workspace, block, type, set) => {
  const indexToUpdate = getBlockIndex(workspace, block);

  const isLinkable = type !== "launcher" && type !== "splitterPanel";

  let newBlock = {
    ...block,
    title: type,
    isLinkable: isLinkable,
    type: type,
    properties: {},
    children: [],
    upLinks: [],
    downLinks: []
  };

  workspace[indexToUpdate] = newBlock;
  set(workspace);
};

export const link = () => {};

export const unLink = () => {};
export const removeLinks = (component) => {};
