import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './style/main.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './features/header/Header';
import AddNewPost from './features/posts/AddNewPost';
import SignUp from './features/auth/SignUp';
import SignIn from './features/auth/SignIn';
import PostsList from './features/posts/PostList';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="/" element={<Header/>}>      
            <Route index element={<PostsList/>}/> 
          </Route>
          <Route path="newPost" element={<AddNewPost/>}/>
          <Route path="signIn" element={<SignIn/>}/>
          <Route path="signUp" element={<SignUp/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

