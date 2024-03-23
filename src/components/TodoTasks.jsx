import { useSelector } from "react-redux";
import TodoTaskAction from "./TodoTaskAction";
import { useCallback, useMemo, memo } from "react";

const TodoTasks = memo(() => {
  const { tasks, filter, search } = useSelector((state) => state.todo);

  const handleFilterTodos = useCallback(() => {
    return tasks.filter((todo) => {
      const matchFilter =
        (filter === "Completed" && todo.completed) ||
        (filter === "Incomplete" && !todo.completed) ||
        filter === "All" ||
        (filter === "Started" && todo.inProgress);

      const matchSearch = todo.task
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchFilter && matchSearch;
    });
  }, [tasks, filter, search]);

  return <TodoTaskAction tasks={handleFilterTodos()} />;
});

export default TodoTasks;
