import {
  updateBlock,
  getBlockIndex,
  getBlockById,
  removeBlockById
} from "./stateHelper";

import { uuid } from "uuidv4";

import {
  updateParentDownlinks,
  unlinkMeFromParents,
  unlinkMyChildrenFromMe
} from "./linkUtils";

export const mergeSplitter = (workspaceBlock, content, setter) => {
  const newWorkspaceBlock = [...workspaceBlock];
  const child1Block = getBlockById(newWorkspaceBlock, content.children[0]);
  const child2Block = getBlockById(newWorkspaceBlock, content.children[1]);

  const primaryBlock =
    child1Block.type !== "launcher" ? child1Block : child2Block;

  //Update exitisting splitter to launcher
  const indexToUpdate = getBlockIndex(newWorkspaceBlock, content);
  let newLaunchCopy = {
    ...content,
    type: primaryBlock.type,
    children: primaryBlock.children,
    properties: primaryBlock.properties,
    isLinkable: primaryBlock.isLinkable,
    title: primaryBlock.title,
    upLinks: primaryBlock.upLinks,
    downLinks: primaryBlock.downLinks
  };
  newWorkspaceBlock[indexToUpdate] = newLaunchCopy;

  //remove old children of splitter
  removeBlockById(newWorkspaceBlock, child1Block.id);
  removeBlockById(newWorkspaceBlock, child2Block.id);

  updateParentDownlinks(newWorkspaceBlock, primaryBlock, newLaunchCopy);

  //update state
  setter(newWorkspaceBlock);

  console.log(newWorkspaceBlock);
};

export const createComponent = (workspaceBlock, content, type, set) => {
  //Update launcher component block with new component type
  const newWorkspaceBlock = [...workspaceBlock];
  updateBlock(newWorkspaceBlock, content, type, set);

  console.log(newWorkspaceBlock);
};

export const closeComponent = (workspaceBlock, content, setter) => {
  //Update component block with new launcher type

  const newWorkspaceBlock = [...workspaceBlock];
  updateBlock(newWorkspaceBlock, content, "launcher", setter);
  unlinkMeFromParents(newWorkspaceBlock, content, setter);
  unlinkMyChildrenFromMe(newWorkspaceBlock, content, setter);

  console.log(newWorkspaceBlock);
};

export const createSplitter = (workspaceBlock, action, content, setter) => {
  const newWorkspaceBlock = [...workspaceBlock];

  //Copy the content and make it a child giving it a new id - the splitter will assume it's old id
  const newLauncherChild1Block = { ...content, id: uuid() };
  const newLauncherChild2Block = getBlankLauncherBlock();

  //Create new splitter - assume the id of content
  const newSplitterBlock = getBlankSplitterBlock(
    content.id,
    newLauncherChild1Block.id,
    newLauncherChild2Block.id,
    action
  );

  const indexToUpdate = getBlockIndex(newWorkspaceBlock, content);
  newWorkspaceBlock[indexToUpdate] = newSplitterBlock;
  newWorkspaceBlock.push(newLauncherChild1Block, newLauncherChild2Block);

  //Update Parent Links to this new component
  updateParentDownlinks(newWorkspaceBlock, content, newLauncherChild1Block);

  setter(newWorkspaceBlock);

  console.log(newWorkspaceBlock);
};

const getBlankSplitterBlock = (id, child1Id, child2Id, orientation) => {
  return {
    id: id,
    isLinkable: false,
    type: "splitterPanel",
    upLinks: [],
    downLinks: [],
    properties: {
      orientation: orientation,
      percentage: false,
      primaryIndex: 1,
      secondaryInitialSize: 150
    },
    children: [child1Id, child2Id]
  };
};

const getBlankLauncherBlock = () => {
  return {
    id: uuid(),
    isLinkable: false,
    type: "launcher",
    properties: { title: "Launcher" },
    upLinks: [],
    downLinks: []
  };
};
