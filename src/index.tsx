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

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<Header/>}/>
          <Route path="newPost" element={<AddNewPost/>}/>
          <Route path="signIn" element={<SignIn/>}/>
          <Route path="signUp" element={<SignUp/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

