import { createContext, useContext, useTransition } from "react";

export const TodoContext = createContext(null);

export const TodoContextProvider = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <TodoContext.Provider value={{ isPending, startTransition }}>
      {children}
    </TodoContext.Provider>
  );
};
