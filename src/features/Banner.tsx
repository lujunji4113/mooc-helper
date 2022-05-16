import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@/components/Link";

interface BannerProps {
  message: string;
  link: string | null;
}

const Banner: React.FC<BannerProps> = ({ message, link }) => {
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
          // href={ROUTES.careers} // Fix me!
          href={link}
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
      ) : null}
    </Typography>
  );
};

export default Banner;
