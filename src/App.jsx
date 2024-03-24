import Todo from "./components/Todo";
import { useState, useEffect } from "react";
import { useTodoContext } from "./context/TodoContext";
import { Tooltip, Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

const App = () => {
  const { theme, setTheme, showToast, setShowToast } = useTodoContext();

  useEffect(() => {
    const { themeStatus } = JSON.parse(localStorage.getItem("theme")) || false;
    setTheme(themeStatus);
    if (theme) {
      document.documentElement.setAttribute("class", "dark");
    } else {
      document.documentElement.setAttribute("class", "light");
    }
  }, [theme]);

  useEffect(() => {
    let timeout;
    if (showToast) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showToast]);

  return (
    <div className='flex justify-center flex-1 overflow-x-hidden'>
      <style jsx='true'>{`
        input {
          color: black;
        }
      `}</style>
      <Todo />
      {showToast && (
        <Toast
          className={`absolute left-1/2 -translate-x-1/2 top-4 animate__animated ${
            showToast ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'>
            <HiX className='h-5 w-5' />
          </div>
          <div className='ml-3 text-sm font-normal'>Item has been deleted.</div>
          <Toast.Toggle />
        </Toast>
      )}
    </div>
  );
};

export default App;
