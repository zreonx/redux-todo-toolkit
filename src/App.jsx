import Todo from "./components/Todo";
import { useState, useEffect } from "react";
const App = () => {
  const [theme, setTheme] = useState(false);

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
      <Todo theme={theme} setTheme={setTheme} />
    </div>
  );
};

export default App;
