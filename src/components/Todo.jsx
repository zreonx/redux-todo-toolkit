import TodoFilter from "./TodoFilter";
import TodoTasks from "./TodoTasks";
import { ToggleSwitch } from "flowbite-react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/features/todos/todoSlice";
import { useState } from "react";
const Todo = ({ theme, setTheme }) => {
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");

  const handleAddTask = () => {
    if (todo) {
      dispatch(addTask({ task: todo }));
      setTodo("");
    }
  };

  return (
    <div className='w-[55rem] max-lg:w-full py-4 px-5 max-sm:p-5 transition-colors'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-4xl font-semibold'>Todo'nt</h1>
          <p className='px-1'>don't do what you want to do</p>
        </div>

        <ToggleSwitch
          checked={theme}
          label=''
          onChange={() => setTheme(!theme)}
        />
      </div>

      <div className='py-3 flex gap-2 flex-col sm:flex-row'>
        <input
          className='flex-1 shadow-sm rounded-md x-f-default px-4 py-4'
          type='text'
          placeholder='Add Todo'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button
          onClick={handleAddTask}
          className='px-5 py-4 border rounded-md hover:bg-lightcl dark:hover:text-gray-700'
        >
          Add
        </button>
      </div>
      <TodoFilter />
      <TodoTasks />
    </div>
  );
};

export default Todo;
