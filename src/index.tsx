import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import App from './App';
import './style/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CreatePost from './features/posts/components/CreatePost';
import SignIn from './features/auth/components/SignIn';
import SignUp from './features/auth/components/SignUp';
import PostsGlimmer from './components/PostsGlimmer';

const container = document.getElementById('root')!;
const root = createRoot(container);
// ReactDOM.createRoot API we will unlock concurrency 

const PostList = lazy(() => import('./features/posts/components/PostList')); 



root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Header />}>     

            <Route index 
              element={ 
                <Suspense fallback={<PostsGlimmer />}>
                <PostList /></Suspense>} 
            /> 
    
          </Route>
            <Route path="createPost" element={<CreatePost />} />
            <Route path="signIn" element={<SignIn/>} />
            <Route path="signUp" element={<SignUp/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

