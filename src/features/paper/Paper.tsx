import * as React from "react";
import Box from "@mui/material/Box";
import SingleChoice from "./questions/SingleChoice";
import MultipleChoice from "./questions/MultipleChoice";
import Completion from "./questions/Completion";

export default function Paper({ mocPaperDto }: { mocPaperDto: MocPaperDto }) {
  return (
    <Box>
      {mocPaperDto.objectiveQList.map((objectiveQ) => {
        switch (objectiveQ.type) {
          case 1:
          case 4:
            return <SingleChoice key={objectiveQ.id} question={objectiveQ} />;
          case 2:
            return <MultipleChoice key={objectiveQ.id} question={objectiveQ} />;
          case 3:
            return <Completion key={objectiveQ.id} question={objectiveQ} />;
          default:
            return null;
        }
      })}
    </Box>
  );
}
