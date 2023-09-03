import { useState } from 'react';
import { userApi } from '../services/api-service';

const { useCreateUserMutation } = userApi;

const CreateUser = () => {
  const [realName, setRealName] = useState('');
  const [alterEgo, setAlterEgo] = useState('');

  const [createUser, { data }] = useCreateUserMutation();

  console.log('New data?:', data);

  return (
    <form
      className="create-user"
      onSubmit={(e) => {
        e.preventDefault();
        createUser({
          alterEgo,
          realName,
          tasks: [],
        });
      }}
    >
      <label htmlFor="new-user-real-name">
        Real Name
        <input
          id="new-user-real-name"
          type="text"
          value={realName}
          placeholder="Real Name"
          required
          onChange={(e) => setRealName(e.target.value)}
        />
      </label>
      <label htmlFor="new-user-alter-ego">
        Alter Ego
        <input
          id="new-user-alter-ego"
          type="text"
          value={alterEgo}
          placeholder="Alter Ego"
          required
          onChange={(e) => setAlterEgo(e.target.value)}
        />
      </label>

      <button type="submit">Create User</button>
    </form>
  );
};

export default CreateUser;
