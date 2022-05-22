import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";

interface BannerProps {
  message: string | null;
  link: string | null;
  linkDescription: string | null;
}

const Banner: React.FC<BannerProps> = ({ message, link, linkDescription }) => {
  if (!message) return null;

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
      {message}
      {link ? (
        <Link
          href={link}
          target="_blank"
          sx={{
            fontWeight: "semiBold",
            textDecoration: "underline",
            color: "#fff",
            "&:hover": { color: "grey.200" },
          }}
        >
          {linkDescription ?? "查看详情"} →
        </Link>
      ) : null}
    </Typography>
  );
};

export default Banner;
