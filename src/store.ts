import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/task-slice';
import usersReducer from './features/user-slice';
import { userApi } from './services/api-service';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(userApi.middleware);
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
