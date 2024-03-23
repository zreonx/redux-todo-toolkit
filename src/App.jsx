import Todo from "./components/Todo";
import { useState, useEffect, useContext } from "react";
import { TodoContext } from "./context/TodoContext";
const App = () => {
  const { theme, setTheme } = useContext(TodoContext);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("class", "dark");
    } else {
      document.documentElement.setAttribute("class", "light");
    }
  }, [theme]);

  return (
    <div className='flex justify-center flex-1 overflow-x-hidden'>
      <style jsx='true'>{`
        input {
          color: black;
        }
      `}</style>
      <Todo />
    </div>
  );
};

export default App;
