import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type UserState = {
  entities: User[];
};

type DraftUser = Omit<User, 'id'>;

const initialState: UserState = {
  entities: [],
};

const createUserFromDraft = (draft: DraftUser): User => {
  return {
    ...draft,
    id: nanoid(),
  };
};

/**
 * Note: Using RTKQ there is no need to have a state.
 * The DB is the state, so to speak.
 */
const usersSlice = createSlice({
  initialState,
  name: 'Users',
  reducers: {
    createUser: (state, action: PayloadAction<DraftUser>) => {
      const User = createUserFromDraft(action.payload);
      state.entities.unshift(User);
    },
    // removeUser: (state, action: PayloadAction<User['id']>) => {
    //   const index = state.entities.findIndex((t) => t.id === action.payload);
    //   state.entities.splice(index, 1);
    // },
  },
  extraReducers: (builder) => {
    // builder.addMatcher(
    //   userApi.endpoints.getUsers.matchFulfilled,
    //   (state, action) => {
    //     state.entities = action.payload.users;
    //   },
    // );
  },
});

export default usersSlice.reducer;

export const { createUser } = usersSlice.actions;
