import React, { useCallback, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import { MdChecklistRtl } from "react-icons/md";
import { BsTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTasks,
  updateSearch,
  completeAllTask,
  removeAllTask,
} from "../redux/features/todos/todoSlice";
import { Tooltip } from "flowbite-react";
import { useTodoContext } from "../context/TodoContext";

import DeleteAllModal from "./DeleteAllModal";
import CompleteTaskModal from "./CompleteTaskModal";

const TodoFilter = () => {
  const { search, tasks } = useSelector((state) => state.todo);
  const {
    statusLabel,
    setStatusLabel,
    deleteAllModal,
    setDeleteAllModal,
    completeTasks,
    setCompleteTasks,
  } = useTodoContext();

  const dispatch = useDispatch();

  const setFilterValue = useCallback(() => {
    dispatch(filterTasks({ filter: statusLabel }));
  }, [statusLabel]);

  const updateSearchValue = useCallback(
    (searchTerm) => {
      dispatch(updateSearch({ search: searchTerm }));
    },
    [search]
  );

  const handleRemoveAllTask = useCallback(() => {
    dispatch(removeAllTask());
  });

  const handleCompleteAllTask = useCallback(() => {
    dispatch(completeAllTask());
  });

  useEffect(() => {
    setFilterValue();
  }, [statusLabel]);

  return (
    <>
      <div className='flex items-center justify-between gap-3 flex-col sm:flex-row'>
        <div className='flex-1 flex gap-3'>
          <div className=' border py-2.5 px-3 rounded-md '>
            <Dropdown
              inline
              size='sm'
              label={statusLabel}
              dismissOnClick={true}
              className='mt-3 -ml-3'
            >
              <Dropdown.Item onClick={() => setStatusLabel("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusLabel("Completed")}>
                Completed
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusLabel("Incomplete")}>
                Incomplete
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setStatusLabel("Started")}>
                Started
              </Dropdown.Item>
            </Dropdown>
          </div>

          <Tooltip style='auto' content='Complete All Task'>
            <button
              onClick={() => {
                tasks.length > 0
                  ? setCompleteTasks(true)
                  : alert("Theres no task to complete");
              }}
              className='border rounded-md px-4 py-2.5 text-lg hover:bg-lightcl dark:hover:text-gray-700'
            >
              <MdChecklistRtl />
            </button>
          </Tooltip>
          <Tooltip style='auto' content='Empty Task'>
            <button
              onClick={() => {
                tasks.length > 0
                  ? setDeleteAllModal(true)
                  : alert("Empty Task");
              }}
              className='border rounded-md px-4 py-2.5 text-lg hover:bg-lightcl dark:hover:text-gray-700'
            >
              <BsTrashFill />
            </button>
          </Tooltip>
        </div>
        <div>
          <input
            className='px-3 py-2 rounded-md x-f-default'
            type='text'
            value={search}
            onChange={(e) => updateSearchValue(e.target.value)}
            placeholder='Search'
          />
        </div>
      </div>
      <DeleteAllModal
        deleteAllModal={deleteAllModal}
        setDeleteAllModal={setDeleteAllModal}
        handleRemoveAllTask={handleRemoveAllTask}
      />

      <CompleteTaskModal
        handleCompleteAllTask={handleCompleteAllTask}
        setCompleteTasks={setCompleteTasks}
        completeTasks={completeTasks}
      />
    </>
  );
};

export default TodoFilter;
