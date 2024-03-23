import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { useTodoContext } from "./context/TodoContext";
import { useSelector } from "react-redux";
const App = () => {
  const { theme, setTheme } = useTodoContext();

  useEffect(() => {
    const { themeStatus } = JSON.parse(localStorage.getItem("theme")) || false;
    setTheme(themeStatus);
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
