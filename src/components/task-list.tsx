import { useAppSelector } from '../hooks';
import Loading from './loading';
import Task from './task';

const TaskList = () => {
  const tasks = useAppSelector((state) => state.tasks.entities);
  const isLoading = useAppSelector((state) => state.tasks.isLoading);

  return (
    <section className="task-list">
      <Loading loading={isLoading} />
      {tasks && tasks.map((task) => <Task key={task.id} task={task} />)}
    </section>
  );
};

export default TaskList;
