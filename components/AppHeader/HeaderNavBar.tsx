import { styled } from "@mui/material/styles";

import Link from "../Link";

const Navigation = styled("nav")(({ theme }) => ({
  "& ul": {
    padding: 0,
    margin: 0,
    listStyle: "none",
    display: "flex",
  },
  "& li": {
    color: theme.palette.text.primary,
    ...theme.typography.body2,
    fontWeight: 700,
    "& > a, & > div": {
      display: "inline-block",
      color: "inherit",
      textDecoration: "none",
      padding: theme.spacing(1),
      borderRadius: theme.shape.borderRadius,
      "&:hover, &:focus": {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.primaryDark[700]
            : theme.palette.grey[50],
        color:
          theme.palette.mode === "dark"
            ? theme.palette.primaryDark[200]
            : theme.palette.grey[700],
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: "initial",
        },
      },
    },
    "& > div": {
      cursor: "default",
    },
  },
}));

export default function HeaderNavBar() {
  return (
    <Navigation>
      <ul role="menubar">
        <li role="none">
          <Link role="menuitem" href="/paper">
            单元测验
          </Link>
        </li>
        <li role="none">
          <Link role="menuitem" href="/homework">
            单元作业
          </Link>
        </li>
        <li role="none">
          <Link role="menuitem" href="/courses">
            课程
          </Link>
        </li>
        <li role="none">
          <Link
            role="menuitem"
            href="https://github.com/lujunji-xiaolu/mooc-helper/blob/master/README.md"
          >
            帮助
          </Link>
        </li>
      </ul>
    </Navigation>
  );
}
