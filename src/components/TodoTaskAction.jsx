import { PiCheckBold } from "react-icons/pi";
import { BsTrashFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { BsFillStopCircleFill } from "react-icons/bs";
import { HiMiniFlag } from "react-icons/hi2";
import { convertToDate } from "../helper/todoUtils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "flowbite-react";
import {
  markAsCompleteToggle,
  markPendingToggle,
  editSaveTask,
} from "../redux/features/todos/todoSlice";
import EditModal from "./EditModal";

const TodoTaskAction = ({ tasks }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [editTodo, setEditTodo] = useState({
    id: "",
    task: "",
    dateCreated: "",
  });

  const handleEditTodo = (id, task, date) => {
    const dateCreated = convertToDate(date);
    setOpenModal(true);
    setEditTodo({ id, task, dateCreated });
  };

  const handleSaveTodo = () => {
    dispatch(editSaveTask({ ...editTodo }));
    setOpenModal(false);
  };

  return (
    <>
      <div className="mt-5 flex gap-3 flex-col">
        {tasks
          .map((todo) => {
            return (
              <div
                key={todo.id}
                className={`p-4 rounded-md shadow-sm flex gap-5 items-center border justify-between ${
                  todo.completed && "opacity-50 bg-slate-100 dark:bg-slate-700"
                }`}
              >
                <div className="flex-1 flex flex-row items-center gap-4 text-ellipsis overflow-hidden">
                  <button
                    onClick={() =>
                      dispatch(markAsCompleteToggle({ id: todo.id }))
                    }
                    className={`rounded-full w-8 h-8 p-1 border-gray-300 border ${
                      todo.completed ? "bg-emerald-300 dark:bg-lime-500" : ""
                    } hover:border-gray-400 flex items-center justify-center`}
                  >
                    <span className="">
                      {todo.completed ? <PiCheckBold /> : ""}
                    </span>
                  </button>
                  <h1 className="flex-1 w-full truncate">{todo.task}</h1>
                </div>
                <div className="flex flex-row">
                  <Tooltip
                    style="auto"
                    content={`${todo.inProgress ? "Pending" : "Start"}`}
                  >
                    <button
                      disabled={`${todo.completed ? "disabled" : ""}`}
                      onClick={() =>
                        dispatch(markPendingToggle({ id: todo.id }))
                      }
                      className={`p-2 text-lg hover:bg-lightcl disabled:cursor-not-allowed text-slate-500 dark:text-slate-200 ${
                        todo.inProgress
                          ? "!text-red-400 dark:!text-red-500"
                          : ""
                      } dark:hover:bg-headcl rounded-lg`}
                    >
                      {todo.inProgress ? (
                        <BsFillStopCircleFill />
                      ) : (
                        <HiMiniFlag />
                      )}
                    </button>
                  </Tooltip>

                  <Tooltip style="auto" content="Edit">
                    <button
                      onClick={() =>
                        handleEditTodo(todo.id, todo.task, todo.dateCreated)
                      }
                      className="p-2 text-lg hover:bg-lightcl text-slate-500 dark:text-slate-200 dark:hover:bg-headcl rounded-lg"
                    >
                      <FiEdit />
                    </button>
                  </Tooltip>
                  <Tooltip style="auto" content="Delete">
                    <button className="p-2 text-lg hover:bg-lightcl text-slate-500 dark:text-slate-200 dark:hover:bg-headcl rounded-lg">
                      <BsTrashFill />
                    </button>
                  </Tooltip>
                </div>
              </div>
            );
          })
          .reverse()}
      </div>

      <EditModal
        handleSaveTodo={handleSaveTodo}
        setEditTodo={setEditTodo}
        editTodo={editTodo}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default TodoTaskAction;
