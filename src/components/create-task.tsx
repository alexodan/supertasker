import { useState } from 'react';
import { createTask } from '../features/task-slice';
import { useAppDispatch } from '../hooks';

const CreateTask = () => {
  const [newTaskTitle, setnewTaskTitle] = useState('');
  const dispatch = useAppDispatch();

  return (
    <form
      className="create-task"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(createTask({ title: newTaskTitle }));
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
