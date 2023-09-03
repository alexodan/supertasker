import CreateUser from './create-user';
import User from './user';
import { useGetUsersQuery } from '../services/api-service';
import Loading from './loading';

const UserList = () => {
  const { data, isLoading } = useGetUsersQuery();

  return (
    <section className="user-list">
      <CreateUser />
      <Loading loading={isLoading} />
      {data?.users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </section>
  );
};

export default UserList;
