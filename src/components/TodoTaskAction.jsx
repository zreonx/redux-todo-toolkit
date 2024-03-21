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
  Slide,
  Roll,
  Zoom,
  JackInTheBox,
  Hinge,
  Fade,
  AttentionSeeker,
} from "react-awesome-reveal";

import notFound from "../assets/nofound.png";
import {
  markAsCompleteToggle,
  markPendingToggle,
  editSaveTask,
  removeTask,
} from "../redux/features/todos/todoSlice";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const TodoTaskAction = ({ tasks }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editTodo, setEditTodo] = useState({
    id: "",
    task: "",
    dateCreated: "",
    isEdited: "",
  });

  const [removeTodoId, setRemoveTodoId] = useState("");

  const handleEditTodo = (id, task, date, isEdited) => {
    const dateCreated = convertToDate(date);
    setOpenModal(true);
    setEditTodo({ id, task, dateCreated, isEdited });
  };

  const handleSaveTodo = () => {
    dispatch(editSaveTask({ ...editTodo }));
    setOpenModal(false);
  };

  const handleDeleteTodo = (id) => {
    dispatch(removeTask({ id }));
    setDeleteModal(false);
  };

  const handleCompleteToggle = (e, id) => {
    e.stopPropagation();
    dispatch(markAsCompleteToggle({ id }));
  };

  const handlePendingToggle = (e, id) => {
    e.stopPropagation();
    dispatch(markPendingToggle({ id }));
  };

  return (
    <>
      {tasks.length > 0 ? (
        <>
          <div className='mt-5 flex gap-3 flex-col animate__animated animate__backInUp '>
            <Fade>
              {tasks
                .map((todo) => {
                  console.log(todo);
                  return (
                    <div
                      onClick={() =>
                        handleEditTodo(
                          todo.id,
                          todo.task,
                          todo.dateCreated,
                          todo.isEdited
                        )
                      }
                      key={todo.id}
                      className={`p-4 rounded-md shadow-sm animate__animated  animate__slideInDown flex gap-5 items-center border justify-between cursor-pointer ${
                        todo.completed &&
                        "opacity-50 bg-slate-100 dark:bg-slate-700"
                      }`}
                    >
                      <div className='flex-1 flex flex-row items-center gap-4 text-ellipsis overflow-hidden'>
                        <button
                          onClick={(e) => handleCompleteToggle(e, todo.id)} // Pass event object to the handler
                          className={`rounded-full w-8 h-8 p-1 border-gray-300 border ${
                            todo.completed
                              ? "bg-emerald-300 dark:bg-lime-500"
                              : ""
                          } hover:border-gray-400 flex items-center justify-center`}
                        >
                          <span className=''>
                            {todo.completed ? <PiCheckBold /> : ""}
                          </span>
                        </button>
                        <h1 className='flex-1 w-full truncate'>{todo.task}</h1>
                      </div>
                      <div className='flex flex-row'>
                        <Tooltip
                          style='auto'
                          content={`${
                            todo.inProgress ? "In progress" : "Start"
                          }`}
                        >
                          <button
                            disabled={`${todo.completed ? "disabled" : ""}`}
                            onClick={(e) => handlePendingToggle(e, todo.id)} // Pass event object to the handler
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

                        {/* <Tooltip style='auto' content='Edit'>
                    <button
                      onClick={() =>
                        handleEditTodo(todo.id, todo.task, todo.dateCreated)
                      }
                      className='p-2 text-lg hover:bg-lightcl text-slate-500 dark:text-slate-200 dark:hover:bg-headcl rounded-lg'
                    >
                      <FiEdit />
                    </button>
                  </Tooltip> */}
                        <Tooltip style='auto' content='Delete'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteModal(true);
                              setRemoveTodoId(todo.id);
                            }}
                            className='p-2 text-lg hover:bg-lightcl text-slate-500 dark:text-slate-200 dark:hover:bg-headcl rounded-lg'
                          >
                            <BsTrashFill />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </Fade>
          </div>

          <EditModal
            handleSaveTodo={handleSaveTodo}
            setEditTodo={setEditTodo}
            editTodo={editTodo}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
          <DeleteModal
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleDeleteTodo={handleDeleteTodo}
            id={removeTodoId}
          />
        </>
      ) : (
        <div className='mt-12'>
          <img
            className='h-100 max-sm:min-w-[70%] max-w-[40%] mx-auto bg-lightcl/0 dark:bg-transparent rounded-md opacity-75'
            src={notFound}
            alt='dfdf'
          />
        </div>
      )}
    </>
  );
};

export default TodoTaskAction;
