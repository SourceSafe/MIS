import { getBlockIndex, getBlockIndexById } from "./stateHelper";

export const toggleLink = (workspace, receiveLinkId, sendLinkId, setter) => {
  let newWorkspace = [...workspace];

  //Update UpLinks
  let index = getBlockIndexById(newWorkspace, receiveLinkId);
  let itemToMutate = { ...newWorkspace[index] };

  let newUplinks =
    itemToMutate.upLinks === undefined ? [] : itemToMutate.upLinks;

  const uplinkIndex = newUplinks.findIndex((item) => item === sendLinkId);
  if (uplinkIndex === -1) {
    newUplinks.push(sendLinkId);
  } else {
    newUplinks.splice(uplinkIndex, 1);
  }

  itemToMutate.upLinks = newUplinks;
  newWorkspace[index] = itemToMutate;

  //Update DownLinks
  let dlIndex = getBlockIndexById(newWorkspace, sendLinkId);
  let dlItem = { ...newWorkspace[dlIndex] };

  let newDls = dlItem.downLinks === undefined ? [] : dlItem.downLinks;

  const dlEntryIndex = newDls.findIndex((item) => item === receiveLinkId);

  if (dlEntryIndex === -1) {
    newDls.push(receiveLinkId);
  } else {
    newDls.splice(dlEntryIndex, 1);
  }

  setter(newWorkspace);
};

export const updateParentDownlinks = (
  workspace,
  oldComponent,
  newComponent
) => {
  //Set up/down links of new component  taking values from old
  let newWorkspace = [...workspace];

  const upLinks = [...newComponent.upLinks];
  upLinks.forEach((upLinkId) => {
    const index = getBlockIndexById(newWorkspace, upLinkId);
    const downLinks = [...newWorkspace[index].downLinks];

    const i = downLinks.findIndex((item) => item === upLinkId);

    downLinks.splice(i, 1, newComponent.id);

    newWorkspace[index].downLinks = downLinks;
  });

  //loop through each of the newCompoonent. downlinks and and replace the old id with the new

  const oldUpLinks = [...oldComponent.upLinks];
  const oldDownLinks = [...oldComponent.downLinks];

  const newComponentToUpdate = {
    ...newComponent,
    upLinks: oldUpLinks,
    downLinks: oldDownLinks
  };

  const index = getBlockIndex(newWorkspace, newComponent);
  newWorkspace[index] = newComponentToUpdate;
};

export const unlinkMeFromParents = (workspace, component, setter) => {
  let newWorkspace = [...workspace];

  //loop through upLinks
  // then remoove the componentId from their downLinks
  const upLinks = [...component.upLinks];
  upLinks.forEach((parentId) => {
    const parentIndex = getBlockIndexById(newWorkspace, parentId);
    const parentToUpdate = {
      ...newWorkspace[parentIndex],
      downLinks: [...newWorkspace[parentIndex].downLinks]
    };
    const downLinksToUpdate = [...parentToUpdate.downLinks];
    const i = downLinksToUpdate.findIndex((item) => item === component.id);
    parentToUpdate.downLinks.splice(i, 1);
    newWorkspace[parentIndex] = parentToUpdate;
  });

  setter(newWorkspace);
};

export const unlinkMyChildrenFromMe = (workspace, component, setter) => {
  let newWorkspace = [...workspace];

  const downLinks = [...component.downLinks];

  downLinks.forEach((id) => {
    const childIndex = getBlockIndexById(newWorkspace, id);
    const childToUpdate = {
      ...newWorkspace[childIndex],
      upLinks: [...newWorkspace[childIndex].upLinks]
    };

    const upLinksToUpdate = [...childToUpdate.upLinks];
    const i = upLinksToUpdate.findIndex((item) => item === component.id);
    childToUpdate.upLinks.splice(i, 1);
    newWorkspace[childIndex] = childToUpdate;

    setter(newWorkspace);
  });
};
