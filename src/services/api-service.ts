import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  tagTypes: ['Users'],
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (build) => ({
    getUsers: build.query<{ users: User[] }, void>({
      query: () => 'users',
      providesTags: (result) => {
        return result
          ? result.users.map(({ id }) => ({ type: 'Users', id }))
          : [{ type: 'Users', id: 'LIST' }];
      },
    }),
    deleteUser: build.mutation<{ user: User }, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
            draftUsers.users = draftUsers.users.filter((u) => u.id !== id);
          }),
        );
        try {
          await queryFulfilled;
        } catch (e) {
          patchResult.undo();
        }
      },
    }),
    createUser: build.mutation<User, Omit<User, 'id'>>({
      query: (newUser: Omit<User, 'id'>) => ({
        url: 'users',
        method: 'POST',
        body: JSON.stringify(newUser),
      }),
      // RTKQ needs this to re-fetch without cache and getting the id from DB
      invalidatesTags: ['Users'],
      async onQueryStarted(newUser, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
            draftUsers.users = [...draftUsers.users, { ...newUser, id: '' }];
          }),
        );
        try {
          await queryFulfilled;
        } catch (e) {
          console.error('Epic fail:', e);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
} = userApi;

export const userReducer = userApi.reducer;
