import type { NextPage } from "next";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Banner from "@/features/Banner";
import { AppHeader } from "@/features/header";
import { CourseDrawer, useSelectedCourse } from "@/features/course-drawer";
import { CourseTreeView } from "@/features/chapter-tree-view";
import { Paper } from "@/features/paper";
import { Homework } from "@/features/homework";
import { Message } from "@/features/message";
import { styled } from "@mui/material/styles";
// import { SideBar } from "@/features/layout";
import { useQuestionList } from "@/features/paper/recoil";
import { useHomeworkList } from "@/features/homework/recoil";
const GradientText = styled("span")<{
  color?: "primary" | "error" | "success" | "warning";
}>(({ theme, color = "primary" }) => ({
  background:
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : `linear-gradient(to right, ${theme.palette[color].main}, ${theme.palette[color][700]})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const Home: NextPage<{
  banner: string | null;
  bannerLink: string | null;
  bannerLinkDescription: string | null;
}> = (props) => {
  const { banner, bannerLink, bannerLinkDescription } = props;
  const selectedCourse = useSelectedCourse();
  const scrollView = React.useRef<HTMLDivElement>(null);
  const questionList = useQuestionList();
  const homeworkList = useHomeworkList();

  React.useEffect(() => {
    if (scrollView.current) {
      scrollView.current.scrollTop = 0;
    }
  }, [questionList, homeworkList]);

  const renderContent = () => {
    if (!selectedCourse) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
              The Mooc <GradientText>&nbsp;helper</GradientText> you always
              wanted
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
              查询中国大学MOOC(慕课)单元作业、单元测验答案
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
          maxHeight: "calc(100vh - 99.5px)",
        }}
      >
        <Box
          sx={{
            position: {
              xs: "fixed",
              sm: "fixed",
              md: "relative",
              lg: "relative",
            },
            width: { xs: "100%", sm: "100%", md: 300, lg: 300 },
            backdropFilter: "blur(20px)",
            zIndex: 1,
            overflow: "auto",
          }}
        >
          <CourseTreeView />
        </Box>
        <Box
          ref={scrollView}
          sx={{
            flex: 1,
            height: "calc(100vh - 99.5px)",
            overflow: "auto",
            marginTop: { xs: 5.4, sm: 5.4, md: 0, lg: 0 },
          }}
        >
          <Paper />
          <Homework />
        </Box>
      </Box>
    );
  };

  return (
    <Box
    // sx={{
    //   display: "flex",
    // }}
    >
      {/* <SideBar /> */}
      {banner ? (
        <Banner
          message={banner}
          link={bannerLink}
          linkDescription={bannerLinkDescription}
        />
      ) : null}
      <AppHeader />
      <CourseDrawer />
      {renderContent()}
      <Message />
    </Box>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      banner: process.env.BANNER ?? null,
      bannerLink: process.env.BANNER_LINK ?? null,
      bannerLinkDescription: process.env.BANNER_LINK_DESCRIPTION ?? null,
    }, // will be passed to the page component as props
  };
};

export default Home;
