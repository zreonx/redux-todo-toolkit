import { createContext, useContext, useState } from "react";

export const TodoContext = createContext(null);

export const TodoContextProvider = ({ children }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [theme, setTheme] = useState(false);

  const data = {
    openModal,
    setOpenModal,
    deleteModal,
    setDeleteModal,
    theme,
    setTheme,
  };
  return <TodoContext.Provider value={data}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
