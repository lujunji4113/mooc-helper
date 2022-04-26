import type { TreeItemContentProps } from "@mui/lab/TreeItem";

import * as React from "react";
import { useTreeItem } from "@mui/lab/TreeItem";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import clsx from "clsx";

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps & { lastNestedChild?: boolean },
  ref
) {
  const {
    lastNestedChild,
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
    onClick,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleSelection(event);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    /* @ts-ignore -- Key event is handled by the TreeView */
    <Box
      title={label}
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onClick={handleExpansionClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {lastNestedChild ? (
        <Box
          sx={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            bgcolor: "warning.main",
            display: "inline-block",
            verticalAlign: "middle",
            zIndex: 1,
          }}
        />
      ) : (
        iconProp
      )}
      <Typography
        onClick={handleSelectionClick}
        component="div"
        className={classes.label}
        sx={{
          "&&": {
            color: lastNestedChild ? "text.secondary" : "text.primary",
            fontWeight: lastNestedChild ? 400 : 500,
          },
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "noWrap",
          userSelect: "none",
        }}
      >
        {label}
      </Typography>
      {expansionIcon || displayIcon}
    </Box>
  );
});

export default CustomContent;
