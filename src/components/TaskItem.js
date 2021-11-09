import { useState, memo } from "react";
import TaskList from "./TaskList";
import { styled } from "@mui/system";

const StyledDiv = styled("div")({
  cursor: "pointer",
});

function TaskItem({ data }) {
  const [list, setList] = useState(null);
  data = Object.entries(data);
  const openList = (currDate) => {
    setList(currDate);
  };
  return data.map((currDate) => (
    <StyledDiv onClick={() => openList(currDate)} key={currDate[0]}>
      {currDate[0]} ({currDate[1].length})
      {!!list && <TaskList eachData={currDate} data={list} setList={setList} />}
    </StyledDiv>
  ));
}

export default memo(TaskItem);
