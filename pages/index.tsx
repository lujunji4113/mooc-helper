import type { NextPage } from "next";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import Logo from "@/components/Logo";
import { Banner, AppHeader } from "@/features/layout";
import Settings from "@/features/settings";
import {
  countState,
  courseListState,
  recentCourseListState,
  selectedCourseState,
  CourseCard,
  selectedContentState,
} from "@/features/course";
import { Message, messageState } from "@/features/message";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { CourseDrawer } from "@/features/course";
import { styled } from "@mui/material/styles";
import { ChapterTreeView } from "@/features/chapter-tree-view";
import Homework from "@/features/homework";
import Paper from "@/features/paper";
import { courseList as getCourseList, homework, test } from "@/api";
import { PAGE_SIZE } from "@/constants";
import { openExternal } from "@/utils";
import store from "@/lib/store";

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
  const [courseList, setCourseList] = useRecoilState(courseListState);
  const [recentCourseList, setRecentCourseList] = useRecoilState(
    recentCourseListState
  );
  const [selectedCourse, setSelectedCourse] =
    useRecoilState(selectedCourseState);
  const [mocPaperDto, setMocPaperDto] = React.useState<MocPaperDto>({
    objectiveQList: [],
    subjectiveQList: [],
  });
  const setCount = useSetRecoilState(countState);
  const setMessage = useSetRecoilState(messageState);
  const selectedContent = useRecoilValue(selectedContentState);

  const paperRef = React.useRef<HTMLDivElement>(null);

  const selectCourse = React.useCallback((course: Course) => {
    setSelectedCourse(course);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateMocPaperDto = React.useCallback(
    async (
      fetcher: (
        contentId: number
      ) => Promise<Result<{ mocPaperDto: MocPaperDto }>>,
      contentId: number
    ) => {
      try {
        const { status, results } = await fetcher(contentId);
        if (paperRef.current) {
          paperRef.current.scrollTop = 0;
        }
        if (status.code === 0) {
          setMocPaperDto(results.mocPaperDto);
        } else {
          setMessage({
            show: true,
            msg: status.message,
          });
        }
      } catch (error) {
        setMessage({
          show: true,
          msg: String(error),
        });
      }
    },
    [setMessage]
  );

  React.useEffect(() => {
    if (selectedContent?.type === "homework") {
      updateMocPaperDto(homework, selectedContent.contentId);
    }
    if (selectedContent?.type === "quiz") {
      updateMocPaperDto(test, selectedContent.contentId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedContent]);

  React.useEffect(() => {
    setMocPaperDto({
      subjectiveQList: [],
      objectiveQList: [],
    });
  }, [selectedCourse]);

  const whenReady = React.useCallback(async () => {
    try {
      if (courseList.length !== 0) return;
      const { status, results } = await getCourseList(1, PAGE_SIZE);
      if (status.code === 0) {
        setCount(results.pagination.totlePageCount);
        setCourseList(results.result);
        setRecentCourseList(results.result);
      } else {
        setMessage({
          show: true,
          msg: status.message,
        });
      }
    } catch (error) {
      setMessage({
        show: true,
        msg: String(error),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    store.get("mob-token").then((storedMobToken) => {
      if (storedMobToken !== null) {
        whenReady();
      } else {
        setMessage({
          show: true,
          msg: "MOB-TOKEN未设置!",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Banner
        message={props.banner}
        link={props.bannerLink}
        linkDescription={props.bannerLinkDescription}
      />
      <AppHeader>
        <Logo />
        <Box sx={{ ml: "auto" }} />
        <Stack direction="row" spacing={1}>
          <CourseDrawer />
          <Tooltip title="Github 存储库" enterDelay={300}>
            <IconButton
              component="a"
              color="primary"
              data-ga-event-category="header"
              data-ga-event-action="github"
              onClick={() =>
                openExternal("https://github.com/xiaolu-lujunji/mooc-helper")
              }
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Settings />
        </Stack>
      </AppHeader>
      <Container>
        {recentCourseList.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Box>
              <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
                The MOOC <GradientText>&nbsp;Helper</GradientText> you always
                wanted
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
                查询中国大学MOOC(慕课)单元测验、单元作业、期中/期末测试答案
              </Typography>
            </Box>
          </Box>
        )}
        {recentCourseList.length > 0 && selectedCourse === null && (
          <>
            <Typography sx={{ px: 2.5, pt: 2 }}>最近查看</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {recentCourseList.map((course) => (
                <CourseCard
                  key={course.id}
                  width={300}
                  course={course}
                  onClick={selectCourse}
                />
              ))}
            </Box>
          </>
        )}
        {selectedCourse !== null && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row", xl: "row" },
              height: "calc(100vh - 56px)",
            }}
          >
            <Box
              sx={(theme) => ({
                width: { xs: "100%", lg: 300, xl: 300 },
                overflow: "auto",
                zIndex: 1,
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.primaryDark[900]
                    : "rgba(255,255,255)",
                // backdropFilter: "blur(20px)",
              })}
            >
              <ChapterTreeView />
            </Box>
            <Box
              ref={paperRef}
              sx={{ flex: 1, height: "100%", overflow: "auto" }}
            >
              <Homework mocPaperDto={mocPaperDto} />
              <Paper mocPaperDto={mocPaperDto} />
            </Box>
          </Box>
        )}
      </Container>
      <Message />
    </>
  );
};

export const getStaticProps = () => {
  return {
    props: {
      ...(!process.env.NEXT_PUBLIC_TAURI && {
        banner: process.env.BANNER ?? null,
        bannerLink: process.env.BANNER_LINK ?? null,
        bannerLinkDescription: process.env.BANNER_LINK_DESCRIPTION ?? null,
      }),
    }, // will be passed to the page component as props
  };
};

export default Home;
