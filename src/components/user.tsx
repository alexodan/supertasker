import { memo, useState } from 'react';
import UserEdit from './user-edit';
import { userApi } from '../services/api-service';

type UserProps = {
  user: User;
};

const { useDeleteUserMutation } = userApi;

const toggle = (b: boolean): boolean => !b;

const User = ({ user }: UserProps) => {
  const [editing, setEditing] = useState(false);
  const [deleteUser] = useDeleteUserMutation();

  const handleRemove = ({ id }: { id: string }) => {
    deleteUser(id);
  };

  return (
    <article className="user">
      <header className="user-header">
        <h2 className="user-alter-ego">{user.alterEgo}</h2>
        <span className="user-real-name">{user.realName}</span>
      </header>
      <div className="button-group">
        <button className="small" onClick={() => setEditing(toggle)}>
          Edit
        </button>
        <button
          className="destructive small"
          aria-label="Remove"
          onClick={() => handleRemove({ id: user.id })}
        >
          Remove
        </button>
      </div>
      {editing && <UserEdit user={user} />}
    </article>
  );
};

export default memo(User);
