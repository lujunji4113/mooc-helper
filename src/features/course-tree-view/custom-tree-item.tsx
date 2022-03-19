import type { TreeItemProps } from "@mui/lab/TreeItem";

import TreeItem from "@mui/lab/TreeItem";
import CustomContent from "./custom-content";

import { styled } from "@mui/material/styles";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  "& .MuiTreeItem-content": {
    border: "none",
    backgroundColor: "transparent",
    borderRadius: 5,
    padding: theme.spacing(0.5),
    textAlign: "left",
    position: "relative",
    zIndex: 1,
  },
  "& .MuiTreeItem-content .MuiTreeItem-label": {
    paddingLeft: theme.spacing(1),
  },
  "& .MuiTreeItem-root": {
    position: "relative",
    "&:last-of-type": {
      "&:before": {
        height: 34 / 2,
      },
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: -18,
      height: "100%",
      width: 2,
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.primaryDark[600]
          : theme.palette.grey[200],
    },
  },
  "& .MuiTreeItem-group": {
    marginLeft: 0,
    paddingLeft: theme.spacing(3),
    "& .MuiTreeItem-content": {
      "&:before": {
        content: '""',
        position: "absolute",
        display: "block",
        width: 24,
        height: 2,
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primaryDark[600]
            : theme.palette.grey[200],
        top: "50%",
        left: 6,
        transform: "translate(-100%, -50%)",
      },
    },
  },
}));

const CustomTreeItem = (
  props: TreeItemProps & {
    ContentProps?: { lastNestedChild?: boolean };
  }
) => <StyledTreeItem ContentComponent={CustomContent} {...props} />;

export default CustomTreeItem;
