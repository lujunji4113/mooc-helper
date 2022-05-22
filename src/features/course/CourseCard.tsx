import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import LaunchRounded from "@mui/icons-material/LaunchRounded";
import Avatar from "@mui/material/Avatar";
import Link from "@/components/Link";
import { styled } from "@mui/material/styles";

const Label = styled("span")(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: "20px",
    border: `1px solid ${
      theme.palette.mode === "dark"
        ? theme.palette.primaryDark[500]
        : theme.palette.grey[200]
    }`,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.primaryDark[800] : "#FFF",
    padding: theme.spacing(0, 0.8),
    borderRadius: 5,
    whiteSpace: "nowrap",
  };
});

interface CourseCardProps {
  width: number;
  course: Course;
  onClick: (course: Course) => void;
}

export default function CourseCard({
  width,
  course,
  onClick,
}: CourseCardProps) {
  const { name, imgUrl, schoolPanel, fromCourseId } = course;

  return (
    <Paper
      component={Button}
      variant="outlined"
      sx={{
        display: "flex",
        width,
        p: 2,
        m: 2,
      }}
      onClick={() => onClick(course)}
    >
      <Avatar
        src={imgUrl}
        alt={name}
        sx={{ borderRadius: "4px", width: 106, height: 60 }}
      />
      <Box sx={{ flex: 1, ml: 2, textAlign: "left" }}>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              maxWidth: 115,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {name}{" "}
          </Typography>
          <Link
            href={`https://www.icourse163.org/spoc/course/SAU-${fromCourseId}?from=searchPage`}
            target="_blank"
          >
            <LaunchRounded
              color="primary"
              sx={{
                fontSize: 14,
                verticalAlign: "middle",
                ml: 0.5,
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            />
          </Link>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            margin: "5px 0",
          }}
        >
          <Label>{schoolPanel.name}</Label>
        </Typography>
      </Box>
    </Paper>
  );
}
