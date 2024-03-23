import Todo from "./components/Todo";
import { useEffect } from "react";
import { useTodoContext } from "./context/TodoContext";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";

const App = () => {
  const { showToast, setShowToast, toastMessages } = useTodoContext();

  useEffect(() => {
    let timeout;
    if (toastMessages.length > 0) {
      timeout = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [toastMessages, setShowToast]);

  return (
    <div className='flex justify-center flex-1 overflow-x-hidden'>
      <style jsx='true'>{`
        input {
          color: black;
        }
      `}</style>
      <Todo />
      <div className='toast-container'>
        {toastMessages.map((message, index) => (
          <Toast
            key={index}
            className={`absolute left-1/2 -translate-x-1/2 top-${
              4 + index * 12
            } animate__animated ${
              showToast ? "animate__fadeIn" : "animate__fadeOut"
            }`}
          >
            <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200'>
              <HiX className='h-5 w-5' />
            </div>
            <div className='ml-3 text-sm font-normal'>{message}</div>
            <Toast.Toggle />
          </Toast>
        ))}
      </div>
    </div>
  );
};

export default App;
