import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";

export default function AppHeaderBanner() {
  return (
    <Typography
      fontWeight="medium"
      sx={{
        color: "#fff",
        p: "12px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "start", sm: "center" },
        justifyContent: "center",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? `linear-gradient(90deg, ${theme.palette.primary[900]}, ${theme.palette.primary[600]} 120%)`
            : `linear-gradient(-90deg, ${theme.palette.primary[700]}, ${theme.palette.primary[500]} 120%)`,
        fontSize: (theme) => theme.typography.pxToRem(13),
      }}
    >
      该网站将于2022 年 6 月 14 日 23 点 59 分（北京时间，GMT+8） 停止服务。
      <Link
        // href={ROUTES.careers} // Fix me!
        href="https://bytedance.feishu.cn/docs/doccnLxBa0F4OJcitpYByeK69hh"
        target="_blank"
        sx={{
          fontWeight: "semiBold",
          textDecoration: "underline",
          color: "#fff",
          "&:hover": { color: "grey.200" },
        }}
      >
        查看详情 →
      </Link>
    </Typography>
  );
}
