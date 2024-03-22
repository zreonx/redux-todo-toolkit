import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";
import { MdChecklistRtl } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterTasks, updateSearch } from "../redux/features/todos/todoSlice";

const TodoFilter = () => {
  const { search } = useSelector((state) => state.todo);
  const [statusLabel, setStatusLabel] = useState("All");

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

  useEffect(() => {
    setFilterValue();
  }, [statusLabel]);

  return (
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

        <button className='border rounded-md px-4 py-2.5 text-lg hover:bg-lightcl dark:hover:text-gray-700'>
          <MdChecklistRtl />
        </button>
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
  );
};

export default TodoFilter;
