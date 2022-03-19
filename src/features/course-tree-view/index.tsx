import { useState, useEffect } from "react";

import { useSetQuizQuestionList, useSetHomeworkQuestionList } from "@/state";

import TreeView from "@mui/lab/TreeView";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import CustomTreeItem from "./custom-tree-item";

import axios from "axios";

interface Course {
  courseId: number;
  name: string;
  termId: number;
  chapters: Chapter[];
}

interface Chapter {
  id: number;
  name: string;
  homeworks: {
    contentId: number;
    name: string;
  }[];
  quizs: {
    contentId: number;
    name: string;
  }[];
}

export default function CourseTreeView() {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const setQuizQuestionList = useSetQuizQuestionList();
  const setHomeworkQuestionList = useSetHomeworkQuestionList();

  const getCourseList = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: "https://qckftx.api.cloudendpoint.cn/getCourseList",
      });
      setCourseList(res.data);
      for (let i = 0; i < res.data.length; ++i) {
        await updateCourse(res.data[i]);
        setCourseList([...res.data]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCourse = async (course: Course) => {
    const res = await axios({
      method: "GET",
      url: "https://qckftx.api.cloudendpoint.cn/getCourseChapters",
      params: {
        courseId: course.courseId,
        termId: course.termId,
      },
    });
    course.chapters = res.data;
  };

  const handleQuizClick = async (contentId: number) => {
    const res = await axios({
      method: "GET",
      url: "https://qckftx.api.cloudendpoint.cn/getPaper",
      params: {
        testId: contentId,
      },
    });
    if (res.data.status.code === 0) {
      setQuizQuestionList(res.data.results.mocPaperDto.objectiveQList);
      setHomeworkQuestionList([]);
    }
  };

  const handleHomeworkClick = async (contentId: number) => {
    const res = await axios({
      method: "GET",
      url: "https://qckftx.api.cloudendpoint.cn/getHomework",
      params: {
        tid: contentId,
      },
    });
    if (res.data.status.code === 0) {
      setHomeworkQuestionList(res.data.results.mocPaperDto.subjectiveQList);
      setQuizQuestionList([]);
    }
  };

  useEffect(() => {
    getCourseList();
  }, []);

  return (
    <TreeView
      aria-label="folder"
      defaultExpanded={["1", "2", "5"]}
      defaultCollapseIcon={
        <KeyboardArrowUpRounded sx={{ fontSize: 16, color: "primary.main" }} />
      }
      defaultExpandIcon={
        <KeyboardArrowDownRounded sx={{ fontSize: 16, color: "grey.600" }} />
      }
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ p: 1, overflowY: "auto" }}
    >
      {courseList.map((course) => (
        <CustomTreeItem
          key={course.termId}
          nodeId={course.termId + ""}
          label={course.name}
        >
          {course.chapters &&
            course.chapters.map((chapter) => (
              <CustomTreeItem
                key={chapter.id}
                nodeId={String(chapter.id)}
                label={chapter.name}
              >
                {chapter.homeworks.map((homework) => (
                  <CustomTreeItem
                    key={homework.contentId}
                    nodeId={String(homework.contentId)}
                    label={homework.name}
                    ContentProps={{
                      lastNestedChild: true,
                      onClick: () => handleHomeworkClick(homework.contentId),
                    }}
                  />
                ))}
                {chapter.quizs.map((quiz) => (
                  <CustomTreeItem
                    key={quiz.contentId}
                    nodeId={String(quiz.contentId)}
                    label={quiz.name}
                    ContentProps={{
                      lastNestedChild: true,
                      onClick: () => handleQuizClick(quiz.contentId),
                    }}
                  />
                ))}
              </CustomTreeItem>
            ))}
        </CustomTreeItem>
      ))}
    </TreeView>
  );
}
