import type { Chapter } from "./interface";
import type { Theme } from "@mui/material";
import * as React from "react";

import TreeView from "@mui/lab/TreeView";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import CustomTreeItem from "./CustomTreeItem";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useSelectedCourse } from "@/features/course-drawer";
import { useSetQuestionList } from "@/features/paper";
import { useSetHomeworkList } from "@/features/homework";

import axios from "axios";

export default function CourseTreeView() {
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [chapters, setChapters] = React.useState<Chapter[]>([]);

  const selectedCourse = useSelectedCourse();
  const setQuestionList = useSetQuestionList();
  const setHomeworkList = useSetHomeworkList();

  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  React.useEffect(() => {
    if (!matches) {
      setExpanded([]);
    } else {
      if (selectedCourse) {
        setExpanded([
          String(selectedCourse?.id),
          ...chapters.map((chapter) => String(chapter.id)),
        ]);
      }
    }
  }, [matches]);

  const handleQuizClick = async (contentId: number) => {
    if (!matches) {
      setExpanded([]);
    }
    const res = await axios({
      method: "GET",
      url: "https://qckftx.api.cloudendpoint.cn/getPaper",
      params: {
        testId: contentId,
        "mob-token": localStorage.getItem("mob-token") ?? "",
      },
    });
    if (res.data.status.code === 0) {
      setQuestionList(res.data.results.mocPaperDto.objectiveQList);
      setHomeworkList([]);
    }
  };

  const handleHomeworkClick = async (contentId: number) => {
    if (!matches) {
      setExpanded([]);
    }
    const res = await axios({
      method: "GET",
      url: "https://qckftx.api.cloudendpoint.cn/getHomework",
      params: {
        tid: contentId,
        "mob-token": localStorage.getItem("mob-token") ?? "",
      },
    });
    if (res.data.status.code === 0) {
      setHomeworkList(res.data.results.mocPaperDto.subjectiveQList);
      setQuestionList([]);
    }
  };

  React.useEffect(() => {
    setHomeworkList([]);
    setQuestionList([]);
  }, [selectedCourse]);

  React.useEffect(() => {
    if (selectedCourse) {
      axios({
        method: "GET",
        url: "https://qckftx.api.cloudendpoint.cn/getCourseChapters",
        params: {
          courseId: selectedCourse.id,
          termId: selectedCourse.currentTermId,
          "mob-token": localStorage.getItem("mob-token") ?? "",
        },
      }).then(({ data }) => {
        setChapters(data);
        setExpanded([
          String(selectedCourse.id),
          ...data.map((chapter: Chapter) => String(chapter.id)),
        ]);
      });
    }
  }, [selectedCourse]);

  return (
    <TreeView
      aria-label="folder"
      defaultCollapseIcon={
        <KeyboardArrowUpRounded sx={{ fontSize: 16, color: "primary.main" }} />
      }
      defaultExpandIcon={
        <KeyboardArrowDownRounded sx={{ fontSize: 16, color: "grey.600" }} />
      }
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ p: 1, overflowY: "auto" }}
      expanded={expanded}
      selected={selected}
      onNodeToggle={(_: React.SyntheticEvent<Element, Event>, nodeIds) =>
        setExpanded(nodeIds)
      }
      onNodeSelect={(
        _: React.SyntheticEvent<Element, Event>,
        nodeIds: string[]
      ) => setSelected(nodeIds)}
    >
      {selectedCourse && (
        <CustomTreeItem
          key={selectedCourse.id}
          nodeId={selectedCourse.id + ""}
          label={selectedCourse.name}
        >
          {chapters.map((chapter) => (
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
      )}
    </TreeView>
  );
}
