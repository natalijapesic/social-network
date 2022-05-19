import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './App';
import './style/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './features/auth/components/SignIn';
import SignUp from './features/auth/components/SignUp';
import PostsGlimmer from './components/PostsGlimmer';
import UserProtected from './components/UserProtected';
import AdminProtected from './components/AdminProtected';
import Spinner from './components/Spinner';

const container = document.getElementById('root')!;
const root = createRoot(container);

const Posts = lazy(() => import('./features/posts/components/Posts')); 
const CreatePost = lazy(() => import('./features/posts/components/CreatePost'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Header />}>
              <Route index
                element={
                  <Suspense fallback={<PostsGlimmer />}>
                    <Posts /></Suspense>}
              />
              <Route path="signIn" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="createPost" element={
                <UserProtected>
                  <Suspense fallback={<Spinner type='gray' />}>
                    <CreatePost />
                  </Suspense>
                </UserProtected>
              } />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
