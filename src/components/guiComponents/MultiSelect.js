import React, { useRef } from "react";
import "./multiSelect.css";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import { VscLink } from "react-icons/vsc";

const MultiSelect = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClick = () => setIsActive(!isActive);

  const {
    workspaceBlock,
    buttonComponent,
    componentBlock,
    onUpdateLink,
    onFilterInvalidated
  } = props;

  const onToggleSelection = (e) => {
    onUpdateLink(componentBlock.id, e.target.id, onFilterInvalidated);

    /*
      receiveLinkId: componentBlock.id,
      sendLinkId: 
      
    });*/
  };

  const listItems = asMutlipleSelectList(workspaceBlock, componentBlock);

  return (
    <span>
      <span onClick={onClick}>{buttonComponent} </span>
      <span ref={dropdownRef}>
        <span className={`menu ${isActive ? "active" : "menu"}`}>
          <ul
            style={{
              padding: "0px",
              margin: "5px",
              textAlign: "left"
            }}
          >
            {listItems.map((item) => (
              <tag>
                <li
                  style={{
                    listStyleType: "none",
                    width: "100%"
                  }}
                >
                  <button
                    id={item.id}
                    className="multiSelectItem"
                    onClick={onToggleSelection}
                    style={{
                      outline: "none",
                      textAlign: "left",
                      minWidth: "200px",
                      width: "100%"
                    }}
                  >
                    {item.value === true ? (
                      <VscLink
                        style={{ marginRight: "20px" }}
                        className="linkItemButton"
                        id={item.id}
                      />
                    ) : (
                      <VscLink
                        style={{ color: "lightgray", marginRight: "20px" }}
                        className="linkItemButton"
                        id={item.id}
                      />
                    )}
                    <label
                      id={item.id}
                      style={{
                        listStyleType: "none",
                        paddingBottom: "100px"
                      }}
                    >
                      {item.title}
                    </label>
                  </button>
                </li>
              </tag>
            ))}
          </ul>
        </span>
      </span>
    </span>
  );
};

//takes the worspace and reuturns [{id, title}...]
const asMutlipleSelectList = (workspaceBlock, excludeMe) => {
  const linkableItems = workspaceBlock.filter(function (block) {
    return block.isLinkable && block.id !== excludeMe.id;
  });

  const multipleSelectList = linkableItems.map((block) => {
    const container = {};
    container.id = block.id;
    container.title = block.title;

    container.value =
      excludeMe.upLinks.findIndex((item) => item === block.id) === -1
        ? false
        : true;

    return container;
  });

  return multipleSelectList;
};

export default MultiSelect;
