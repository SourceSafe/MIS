export const canLink = (props) => ({
  link: () => {
    console.log("link");
  },
  unLink: () => {
    console.log("unLink");
  },
  invalidate: () => {
    console.log("invalidate");
  },
  invalidateDependants: () => {
    console.log("invalidateDependants");
  }
});

export const canConfigure = (props) => ({
  edit: () => {
    console.log("edit");
  },
  new: () => {
    console.log("new");
  },
  save: () => {
    console.log("save");
  }
});

export const dvcFactory = (props) => {
  let state = {
    ...props
  };

  return Object.assign(state, canLink(state), canLink(state));
};
