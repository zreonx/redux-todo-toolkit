import { createSlice } from "@reduxjs/toolkit";
import { generateId, generateDate } from "../../../helper/todoUtils";

const todos = JSON.parse(localStorage.getItem("todos")) || {
  tasks: [],
  filter: "All",
  search: "",
};

const initialState = {
  ...todos,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const data = {
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

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },
    markAsCompleteToggle: (state, action) => {
      const id = action.payload.id;
      const data = {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, completed: !todo.completed, inProgress: false }
            : todo;
        }),
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },
    markPendingToggle: (state, action) => {
      const id = action.payload.id;
      const data = {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, inProgress: !todo.inProgress }
            : todo;
        }),
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },
    editSaveTask: (state, action) => {
      const { id, task } = action.payload;

      const data = {
        ...state,
        tasks: state.tasks.map((todo) => {
          return todo.id === id
            ? { ...todo, task, dateCreated: generateDate(), isEdited: true }
            : todo;
        }),
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },
    removeTask: (state, { payload }) => {
      const { id } = payload;
      const data = {
        ...state,
        tasks: state.tasks.filter((todo) => todo.id !== id),
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },
    filterTasks: (state, { payload }) => {
      const data = {
        ...state,
        filter: payload.filter,
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },

    updateSearch: (state, { payload: { search } }) => {
      const data = {
        ...state,
        search,
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },

    removeAllTask: (state) => {
      const data = {
        ...state,
        tasks: [],
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
    },

    completeAllTask: (state) => {
      const data = {
        ...state,
        tasks: state.tasks.map((todo) => {
          return { ...todo, completed: true };
        }),
      };

      localStorage.setItem("todos", JSON.stringify({ ...data }));

      return data;
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
  completeAllTask,
  removeAllTask,
} = todoSlice.actions;

export default todoSlice.reducer;
