import { useState } from 'react';
import { createTask } from '../features/task-slice';
import { useAppDispatch } from '../hooks';
import { useGetUsersQuery } from '../services/api-service';

const CreateTask = () => {
  const [newTaskTitle, setnewTaskTitle] = useState('');
  const [newTaskUser, setNewTaskUser] = useState<User | undefined>();
  const dispatch = useAppDispatch();

  const { data } = useGetUsersQuery();

  return (
    <form
      className="create-task"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(
          createTask({
            title: newTaskTitle,
            user: newTaskUser?.id,
            column: 'Ready',
          }),
        );
      }}
    >
      <label htmlFor="new-task-title">
        Title
        <input
          id="new-task-title"
          type="text"
          value={newTaskTitle}
          placeholder="Title"
          required
          onChange={(e) => setnewTaskTitle(e.target.value)}
        />
      </label>
      <label htmlFor="new-task-user">
        User
        <select
          id="new-task-user"
          defaultValue={newTaskUser?.alterEgo}
          placeholder="User"
          className="new-task-user"
          onChange={(e) => {
            const id = e.target.value;
            const selected = data?.users?.find((user) => user.id === id);
            setNewTaskUser(selected);
          }}
        >
          {data?.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.alterEgo} - {user.realName}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create Task</button>
      <button
        onClick={() => {
          throw new Error('Something went wrong');
        }}
      >
        Break the world
      </button>
    </form>
  );
};

export default CreateTask;
