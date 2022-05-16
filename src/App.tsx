import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from './stores/hooks';
import { refreshUserStore } from './features/auth/authenticationSlice';
import { UserModel } from './models';
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
    <div className="dark min-w-screen min-h-screen bg-gray-900 text-gray-300">
      <Outlet />
    </div>
  );
}

export default App;
