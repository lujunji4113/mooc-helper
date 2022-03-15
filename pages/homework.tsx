import type { NextPage } from "next";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import IdGetter from "../components/IdGetter";
import Loading from "../components/Loading";

import axios from "axios";

const regExp = /^\d{1,}$/;

interface JudgeDtosItem {
  id: string;
  msg: string;
}

interface SubjectiveQuestion {
  id: string;
  type: number;
  plainTextTitle: string;
  judgeDtos: JudgeDtosItem[];
}

const getHomeworkDetail = async (tid: string) => {
  const res = await axios({
    method: "GET",
    url: "https://qckftx.api.cloudendpoint.cn/getHomework",
    params: {
      tid,
    },
  });
  return res.data;
};

const Homework: NextPage = () => {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [objectiveQList, setObjectiveQList] = useState<SubjectiveQuestion[]>(
    []
  );

  const handleComplete = async (id: string) => {
    if (regExp.test(id)) {
      try {
        setLoading(true);
        const res = await getHomeworkDetail(id);
        if (res.status.code === 0) {
          setObjectiveQList(res.results.mocPaperDto.subjectiveQList);
        } else {
          setMsg(res.status.message);
        }
      } catch (error) {
        setMsg(String(error));
      }
      setLoading(false);
    }
  };

  const handleClose = () => setMsg("");

  const renderHomework = () => {
    if (loading) return <Loading />;
    return (
      <Box>
        {objectiveQList.map((subjectiveQuestion, index) => {
          return (
            <Box
              key={subjectiveQuestion.id}
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
                      ? "primaryDark.800"
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
                  {subjectiveQuestion.plainTextTitle}
                </Typography>
                <Typography>
                  {subjectiveQuestion.judgeDtos.map((judgeDtosItem) => (
                    <span
                      key={judgeDtosItem.id}
                      dangerouslySetInnerHTML={{ __html: judgeDtosItem.msg }}
                    ></span>
                  ))}
                </Typography>
              </span>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Container>
      <IdGetter label="单元作业id" onComplete={handleComplete} />

      {renderHomework()}

      <Snackbar
        open={msg !== ""}
        autoHideDuration={4000}
        onClose={handleClose}
        message={msg}
      />
    </Container>
  );
};

export default Homework;
