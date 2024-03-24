import { createContext, useContext, useState } from "react";

export const TodoContext = createContext(null);

export const TodoContextProvider = ({ children }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const [completeTasks, setCompleteTasks] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState(false);
  const [statusLabel, setStatusLabel] = useState("All");
  const [editTodo, setEditTodo] = useState({
    id: "",
    task: "",
    dateCreated: "",
    isEdited: "",
  });

  const [showToast, setShowToast] = useState(false);

  const [removeTodoId, setRemoveTodoId] = useState("");

  const [oldTasks, setOldTasks] = useState(
    JSON.parse(localStorage.getItem("theme")) || null
  );

  const data = {
    completeTasks,
    setCompleteTasks,
    deleteAllModal,
    setDeleteAllModal,
    showToast,
    setShowToast,
    removeTodoId,
    setRemoveTodoId,
    openModal,
    setOpenModal,
    deleteModal,
    setDeleteModal,
    theme,
    setTheme,
    oldTasks,
    setOldTasks,
    statusLabel,
    setStatusLabel,
    editTodo,
    setEditTodo,
  };
  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
