import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HTML from "@/components/HTML";

export default function Homework({
  mocPaperDto,
}: {
  mocPaperDto: MocPaperDto;
}) {
  return (
    <Box>
      {mocPaperDto.subjectiveQList.map((subjectiveQ) => {
        return (
          <Box
            key={subjectiveQ.id}
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
                {/* {htmr(subjectiveQ.title, { transform })} */}
                <HTML html={subjectiveQ.title} />
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {subjectiveQ.judgeDtos.map((judgeDto) => (
                  <span
                    style={{ display: "flex", flexDirection: "column" }}
                    key={judgeDto.id}
                  >
                    <HTML html={judgeDto.msg} />
                  </span>
                ))}
              </Typography>
            </span>
          </Box>
        );
      })}
    </Box>
  );
}
