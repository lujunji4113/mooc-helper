import type { NextPage } from "next";
import type { OptionDtosItem } from "../components/paper/OptionDtos";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IdGetter from "../components/IdGetter";
import { MultipleChoice, SingleChoice } from "../components/paper/OptionDtos";
import Snackbar from "@mui/material/Snackbar";
import Loading from "../components/Loading";

import axios from "axios";

const regExp = /^\d{1,}$/;

interface ObjectiveQuestion {
  id: string;
  type: number;
  plainTextTitle: string;
  optionDtos: OptionDtosItem[];
}

const getPaperDetail = async (testId: string) => {
  const res = await axios({
    method: "GET",
    url: "https://qckftx.api.cloudendpoint.cn/getPaper",
    params: {
      testId,
    },
  });
  return res.data;
};

const Paper: NextPage = () => {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [objectiveQList, setObjectiveQList] = useState<ObjectiveQuestion[]>([]);

  const handleComplete = async (id: string) => {
    if (regExp.test(id)) {
      try {
        setLoading(true);
        const res = await getPaperDetail(id);
        if (res.status.code === 0) {
          setObjectiveQList(res.results.mocPaperDto.objectiveQList);
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

  const renderOptionDtos = (objectiveQuestion: ObjectiveQuestion) => {
    switch (objectiveQuestion.type) {
      case 1:
      case 4:
        return <SingleChoice optionDtos={objectiveQuestion.optionDtos} />;
      case 2:
        return <MultipleChoice optionDtos={objectiveQuestion.optionDtos} />;
      default:
        return null;
    }
  };

  const renderPaper = () => {
    if (loading) return <Loading />;
    return (
      <Box>
        {objectiveQList.map((objectiveQuestion, index) => {
          return (
            <Box
              key={objectiveQuestion.id}
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
                  {`${index + 1}、${objectiveQuestion.plainTextTitle}`}
                </Typography>
                {renderOptionDtos(objectiveQuestion)}
              </span>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Container>
      <IdGetter label="单元测验id" onComplete={handleComplete} />

      {renderPaper()}

      <Snackbar
        open={msg !== ""}
        autoHideDuration={4000}
        onClose={handleClose}
        message={msg}
      />
    </Container>
  );
};

export default Paper;
