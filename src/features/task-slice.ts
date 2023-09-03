import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { userApi } from '../services/api-service';

type TaskState = {
  entities: Task[];
  isLoading: boolean;
};

type DraftTask = Partial<Task> & Pick<Task, 'title'>;

const initialState: TaskState = {
  entities: [],
  isLoading: false,
};

const createTaskFromDraft = (draft: DraftTask): Task => {
  return {
    ...draft,
    id: nanoid(),
  };
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (thunkApi): Promise<Task[]> => {
    const response = await fetch('/api/tasks').then((response) =>
      response.json(),
    );
    return response.tasks;
  },
);

const tasksSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {
    createTask: (state, action: PayloadAction<DraftTask>) => {
      const task = createTaskFromDraft(action.payload);
      state.entities.unshift(task);
    },
    removeTask: (state, action: PayloadAction<Task['id']>) => {
      const index = state.entities.findIndex((t) => t.id === action.payload);
      state.entities.splice(index, 1);
    },
    // completeTask
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    });
    builder.addMatcher(
      userApi.endpoints.deleteUser.matchFulfilled,
      (state, action) => {
        const { user } = action.payload;
        state.entities = state.entities.map((task) =>
          task.user === user.id ? { ...task, user: undefined } : task,
        );
      },
    );
  },
});

export default tasksSlice.reducer;

export const { createTask, removeTask } = tasksSlice.actions;
