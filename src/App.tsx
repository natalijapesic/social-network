import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './app/hooks';
import { refreshUserStore } from './features/auth/authenticationSlice';
import { UserModel } from './features/auth/user';
import storeService from './storeService';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {

    const user: UserModel | null = storeService.getUser();
    if (user) {
      dispatch(refreshUserStore(user));
    }

  }, []);

  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default App;
