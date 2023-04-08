import UserGuard from '../guards/user-guard';

const Mypage = () => {
  return (
    <UserGuard>
      {(user) => <p>{user.name}</p>}
    </UserGuard>
  );
};

export default Mypage;