import { useSelector } from "react-redux";
import TodoTaskAction from "./TodoTaskAction";

const TodoTasks = () => {
  const { tasks } = useSelector((state) => state.todo);

  return <TodoTaskAction tasks={tasks} />;
};

export default TodoTasks;
