import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useHomeworkList } from "./recoil";
import { strToElement } from "@/utils";

const Homework: React.FC = () => {
  const homeworkList = useHomeworkList();
  return (
    <Box>
      {homeworkList.map((homework) => {
        return (
          <Box
            key={homework.id}
            component="span"
            sx={{
              display: "flex",
              p: 2,
              my: 1,
              flexDirection: { xs: "column", md: "row" },
              alignItems: { md: "center" },
              transitionProperty: "all",
              transitionDuration: "150ms",
              "&:hover, &:focus": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "primaryDark.700"
                    : "grey.100",
                "@media (hover: none)": {
                  bgcolor: "transparent",
                },
              },
            }}
          >
            <span>
              <Typography
                color="text.primary"
                variant="h6"
                fontWeight="bold"
                display="block"
              >
                {strToElement(homework.title)}
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {homework.judgeDtos.map((judgeDto) => (
                  <span
                    style={{ display: "flex", flexDirection: "column" }}
                    key={judgeDto.id}
                  >
                    {strToElement(judgeDto.msg)}
                  </span>
                ))}
              </Typography>
            </span>
          </Box>
        );
      })}
    </Box>
  );
};

export default Homework;
