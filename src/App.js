import "./App.css";
import { useState, useCallback } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import TimeDate from "./components/TimeDate";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./components/TaskItem";

function dateFormat(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [taskList, setTaskList] = useState([]);
  const onAdd = () => {
    const value = inputValue.trim();
    if (value) {
      const newTaskItem = {
        id: uuidv4(),
        taskName: value,
        date: dateFormat(date),
        complited: false,
      };
      setTaskList((prevLs) => [...prevLs, newTaskItem]);
      setInputValue("");
    }
  };
  const renderTaskList = useCallback(
    (task) => {
      const newDate = taskList.reduce((accum, item) => {
        if (item.date in accum) {
          accum[item.date].push(item);
        } else {
          accum[item.date] = [item];
        }
        return accum;
      }, {});
      return <TaskItem data={newDate} task={task} />;
    },
    [taskList]
  );
  return (
    <div className="App">
      <div className="App__addTask">
        <TextField
          id="filled-basic"
          label="Filled"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          variant="filled"
        />
        <TimeDate date={date} setDate={setDate} />
        <Button onClick={onAdd} sx={{ ml: 3 }} variant="contained">
          Add
        </Button>
      </div>
      <div>{renderTaskList()}</div>
    </div>
  );
}

export default App;
