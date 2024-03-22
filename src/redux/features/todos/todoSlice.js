import { createSlice } from "@reduxjs/toolkit";
import { generateId, generateDate } from "../../../helper/todoUtils";

const initialState = {
  tasks: [
    // {
    //   id: generateId(),
    //   task: "Some task",
    //   dateCreated: generateDate(),
    //   completed: false,
    //   inProgress: false,
    //   isEdited: false,
    // },
    // {
    //   id: generateId(),
    //   task: "Another task",
    //   dateCreated: generateDate(),
    //   completed: true,
    //   inProgress: false,
    //   isEdited: false,
    // },
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
            isEdited: false,
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
            ? { ...todo, task, dateCreated: generateDate(), isEdited: true }
            : todo;
        }),
      };
    },
    removeTask: (state, { payload }) => {
      const { id } = payload;
      return {
        ...state,
        tasks: state.tasks.filter((todo) => todo.id !== id),
      };
    },
    filterTasks: (state, { payload }) => {
      return {
        ...state,
        filter: payload.filter,
      };
    },

    updateSearch: (state, { payload: { search } }) => {
      return {
        ...state,
        search,
      };
    },
  },
});

export const {
  addTask,
  markAsCompleteToggle,
  markPendingToggle,
  editSaveTask,
  removeTask,
  filterTasks,
  updateSearch,
} = todoSlice.actions;

export default todoSlice.reducer;
