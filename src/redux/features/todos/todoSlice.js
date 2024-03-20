import { createSlice } from "@reduxjs/toolkit";
import { generateId, generateDate } from "../../../helper/todoUtils";

const initialState = {
  tasks: [
    {
      id: generateId(),
      task: "Some task",
      dateCreated: generateDate(),
      completed: false,
      inProgress: false,
    },
    {
      id: generateId(),
      task: "Another task",
      dateCreated: generateDate(),
      completed: true,
      inProgress: false,
    },
  ],

  filter: "ALL",
  search: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: generateId(),
            task: action.payload.task,
            dateCreated: generateDate(),
            completed: false,
            inProgress: false,
          },
        ],
      };
    },
    markAsCompleteToggle: (state, action) => {
      const id = action.payload.id;
      return {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, completed: !todo.completed, inProgress: false }
            : todo;
        }),
      };
    },
    markPendingToggle: (state, action) => {
      const id = action.payload.id;
      return {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, inProgress: !todo.inProgress }
            : todo;
        }),
      };
    },
    editSaveTask: (state, action) => {
      const { id, task } = action.payload;

      return {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, task, dateCreated: generateDate() }
            : todo;
        }),
      };
    },
  },
});

export const {
  addTask,
  markAsCompleteToggle,
  markPendingToggle,
  editSaveTask,
} = todoSlice.actions;

export default todoSlice.reducer;
